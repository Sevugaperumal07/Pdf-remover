import React from 'react';
import { FileText } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-lg shadow-emerald-200">
            <FileText size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-emerald-900">PDF Remover</h1>
        </div>
      </div>
    </header>
  );
};
