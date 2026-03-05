import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Trash2, ArrowLeft, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { generateThumbnails } from '../utils/thumbnailUtils';
import { removePagesFromPdf } from '../utils/pdfUtils';
import { PageThumbnail } from '../components/PageThumbnail';
import { Spinner } from '../components/Spinner';
import { PDFState } from '../types';

export const EditPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as PDFState | null;

  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(true);
  const [processedPdfBlob, setProcessedPdfBlob] = useState<Blob | null>(null);
  const [currentArrayBuffer, setCurrentArrayBuffer] = useState<ArrayBuffer | null>(null);

  useEffect(() => {
    if (!state) {
      navigate('/');
      return;
    }
    setCurrentArrayBuffer(state.arrayBuffer);
    loadThumbnails(state.arrayBuffer);
  }, [state, navigate]);

  const loadThumbnails = async (buffer: ArrayBuffer) => {
    setIsGeneratingThumbnails(true);
    try {
      const thumbs = await generateThumbnails(buffer);
      setThumbnails(thumbs);
    } catch (error) {
      console.error('Error generating thumbnails:', error);
      toast.error('Failed to generate page previews.');
    } finally {
      setIsGeneratingThumbnails(false);
    }
  };

  const togglePageSelection = (index: number) => {
    const newSelection = new Set(selectedPages);
    if (newSelection.has(index)) {
      newSelection.delete(index);
    } else {
      newSelection.add(index);
    }
    setSelectedPages(newSelection);
    // Reset processed PDF if selection changes
    setProcessedPdfBlob(null);
  };

  const handleRemovePages = async () => {
    if (selectedPages.size === 0) {
      toast.error('Please select at least one page to remove.');
      return;
    }

    if (!currentArrayBuffer) return;

    if (selectedPages.size === thumbnails.length) {
      toast.error('You cannot remove all pages from the PDF.');
      return;
    }

    setIsProcessing(true);
    try {
      const pagesToRemove = Array.from(selectedPages) as number[];
      const updatedPdfBytes = await removePagesFromPdf(currentArrayBuffer, pagesToRemove);
      
      const blob = new Blob([updatedPdfBytes], { type: 'application/pdf' });
      setProcessedPdfBlob(blob);
      
      // Update current state to reflect removal
      const newBuffer = updatedPdfBytes.buffer;
      setCurrentArrayBuffer(newBuffer);
      
      // Reload thumbnails for the new PDF
      await loadThumbnails(newBuffer);
      
      // Clear selection
      setSelectedPages(new Set());
      
      toast.success('Selected pages removed.');
    } catch (error) {
      console.error('Error removing pages:', error);
      toast.error('Failed to remove pages.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedPdfBlob) return;
    
    const url = URL.createObjectURL(processedPdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `updated_${state?.file.name || 'document.pdf'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Your updated PDF is ready for download.');
  };

  if (!state) return null;

  const remainingCount = thumbnails.length - selectedPages.size;

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-emerald-50/30">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col lg:flex-row gap-8">
        {/* Main Grid Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Upload</span>
            </button>
            <div className="flex items-center gap-2 text-emerald-900/60 text-sm font-medium bg-white px-4 py-2 rounded-full border border-emerald-100">
              <Info size={16} />
              <span>Select pages you want to remove</span>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 overflow-y-auto min-h-[400px]">
            {isGeneratingThumbnails ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <Spinner size="lg" />
                <p className="text-emerald-900/60 font-medium">Generating page previews...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
                {thumbnails.map((url, index) => (
                  <PageThumbnail
                    key={`${index}-${url.length}`}
                    pageNumber={index + 1}
                    thumbnailUrl={url}
                    isSelected={selectedPages.has(index)}
                    onToggle={() => togglePageSelection(index)}
                    disabled={isProcessing}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sticky top-24">
            <h3 className="text-xl font-bold text-emerald-950 mb-6">Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-3 border-b border-emerald-50">
                <span className="text-emerald-900/60 font-medium">Total Pages</span>
                <span className="text-emerald-950 font-bold">{thumbnails.length}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-emerald-50">
                <span className="text-emerald-900/60 font-medium">Pages to Remove</span>
                <span className="text-red-600 font-bold">{selectedPages.size}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-emerald-900/60 font-medium">Pages Remaining</span>
                <span className="text-emerald-600 font-bold">{remainingCount}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleRemovePages}
                disabled={selectedPages.size === 0 || isProcessing}
                className={`w-full flex items-center justify-center gap-2 h-14 rounded-2xl font-bold transition-all duration-300
                  ${selectedPages.size === 0 || isProcessing
                    ? 'bg-emerald-50 text-emerald-200 cursor-not-allowed'
                    : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 active:scale-95'
                  }`}
              >
                {isProcessing ? (
                  <Spinner size="sm" />
                ) : (
                  <>
                    <Trash2 size={20} />
                    <span>Remove Selected</span>
                  </>
                )}
              </button>

              <button
                onClick={handleDownload}
                disabled={!processedPdfBlob || isProcessing}
                className={`w-full flex items-center justify-center gap-2 h-14 rounded-2xl font-bold transition-all duration-300
                  ${!processedPdfBlob || isProcessing
                    ? 'bg-emerald-50 text-emerald-200 cursor-not-allowed'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95 shadow-lg shadow-emerald-600/10'
                  }`}
              >
                <Download size={20} />
                <span>Download PDF</span>
              </button>
            </div>

            {processedPdfBlob && !isProcessing && (
              <p className="mt-4 text-center text-xs text-emerald-600 font-medium animate-pulse">
                Your updated PDF is ready!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
