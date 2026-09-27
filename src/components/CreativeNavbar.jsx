import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navItems = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'products', label: 'Products', href: '#products' },
  { id: 'deals', label: 'Deals', href: '#products', badge: '20% OFF' }
];

export default function CreativeNavbar({ onCartClick, cartCount = 0 }) {
  const context = useCart ? useCart() : null;

  const totalItems = context?.totalItems ?? cartCount;
  const setIsCartOpen = context?.setIsCartOpen ?? onCartClick ?? (() => {});
  const activeTab = context?.activeTab ?? 'home';
  const setActiveTab = context?.setActiveTab ?? (() => {});

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutside);
      document.addEventListener('touchstart', handleOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId === 'deals' ? 'products' : tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-12 pt-4 pb-6 sm:pt-5 sm:pb-8 bg-gradient-to-b from-black/95 via-black/70 to-transparent flex items-center justify-between font-['Outfit'] pointer-events-auto transition-all duration-300">
      {/* Brand Logo */}
      <a
        href="#home"
        onClick={() => setActiveTab('home')}
        className="flex items-center gap-3 group shrink-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
      >
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/30 group-hover:border-[#ccff00] transition-colors bg-black/60 shrink-0">
          <img
            src="/logo.jpg"
            alt="Buildiff Nutrition"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-black tracking-tight text-white text-lg sm:text-xl uppercase flex items-center">
          <span className="text-[#ccff00] mr-0.5 text-2xl font-extrabold leading-none">.</span>
          BUILDIFF
        </span>
      </a>

      {/* Minimal Center Nav Links */}
      <nav className="hidden md:flex items-center gap-8 relative drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              onClick={() => handleNavClick(item.id)}
              className={`relative py-1 text-xs sm:text-sm font-extrabold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                isActive ? 'text-[#ccff00]' : 'text-white/90 hover:text-[#ccff00]'
              }`}
            >
              <span>{item.label}</span>

              {item.badge && (
                <span className="text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded bg-[#ccff00] text-black">
                  {item.badge}
                </span>
              )}

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="active-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ccff00] shadow-[0_0_8px_#ccff00]"
                />
              )}
            </a>
          );
        })}
      </nav>

      {/* Minimal Right Actions: Cart Button & Mobile Menu */}
      <div className="flex items-center gap-3 shrink-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
        {/* Transparent Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(204,255,0,0.4)] cursor-pointer"
          aria-label="Open Cart"
        >
          <ShoppingBag className="w-4 h-4 text-black" />
          <span className="hidden sm:inline-block">Cart</span>

          <span className="px-1.5 py-0.5 rounded bg-black text-[#ccff00] text-xs font-black">
            {totalItems}
          </span>
        </motion.button>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-[#ccff00] rounded-full bg-black/40 border border-white/20 touch-manipulation active:scale-95 transition-transform"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={navRef}
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-4 right-4 mt-2 p-3 rounded-2xl bg-neutral-950/95 backdrop-blur-2xl border border-white/20 flex flex-col gap-2 md:hidden shadow-2xl z-50 font-['Outfit'] text-left"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-[#ccff00] text-black font-extrabold'
                    : 'text-slate-200 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-black text-[#ccff00] font-black uppercase">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </a>
            ))}

            {/* Mobile Cart Action */}
            <div
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="mt-1 p-3 rounded-xl bg-[#ccff00] text-black flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-black text-[#ccff00]">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider">
                  My Cart ({totalItems} items)
                </span>
              </div>
              <span className="text-xs font-black bg-black text-[#ccff00] px-3 py-1.5 rounded-full">
                OPEN CART →
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
