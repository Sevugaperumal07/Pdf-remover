import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-emerald-50 bg-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm font-medium text-emerald-800/60">
          Made with ❤️ using React + Vite
        </p>
      </div>
    </footer>
  );
};
