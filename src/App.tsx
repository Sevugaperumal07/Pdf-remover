import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MainPage } from './pages/MainPage';
import { EditPage } from './pages/EditPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white font-sans text-brand-dark">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: 'var(--color-brand-dark)',
              borderRadius: '16px',
              border: '1px solid var(--color-brand-light)',
              padding: '16px',
              fontWeight: 500,
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
          }}
        />
        <Navbar />
        <main className="flex flex-1 flex-col">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/edit" element={<EditPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
