import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, LogIn, UserPlus, Settings, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-light bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-primary text-white shadow-lg shadow-brand-primary/20">
            <FileText size={24} />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-brand-dark">PdfEdit</h2>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-primary hover:bg-brand-light rounded-xl transition-all duration-200">
            <LogIn size={18} />
            <span>Login</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-brand-primary hover:bg-brand-accent rounded-xl transition-all duration-200 shadow-md shadow-brand-primary/10">
            <UserPlus size={18} />
            <span className="hidden xs:inline">Sign In</span>
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`p-2 rounded-xl transition-all duration-200 ${isSettingsOpen ? 'bg-brand-light text-brand-accent' : 'text-brand-primary hover:bg-brand-light'
                }`}
              title="Settings"
            >
              <Settings size={20} />
            </button>

            {isSettingsOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-brand-light shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                <div className="p-2">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsSettingsOpen(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-brand-dark hover:bg-brand-light rounded-xl transition-colors text-left"
                  >
                    <User size={18} className="text-brand-primary" />
                    <span>User Profile</span>
                  </button>

                  <div className="h-px bg-brand-light my-1" />

                  <button
                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-brand-dark/50 hover:bg-brand-light rounded-xl transition-colors text-left cursor-not-allowed"
                    disabled
                  >
                    <Settings size={18} />
                    <span>App Settings</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
