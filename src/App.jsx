import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import Features from './components/Features.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import AuthModal from './components/AuthModal.jsx';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#05122f] via-[#1c1540] to-[#2b1a5b] text-slate-100">
      <div className="absolute inset-0 bg-royal-glow opacity-80 pointer-events-none"></div>
      <div className="relative z-10">
        <Navbar onAuthClick={() => setIsModalOpen(true)} />
        <main className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <HeroSection onAuthClick={() => setIsModalOpen(true)} />
          <Features />
          <About />
        </main>
        <Footer />
        <AuthModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </div>
  );
}

export default App;
