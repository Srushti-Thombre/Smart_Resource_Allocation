import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import About from '../components/About';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import { useState, useEffect } from 'react';

import PartnerTicker from '../components/PartnerTicker';

export default function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-mesh-gradient text-slate-100 relative">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[10%] right-[5%] h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[150px] animate-pulse-slow"></div>
        <div className="absolute top-[40%] left-[40%] h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        <Navbar onAuthClick={() => setShowAuthModal(true)} />
        <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <HeroSection onGetStarted={() => setShowAuthModal(true)} />
          <div className="space-y-48">
            <div className="reveal"><Features /></div>
            <div className="reveal"><PartnerTicker /></div>
            <div className="reveal"><About /></div>
          </div>
        </main>
        <Footer />
        <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </div>
    </div>
  );
}
