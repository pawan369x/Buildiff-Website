import React, { useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import SmoothScrollSequence from './components/SmoothScrollSequence';
import CreativeNavbar from './components/CreativeNavbar';
import Banner from './components/Banner';
import CartDrawer from './components/CartDrawer';
import PaymentModal from './components/PaymentModal';
import VIPProfileModal from './components/VIPProfileModal';
import Products from './components/Products';
import Footer from './components/Footer';

function MainLayout() {
  const { activeTab, setActiveTab } = useCart();

  // Scroll instantly to top whenever activeTab changes
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 20);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-[#ccff00] selection:text-black font-['Outfit'] relative">
      {/* Fixed Header Navbar across all views */}
      <CreativeNavbar />

      {/* Conditional Page View Rendering */}
      {activeTab === 'home' ? (
        <main className="bg-white">
          {/* Home Page: 3D Cinematic Scroll Intro */}
          <SmoothScrollSequence />

          {/* Transition bridge to white hero banner */}
          <div className="w-full h-40 bg-gradient-to-b from-black via-neutral-900/60 to-white pointer-events-none -mt-1" />

          {/* Hero Banner Showcase */}
          <Banner />

          {/* Quick CTA Banner to enter Product Store */}
          <section className="bg-neutral-950 text-white py-20 px-6 text-center border-t border-neutral-800">
            <div className="max-w-4xl mx-auto">
              <span className="text-[#ccff00] font-black text-xs uppercase tracking-widest block mb-3">
                BUILDIFF NUTRITION VAULT
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight mb-6">
                READY TO <span className="text-[#ccff00]">TRANSFORM?</span>
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
                Explore our full range of 100% native whey isolates, German Creapure, and explosive pre-workout formulas.
              </p>
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-4 rounded-2xl bg-[#ccff00] text-black font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(204,255,0,0.5)] hover:bg-[#b8e600] transition-all cursor-pointer"
              >
                Enter Product Store →
              </button>
            </div>
          </section>
        </main>
      ) : (
        <main className="bg-neutral-950 pt-24 min-h-screen">
          {/* Dedicated Advanced Product Store Page View */}
          <Products />
        </main>
      )}

      {/* Footer across all views */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <PaymentModal />
      <VIPProfileModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}
