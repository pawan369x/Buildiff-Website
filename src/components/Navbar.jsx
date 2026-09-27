import React, { useState, useEffect, useRef } from 'react';
import {
  Dumbbell, ShoppingBag, Menu, X, Flame, Search, ChevronDown,
  Heart, User, Sparkles, ArrowRight, ShieldCheck, Zap, Layers, Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

const Navbar = () => {
  const {
    totalItems,
    subtotal,
    setIsCartOpen,
    activeTab,
    setActiveTab,
    wishlist,
    searchQuery,
    setSearchQuery,
    navigateToCategory,
    setIsAccountModalOpen,
    addToCart
  } = useCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle outside click for search suggestions
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const instantSearchResults = searchQuery.trim()
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 4)
    : [];

  const quickSearchTags = ['Whey Protein', 'Creatine', 'Dumbbells', 'Workout Bench', 'Powerlifting Belt'];

  return (
    <>
      {/* Top Cyber Ticker Bar */}
      <div className="advance-top-bar">
        <div className="ticker-track">
          <div className="ticker-content">
            <span className="ticker-badge"><Zap size={13} /> ELITE ATHLETE EDITION</span>
            <span className="ticker-item">⚡ FREE Pan-India Express Shipping on orders over ₹1,499</span>
            <span className="ticker-dot">•</span>
            <span className="ticker-item">🏷️ Use Promo <strong>FITNESS20</strong> for Flat 20% OFF</span>
            <span className="ticker-dot">•</span>
            <span className="ticker-item">🛡️ 100% Authentic Lab-Tested Guarantee with FSSAI Compliance</span>
            <span className="ticker-dot">•</span>
            <span className="ticker-item">⭐ Trusted by 50,000+ Bodybuilders & Lifters</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className={`advance-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="advance-nav-inner">
          {/* Brand Logo with 3D Cyber Hexagon */}
          <div className="brand-cyber-logo" onClick={() => handleNavClick('home')}>
            <div className="cyber-icon-box">
              <Dumbbell className="cyber-dumbbell" size={26} />
              <span className="cyber-corner tr"></span>
              <span className="cyber-corner bl"></span>
            </div>
            <div className="brand-headings">
              <div className="brand-main-title">
                TITAN<span className="neon-text">FORGE</span>
              </div>
              <div className="brand-status-indicator">
                <span className="pulse-dot"></span>
                <span>PRO FITNESS LABS</span>
              </div>
            </div>
          </div>

          {/* Desktop Links with Mega-Menu Trigger */}
          <nav className="advance-desktop-nav">
            <button
              onClick={() => handleNavClick('home')}
              className={`advance-nav-btn ${activeTab === 'home' ? 'active' : ''}`}
            >
              <span>Home</span>
              <span className="nav-indicator-bar"></span>
            </button>

            {/* Mega Menu Trigger Button */}
            <div
              className="mega-nav-wrapper"
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <button
                onClick={() => handleNavClick('products')}
                className={`advance-nav-btn with-dropdown ${activeTab === 'products' ? 'active' : ''}`}
              >
                <span>Products & Gear</span>
                <ChevronDown size={15} className={`chevron-icon ${megaMenuOpen ? 'rotate' : ''}`} />
                <span className="nav-indicator-bar"></span>
              </button>

              {/* Advance Mega Menu Dropdown */}
              {megaMenuOpen && (
                <div className="mega-menu-panel">
                  <div className="mega-menu-grid">
                    {/* Col 1: Supplements */}
                    <div className="mega-col">
                      <div className="mega-col-header">
                        <Flame size={16} className="text-primary" />
                        <h5>SUPPLEMENTS</h5>
                      </div>
                      <ul className="mega-links-list">
                        <li>
                          <button onClick={() => { navigateToCategory('supplements'); setMegaMenuOpen(false); }}>
                            <span>100% Whey Protein Isolate</span>
                            <span className="mega-badge hot">HOT</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigateToCategory('supplements'); setMegaMenuOpen(false); }}>
                            <span>Micronized Creapure Creatine</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigateToCategory('supplements'); setMegaMenuOpen(false); }}>
                            <span>Pre-Workout Explosive Energy</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 2: Heavy Equipment */}
                    <div className="mega-col">
                      <div className="mega-col-header">
                        <Dumbbell size={16} className="text-accent" />
                        <h5>HEAVY IRON & BENCHES</h5>
                      </div>
                      <ul className="mega-links-list">
                        <li>
                          <button onClick={() => { navigateToCategory('equipment'); setMegaMenuOpen(false); }}>
                            <span>Adjustable Cast Iron Dumbbells</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigateToCategory('equipment'); setMegaMenuOpen(false); }}>
                            <span>Titan Olympic 7ft Barbell (20kg)</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigateToCategory('equipment'); setMegaMenuOpen(false); }}>
                            <span>Multi-Angle Incline/Decline Bench</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 3: Gear & Accessories */}
                    <div className="mega-col">
                      <div className="mega-col-header">
                        <Layers size={16} className="text-warning" />
                        <h5>GEAR & ACCESSORIES</h5>
                      </div>
                      <ul className="mega-links-list">
                        <li>
                          <button onClick={() => { navigateToCategory('gear'); setMegaMenuOpen(false); }}>
                            <span>Powerlifting 10mm Leather Belt</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigateToCategory('gear'); setMegaMenuOpen(false); }}>
                            <span>Heavy Duty Wrist Wraps</span>
                          </button>
                        </li>
                        <li>
                          <button onClick={() => { navigateToCategory('apparel'); setMegaMenuOpen(false); }}>
                            <span>Performance Stringer Vests</span>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Col 4: Featured Product Spotlight */}
                    <div className="mega-spotlight-card">
                      <div className="spotlight-tag">⭐ BESTSELLER DEAL</div>
                      <img
                        src="https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=400&q=80"
                        alt="Gold Standard Whey"
                        className="spotlight-img"
                      />
                      <div className="spotlight-details">
                        <h6>Gold Standard 100% Whey (2kg)</h6>
                        <div className="spotlight-price">
                          <span className="price-now">₹4,999</span>
                          <span className="price-cut">₹6,499</span>
                        </div>
                        <button
                          className="btn-spotlight-add"
                          onClick={() => {
                            addToCart(PRODUCTS[0]);
                            setMegaMenuOpen(false);
                          }}
                        >
                          <ShoppingBag size={14} />
                          <span>Quick Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                navigateToCategory('supplements');
              }}
              className="advance-nav-btn"
            >
              <span>Supplements</span>
              <span className="nav-indicator-bar"></span>
            </button>

            <button
              onClick={() => {
                navigateToCategory('equipment');
              }}
              className="advance-nav-btn"
            >
              <span>Equipment</span>
              <span className="nav-indicator-bar"></span>
            </button>
          </nav>

          {/* Search Box with Realtime Popup Suggestions */}
          <div className="advance-search-wrapper" ref={searchRef}>
            <div className={`advance-search-input-box ${searchFocused ? 'focused' : ''}`}>
              <Search size={17} className="search-pulse-icon" />
              <input
                type="text"
                placeholder="Search supplements, dumbbells, belts..."
                value={searchQuery}
                onFocus={() => setSearchFocused(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== 'products') setActiveTab('products');
                }}
              />
              {searchQuery && (
                <button
                  className="search-clear-cross"
                  onClick={() => setSearchQuery('')}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Quick Search Suggestions Dropdown */}
            {searchFocused && (
              <div className="search-dropdown-menu">
                <div className="quick-tags-strip">
                  <span className="quick-tag-label">Popular:</span>
                  {quickSearchTags.map(tag => (
                    <button
                      key={tag}
                      className="quick-search-pill"
                      onClick={() => {
                        setSearchQuery(tag);
                        setSearchFocused(false);
                        if (activeTab !== 'products') setActiveTab('products');
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {instantSearchResults.length > 0 ? (
                  <div className="instant-results-list">
                    <span className="dropdown-section-title">Matching Items</span>
                    {instantSearchResults.map(product => (
                      <div
                        key={product.id}
                        className="instant-result-row"
                        onClick={() => {
                          setSearchQuery(product.name);
                          setSearchFocused(false);
                        }}
                      >
                        <img src={product.image} alt={product.name} className="instant-thumb" />
                        <div className="instant-info">
                          <span className="instant-name">{product.name}</span>
                          <span className="instant-price">₹{product.price.toLocaleString('en-IN')}</span>
                        </div>
                        <button
                          className="instant-add-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          title="Add to Cart"
                        >
                          <ShoppingBag size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="no-instant-results">
                    <span>No quick match for "{searchQuery}". Press Enter to see all.</span>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/* Action Center (Wishlist, User Avatar, Advanced Cart Pill) */}
          <div className="advance-action-bar">
            {/* Wishlist Pill */}
            <button
              className="action-icon-pill"
              onClick={() => {
                handleNavClick('products');
              }}
              title="Saved Wishlist"
            >
              <Heart size={20} className={wishlist.length > 0 ? 'heart-filled' : ''} />
              {wishlist.length > 0 && (
                <span className="action-counter-pill">{wishlist.length}</span>
              )}
            </button>

            {/* VIP Athlete Profile Trigger */}
            <button
              className="action-icon-pill profile-pill"
              onClick={() => setIsAccountModalOpen(true)}
              title="Athlete VIP Status"
            >
              <User size={20} />
              <span className="vip-dot">PRO</span>
            </button>

            {/* Advance Cart Pill with Live Count and Live Price */}
            <button
              className="advance-cart-pill"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
            >
              <div className="cart-pill-icon-wrap">
                <ShoppingBag size={20} />
                <span className="cart-pill-badge">{totalItems}</span>
              </div>
              <div className="cart-pill-pricing">
                <span className="cart-label-micro">CART</span>
                <span className="cart-pill-val">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <ArrowRight size={16} className="cart-arrow-indicator" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Glass Drawer */}
        {mobileMenuOpen && (
          <div className="advance-mobile-drawer">
            <div className="mobile-search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search fitness products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveTab('products');
                }}
              />
            </div>

            <div className="mobile-links-stack">
              <button
                className={`mobile-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                <span>Home Overview</span>
                <ArrowRight size={16} />
              </button>

              <button
                className={`mobile-nav-item ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => handleNavClick('products')}
              >
                <span>All Products Catalog</span>
                <span className="mobile-pill">12+ Items</span>
              </button>

              <button
                className="mobile-nav-item"
                onClick={() => {
                  navigateToCategory('supplements');
                  setMobileMenuOpen(false);
                }}
              >
                <span>Supplements (Whey & Creatine)</span>
                <Flame size={16} className="text-primary" />
              </button>

              <button
                className="mobile-nav-item"
                onClick={() => {
                  navigateToCategory('equipment');
                  setMobileMenuOpen(false);
                }}
              >
                <span>Heavy Dumbbells & Benches</span>
                <Dumbbell size={16} className="text-accent" />
              </button>

              <button
                className="mobile-nav-item"
                onClick={() => {
                  navigateToCategory('gear');
                  setMobileMenuOpen(false);
                }}
              >
                <span>Belts, Wraps & Shakers</span>
                <Layers size={16} className="text-warning" />
              </button>

              <div className="mobile-cart-banner" onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }}>
                <div className="flex-align">
                  <ShoppingBag size={22} className="text-accent" />
                  <div>
                    <strong>View Cart ({totalItems} items)</strong>
                    <p>Total: ₹{subtotal.toLocaleString('en-IN')}</p>
                  </div>
                </div>
                <ArrowRight size={18} />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
