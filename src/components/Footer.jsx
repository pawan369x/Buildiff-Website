import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Footer = () => {
  const { setActiveTab } = useCart();

  const handleNav = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0a0c] text-neutral-400 border-t border-neutral-900 py-6 px-6 sm:px-12 font-['Outfit'] select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        
        {/* Left: Brand Logo & Title */}
        <div
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse shadow-[0_0_8px_#ccff00]" />
          <span className="font-black text-white text-sm sm:text-base tracking-tight uppercase flex items-center gap-1">
            BUILDIFF
            <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-widest ml-1">
              STORE
            </span>
          </span>
        </div>

        {/* Center: Copyright */}
        <div className="text-center text-[11px] text-neutral-400 font-medium">
          © {new Date().getFullYear()} Buildiff Nutrition & Fitness Store. All rights reserved.
        </div>

        {/* Right: Quick Minimal Links & Credit */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-[11px] font-bold">
          <button
            onClick={() => handleNav('products')}
            className="hover:text-[#ccff00] transition-colors cursor-pointer"
          >
            Products
          </button>
          
          <button
            onClick={() => handleNav('products')}
            className="hover:text-[#ccff00] transition-colors cursor-pointer"
          >
            Deals
          </button>

          <span className="text-neutral-700">•</span>

          {/* rawbrand.media Dialer Link */}
          <a
            href="tel:6230044384"
            className="flex items-center gap-1 text-neutral-300 hover:text-[#ccff00] transition-colors cursor-pointer"
            title="Call 6230044384"
          >
            <span>Built by</span>
            <span className="font-extrabold text-[#ccff00] underline">rawbrand.media</span>
          </a>

          <span className="text-neutral-700">•</span>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-300 hover:text-[#ccff00] transition-colors cursor-pointer"
          >
            <ArrowUp size={13} />
            <span>Top</span>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
