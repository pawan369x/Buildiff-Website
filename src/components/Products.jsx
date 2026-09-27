import React, { useState, useMemo, useRef } from 'react';
import {
  Star,
  ShoppingBag,
  Check,
  Zap,
  SlidersHorizontal,
  ArrowUpDown,
  Heart,
  Sparkles,
  ShieldCheck,
  Eye,
  X,
  Truck,
  Award,
  Search,
  Filter,
  Flame,
  ChevronRight,
  Grid,
  List,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

// --- MINIMALIST LUXURY PRODUCT CARD COMPONENT (MATCHING USER SCREENSHOT) ---
const PremiumProductCard = ({
  product,
  sel,
  onSizeChange,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  isAdded,
  onQuickView
}) => {
  const currentPrice = sel.size ? sel.size.price : product.basePrice;
  const currentOrigPrice = sel.size ? sel.size.originalPrice : product.originalPrice;

  return (
    <div className="group relative rounded-2xl bg-[#121214] border border-neutral-800/80 hover:border-neutral-600 p-3.5 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-2xl">
      {/* Top Image Box with High-Contrast Background & Floating Badges */}
      <div className="relative w-full h-64 sm:h-72 rounded-xl bg-neutral-900/90 border border-neutral-800/60 overflow-hidden flex items-center justify-center p-3 group">
        
        {/* Top Badges (Matching Screenshot: Top-Left REDUCED PRICE / NEW, Top-Right DISCOUNT %) */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between z-20 pointer-events-none">
          <div className="flex flex-col gap-1 items-start">
            <span className="text-[9px] font-black tracking-wider uppercase text-neutral-300 bg-black/80 px-2 py-0.5 rounded backdrop-blur-md">
              REDUCED PRICE
            </span>
            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#ccff00]">
              {product.categoryLabel}
            </span>
          </div>

          <span className="px-2.5 py-1 rounded-md bg-[#00e676] text-black font-black text-[11px] tracking-wider uppercase shadow-md">
            -{product.discount}
          </span>
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute bottom-2.5 right-2.5 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all duration-200 cursor-pointer active:scale-90 ${
            isWishlisted
              ? 'bg-rose-500 text-white border-rose-400 shadow-md'
              : 'bg-black/60 text-neutral-400 border-neutral-700/60 hover:text-white hover:bg-neutral-800'
          }`}
          title={isWishlisted ? 'Remove Wishlist' : 'Add Wishlist'}
        >
          <Heart size={14} fill={isWishlisted ? 'white' : 'none'} />
        </button>

        {/* Main Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain p-2 group-hover:scale-106 transition-transform duration-500 ease-out"
        />

        {/* Floating Quick Action Bar on Hover (Matching Screenshot Bar) */}
        <div className="absolute bottom-2.5 left-2.5 right-12 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2 px-3 rounded-lg bg-white hover:bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl transition-all cursor-pointer"
          >
            <Eye size={14} />
            <span>Quick View Specs</span>
          </button>
        </div>
      </div>

      {/* Card Details & Info */}
      <div className="pt-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm sm:text-base font-bold text-white hover:text-[#ccff00] transition-colors line-clamp-2 leading-snug cursor-pointer mb-2"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2.5 text-xs text-neutral-400">
            <div className="flex items-center text-amber-400">
              <Star size={12} className="fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-white text-[11px]">{product.rating}</span>
            <span className="text-neutral-500 text-[10px]">({product.reviews})</span>
          </div>

          {/* Size Selectors (Minimalist Pills) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.sizes.map((sz, idx) => {
                const isSelected = sel.size?.label === sz.label;
                return (
                  <button
                    key={idx}
                    onClick={() => onSizeChange(product.id, sz)}
                    className={`px-2 py-0.5 rounded text-[10px] font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#ccff00] text-black shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                    }`}
                  >
                    {sz.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-2.5 border-t border-neutral-800/80">
          <div className="flex items-baseline gap-2 mb-3">
            {currentOrigPrice && (
              <span className="text-xs text-neutral-500 line-through">
                ₹{currentOrigPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xl font-black text-[#ccff00] tracking-tight">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Action Button Grid */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onAddToCart(product)}
              className={`py-2.5 px-2.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={14} className="stroke-[3]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={14} />
                  <span>Add To Cart</span>
                </>
              )}
            </button>

            <button
              onClick={() => onBuyNow(product)}
              className="py-2.5 px-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white hover:text-[#ccff00] font-bold text-xs uppercase tracking-wider border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PRODUCTS COMPONENT WITH LEFT SIDEBAR FILTER ---
const Products = () => {
  const {
    addToCart,
    setIsCartOpen,
    setIsCheckoutOpen,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    toggleWishlist,
    isInWishlist
  } = useCart();

  const [sortBy, setSortBy] = useState('featured');
  const [priceFilter, setPriceFilter] = useState('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [addedIds, setAddedIds] = useState({});
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [productSelections, setProductSelections] = useState({});

  // Dynamic category item count badges
  const categoryCounts = useMemo(() => {
    const counts = { all: PRODUCTS.length };
    PRODUCTS.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const getProductSelection = (product) => {
    const defaultSize = product.sizes ? product.sizes[0] : null;
    const defaultFlavor = product.flavors ? product.flavors[0] : 'Standard';

    return productSelections[product.id] || {
      size: defaultSize,
      flavor: defaultFlavor
    };
  };

  const handleSizeChange = (productId, sizeObj) => {
    setProductSelections(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        size: sizeObj
      }
    }));
  };

  const handleAddToCart = (product) => {
    const sel = getProductSelection(product);
    addToCart(product, 1, sel.size, sel.flavor);
    setAddedIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds(prev => ({ ...prev, [product.id]: false }));
    }, 1200);
  };

  const handleBuyNow = (product) => {
    const sel = getProductSelection(product);
    addToCart(product, 1, sel.size, sel.flavor);
    if (setIsCheckoutOpen) {
      setIsCheckoutOpen(true);
    } else {
      setIsCartOpen(true);
    }
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setPriceFilter('all');
    setSearchQuery('');
    setInStockOnly(false);
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesPrice = true;
      if (priceFilter === 'under1500') matchesPrice = item.basePrice < 1500;
      else if (priceFilter === '1500-3500') matchesPrice = item.basePrice >= 1500 && item.basePrice <= 3500;
      else if (priceFilter === '3500plus') matchesPrice = item.basePrice > 3500;

      let matchesStock = true;
      if (inStockOnly) matchesStock = item.inStock !== false;

      return matchesCategory && matchesSearch && matchesPrice && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy, priceFilter, inStockOnly]);

  return (
    <section className="products-section bg-neutral-950 text-white min-h-screen pb-24 px-4 sm:px-8 font-['Outfit']" id="products-catalog">
      <div className="max-w-7xl mx-auto pt-4">
        
        {/* Store Hero Banner */}
        <div className="mb-10 text-center md:text-left bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-6 sm:p-10 rounded-3xl border border-neutral-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black tracking-widest uppercase mb-3">
              <Zap size={14} className="animate-pulse" />
              <span>OFFICIAL BUILDIFF NUTRITION VAULT</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
              CLINICAL GRADE <span className="text-[#ccff00]">SUPPLEMENTS</span>
            </h1>
            
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-5 max-w-2xl">
              100% Native Whey Isolates, German Creapure®, Explosive Pre-Workouts & Anabolic Mass Gainers. Formulated for bodybuilders, lifters & elite athletes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-neutral-800 text-[11px]">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck size={15} className="text-[#ccff00]" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Award size={15} className="text-[#ccff00]" />
                <span>3-Tier Lab Tested</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Truck size={15} className="text-[#ccff00]" />
                <span>48H Express Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Sparkles size={15} className="text-[#ccff00]" />
                <span>Zero Bloat Tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold text-white hover:border-[#ccff00] transition-colors"
          >
            <Filter size={16} className="text-[#ccff00]" />
            <span>{isMobileFilterOpen ? 'Hide Filters' : 'Show Filters & Categories'}</span>
          </button>
          <span className="text-xs text-neutral-400 font-medium">
            Showing {filteredProducts.length} items
          </span>
        </div>

        {/* MAIN LAYOUT: LEFT SIDEBAR + RIGHT 3-CARD PRODUCT GRID */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR FILTER PANEL ================= */}
          <aside
            className={`w-full lg:w-64 flex-shrink-0 space-y-6 ${
              isMobileFilterOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            {/* 1. CATEGORIES NAVIGATION (MATCHING SCREENSHOT HOME MENU) */}
            <div className="bg-[#121214] border border-neutral-800/80 rounded-2xl p-5 shadow-xl">
              <h3 className="text-xs font-black uppercase tracking-wider text-white mb-4 pb-2 border-b border-neutral-800/80 flex items-center justify-between">
                <span>CATEGORIES</span>
                <span className="text-[10px] text-[#ccff00] font-bold">NAVIGATE</span>
              </h3>

              <div className="space-y-1">
                {CATEGORIES.map(cat => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between py-2 px-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer group ${
                        isActive
                          ? 'bg-[#ccff00]/10 text-[#ccff00] border-l-2 border-[#ccff00]'
                          : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <ChevronRight
                        size={14}
                        className={`transition-transform duration-200 ${
                          isActive ? 'text-[#ccff00] translate-x-1' : 'text-neutral-600 group-hover:translate-x-1 group-hover:text-white'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. FILTER BY SECTION (MATCHING SCREENSHOT FILTER BY) */}
            <div className="bg-[#121214] border border-neutral-800/80 rounded-2xl p-5 shadow-xl space-y-6">
              
              {/* Header with Clear All Button */}
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
                <span className="text-xs font-black uppercase tracking-wider text-white">
                  FILTER BY
                </span>
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-neutral-400 hover:text-[#ccff00] transition-colors cursor-pointer"
                >
                  <X size={12} />
                  <span>CLEAR ALL</span>
                </button>
              </div>

              {/* Checkbox Category Filters with Count Badge */}
              <div>
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-300 mb-3">
                  Categories
                </h4>
                <div className="space-y-2">
                  {CATEGORIES.map(cat => {
                    const isChecked = activeCategory === cat.id;
                    const count = categoryCounts[cat.id] || 0;
                    return (
                      <label
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className="flex items-center justify-between text-xs text-neutral-400 hover:text-white cursor-pointer group py-1"
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#ccff00] border-[#ccff00] text-black'
                              : 'border-neutral-700 bg-neutral-900 group-hover:border-neutral-500'
                          }`}>
                            {isChecked && <Check size={12} className="stroke-[3]" />}
                          </div>
                          <span className={`text-xs font-semibold ${isChecked ? 'text-white' : 'text-neutral-400'}`}>
                            {cat.label}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-500 group-hover:text-neutral-300 border border-neutral-800">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Price Filter Section */}
              <div className="pt-3 border-t border-neutral-800/80">
                <h4 className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-300 mb-3">
                  Price Range
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'All Prices' },
                    { id: 'under1500', label: 'Under ₹1,500' },
                    { id: '1500-3500', label: '₹1,500 - ₹3,500' },
                    { id: '3500plus', label: '₹3,500 & Above' }
                  ].map(p => {
                    const isSelected = priceFilter === p.id;
                    return (
                      <label
                        key={p.id}
                        onClick={() => setPriceFilter(p.id)}
                        className="flex items-center gap-2.5 text-xs text-neutral-400 hover:text-white cursor-pointer py-1 group"
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'border-[#ccff00] bg-neutral-900'
                            : 'border-neutral-700 bg-neutral-900 group-hover:border-neutral-500'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-[#ccff00]" />}
                        </div>
                        <span className={`text-xs ${isSelected ? 'text-white font-bold' : 'text-neutral-400'}`}>
                          {p.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Stock Filter Checkbox */}
              <div className="pt-3 border-t border-neutral-800/80">
                <label
                  onClick={() => setInStockOnly(!inStockOnly)}
                  className="flex items-center gap-2.5 text-xs text-neutral-400 hover:text-white cursor-pointer py-1 group"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                    inStockOnly
                      ? 'bg-[#ccff00] border-[#ccff00] text-black'
                      : 'border-neutral-700 bg-neutral-900 group-hover:border-neutral-500'
                  }`}>
                    {inStockOnly && <Check size={12} className="stroke-[3]" />}
                  </div>
                  <span className={`text-xs ${inStockOnly ? 'text-white font-bold' : 'text-neutral-400'}`}>
                    In Stock Only
                  </span>
                </label>
              </div>

            </div>
          </aside>

          {/* ================= RIGHT MAIN PRODUCT SECTION ================= */}
          <main className="flex-1 w-full">
            
            {/* Top Toolbar (Sort by, Search, Item Count - Matching Screenshot Header) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-[#121214] border border-neutral-800/80 shadow-xl">
              
              {/* Left Item Counter & Search */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-xs text-neutral-400 font-bold hidden md:inline-block whitespace-nowrap">
                  Showing <span className="text-white">{filteredProducts.length}</span> Products
                </span>

                <div className="relative w-full sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search supplements..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-7 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00] transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Sort By Dropdown */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-xs text-neutral-400 font-bold whitespace-nowrap">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    className="bg-neutral-900 text-white font-bold text-xs border border-neutral-800 rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#ccff00] transition-colors"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="featured" className="bg-neutral-900">Relevance</option>
                    <option value="price-low" className="bg-neutral-900">Price: Low to High</option>
                    <option value="price-high" className="bg-neutral-900">Price: High to Low</option>
                    <option value="rating" className="bg-neutral-900">Highest Rated</option>
                  </select>
                </div>
              </div>

            </div>

            {/* 3-Column Minimalist Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map(product => {
                  const sel = getProductSelection(product);
                  return (
                    <PremiumProductCard
                      key={product.id}
                      product={product}
                      sel={sel}
                      onSizeChange={handleSizeChange}
                      onAddToCart={handleAddToCart}
                      onBuyNow={handleBuyNow}
                      onToggleWishlist={toggleWishlist}
                      isWishlisted={isInWishlist(product.id)}
                      isAdded={addedIds[product.id]}
                      onQuickView={(p) => setSelectedProductForModal(p)}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#121214] border border-neutral-800/80 rounded-3xl">
                <SlidersHorizontal size={48} className="mx-auto text-neutral-600 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No supplements match filters</h3>
                <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
                  Try adjusting your search query, price filter, or selecting another category.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(204,255,0,0.3)] cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Quick View Detailed Product Modal */}
      {selectedProductForModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col md:flex-row">
            <button
              onClick={() => setSelectedProductForModal(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-neutral-800 text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="w-full md:w-1/2 bg-neutral-950 p-6 flex flex-col items-center justify-center relative">
              <img
                src={selectedProductForModal.image}
                alt={selectedProductForModal.name}
                className="w-full max-h-64 md:max-h-80 object-cover rounded-2xl"
              />
              <div className="mt-4 flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#ccff00]" />
                <span className="text-xs text-neutral-300 font-semibold">100% Authentic & Lab Tested</span>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-6 overflow-y-auto max-h-[80vh] flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-1 rounded bg-[#ccff00]/20 text-[#ccff00] text-[10px] font-black uppercase tracking-wider border border-[#ccff00]/30">
                  {selectedProductForModal.categoryLabel}
                </span>

                <h3 className="text-xl font-bold text-white mt-2 mb-2">
                  {selectedProductForModal.name}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {selectedProductForModal.description}
                </p>

                {selectedProductForModal.nutritionFacts && (
                  <div className="mb-4 bg-neutral-950 border border-neutral-800 rounded-xl p-3">
                    <span className="text-[11px] font-bold text-[#ccff00] uppercase tracking-wider block mb-2">
                      Supplement Facts Breakdown:
                    </span>
                    <div className="space-y-1.5">
                      {selectedProductForModal.nutritionFacts.map((fact, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs py-0.5 border-b border-neutral-800/50">
                          <span className="text-neutral-400">{fact.label}</span>
                          <span className="font-extrabold text-white">{fact.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-black text-white">
                    ₹{getProductSelection(selectedProductForModal).size?.price || selectedProductForModal.basePrice}
                  </span>
                  <span className="text-xs text-neutral-500 line-through">
                    ₹{getProductSelection(selectedProductForModal).size?.originalPrice || selectedProductForModal.originalPrice}
                  </span>
                  <span className="text-xs text-[#ccff00] font-bold ml-auto">
                    {selectedProductForModal.discount}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProductForModal);
                      setSelectedProductForModal(null);
                    }}
                    className="py-3 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.4)] cursor-pointer"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => {
                      handleBuyNow(selectedProductForModal);
                      setSelectedProductForModal(null);
                    }}
                    className="py-3 rounded-xl bg-white hover:bg-neutral-200 text-black font-black text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
