import React, { useCallback, useState } from 'react';
import { Upload, File, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = async (file: File): Promise<boolean> => {
    // 1. Check size (max 50MB)
    const MAX_SIZE = 50 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      toast.error('File is too large. Maximum size is 50MB.');
      return false;
    }

    // 2. Check extension
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Please upload a file with a .pdf extension.');
      return false;
    }

    // 3. Check MIME type (basic check)
    if (file.type !== 'application/pdf' && file.type !== '') {
      toast.error('Invalid file type. Please upload a PDF.');
      return false;
    }

    // 4. Magic number check (Production grade)
    try {
      const headerBytes = await new Promise<Uint8Array>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(new Uint8Array(reader.result as ArrayBuffer));
        reader.onerror = reject;
        reader.readAsArrayBuffer(file.slice(0, 4));
      });

      // %PDF is 25 50 44 46 in hex
      const isPDF = headerBytes[0] === 0x25 && 
                    headerBytes[1] === 0x50 && 
                    headerBytes[2] === 0x44 && 
                    headerBytes[3] === 0x46;

      if (!isPDF) {
        toast.error('This file does not appear to be a real PDF.');
        return false;
      }
    } catch (err) {
      console.error('Validation error:', err);
      toast.error('Error validating file.');
      return false;
    }

    return true;
  };

  const processFile = async (file: File) => {
    const isValid = await validateFile(file);
    if (!isValid) return;

    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await processFile(file);
  }, []);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processFile(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center
          ${isDragging
            ? 'border-brand-primary bg-brand-light'
            : 'border-brand-light hover:border-brand-primary/40 hover:bg-brand-light/50'
          }`}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-brand-light text-brand-primary group-hover:scale-110 transition-transform duration-300">
            <Upload size={40} />
          </div>
          <div>
            <p className="text-xl font-semibold text-brand-dark">
              {selectedFile ? selectedFile.name : 'Upload your PDF'}
            </p>
            <p className="text-brand-primary/60 mt-1">
              Drag & Drop your PDF here or Click to Upload
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="mt-6 flex items-center justify-between p-4 bg-white rounded-xl border border-brand-light shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-light text-brand-primary rounded-lg">
              <File size={20} />
            </div>
            <span className="font-medium text-brand-dark truncate max-w-[200px] sm:max-w-md">
              {selectedFile.name}
            </span>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="p-1 hover:bg-red-50 text-red-400 hover:text-red-600 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      )}
    </div>
  );
};
