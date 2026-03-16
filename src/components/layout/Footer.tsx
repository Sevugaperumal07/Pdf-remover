import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-brand-light/50 bg-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium text-brand-dark/40">
          PDFEdit @2026.All rights reserved.
        </p>
      </div>
    </footer>
  );
};
