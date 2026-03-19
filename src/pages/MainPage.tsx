import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileUploader } from '../components/FileUploader';
import { Shield, Zap, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getPdfPageCount } from '../utils/pdfUtils';
import { Spinner } from '../components/ui/Spinner';

export const MainPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pageCount = await getPdfPageCount(arrayBuffer);

      toast.success('PDF loaded successfully!');

      // Navigate to edit page with the data
      navigate('/edit', {
        state: {
          file: selectedFile,
          arrayBuffer,
          pageCount
        }
      });
    } catch (error) {
      console.error('Error loading PDF:', error);
      toast.error('Failed to process PDF. It might be corrupted.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-dark mb-4">
          Remove PDF Pages <span className="text-brand-primary">Instantly</span>
        </h2>
        <p className="text-lg text-brand-dark/60 max-w-2xl mx-auto">
          The fastest way to clean up your documents. All processing happens right in your browser—secure, private, and free.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-brand-surface rounded-3xl shadow-brand border border-border-color p-8 md:p-12">
        <FileUploader onFileSelect={setSelectedFile} />

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            className={`group flex items-center gap-2 px-8 h-14 rounded-2xl font-bold text-lg transition-all duration-300
              ${!selectedFile || isLoading
                ? 'bg-brand-light text-brand-primary/40 cursor-not-allowed'
                : 'bg-brand-primary text-white hover:bg-brand-accent hover:shadow-lg hover:shadow-brand-primary/20 active:scale-95'
              }`}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="border-white/30 border-t-white" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>Upload & Continue</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-brand-surface border border-border-color shadow-sm">
          <div className="p-3 bg-brand-light text-brand-primary rounded-xl">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="font-bold text-brand-dark">Secure Processing</h3>
            <p className="text-sm text-brand-dark/60 mt-1">Your files never leave your device. We process everything locally in your browser.</p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-6 rounded-2xl bg-brand-surface border border-border-color shadow-sm">
          <div className="p-3 bg-brand-light text-brand-primary rounded-xl">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="font-bold text-brand-dark">Fast & Free</h3>
            <p className="text-sm text-brand-dark/60 mt-1">No subscriptions, no limits. Just a clean, high-performance tool for your PDF needs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
