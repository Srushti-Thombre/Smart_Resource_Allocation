import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import About from '../components/About';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import { useState } from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#05122f] via-[#1c1540] to-[#2b1a5b] text-slate-100">
      <div className="absolute inset-0 bg-royal-glow opacity-80 pointer-events-none"></div>
      <div className="relative z-10">
        <Navbar />
        <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <HeroSection />
          <Features />
          <About />
        </main>
        <Footer />
      </div>
    </div>
  );
}
