import React, { useState } from 'react';
import heroBackground from '../../assets/meil-infrastructure-hero.png';
import { Header } from './Header';
import { HeroContent } from './HeroContent';
import { SectorStrip } from './SectorStrip';
import { AuthModal } from '../auth/AuthModal';
import { ForgotPasswordModal } from '../auth/ForgotPasswordModal';
import { ToastContainer } from '../ui/Toast';
import type { PortalRole, ToastMessage } from '../../types/auth';

export const LoginLandingPage: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<PortalRole | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const newToast: ToastMessage = {
      id: `${Date.now()}-${Math.random()}`,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSelectRole = (role: PortalRole) => {
    setSelectedRole(role);
    setIsAuthModalOpen(true);
  };

  const handleForgotPassword = () => {
    setIsAuthModalOpen(false);
    setIsForgotPasswordOpen(true);
  };

  const handleBackToLogin = () => {
    setIsForgotPasswordOpen(false);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#07111e]">
      {/* 
        HERO BACKGROUND IMAGE SLOT:
        Replaceable asset configured at src/assets/meil-infrastructure-hero.png
      */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center sm:bg-right-top bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        {/* Dark Navy Gradient Overlay: Deep left for typography readability, gentle fade to preserve infrastructure on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#060c18]/95 via-[#060c18]/65 to-[#060c18]/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060c18]/40 via-transparent to-[#060c18]/70" />
      </div>

      {/* Top Header */}
      <Header
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        onSelectRole={handleSelectRole}
      />

      {/* Main Center/Hero Content */}
      <main className="relative z-10 flex-1 flex items-center px-6 sm:px-12 lg:px-20 py-24 sm:py-28 lg:py-32">
        <HeroContent />
      </main>

      {/* Bottom Sector Strip */}
      <footer className="relative z-10 w-full">
        <SectorStrip />
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        selectedRole={selectedRole}
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onForgotPassword={handleForgotPassword}
        onSubmitSuccess={(msg) => addToast(msg, 'info')}
      />

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
        onBackToLogin={handleBackToLogin}
        onSubmitSuccess={(msg) => addToast(msg, 'info')}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
};
