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
  Flame
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';

// --- ADVANCED 3D TILT ANIMATED CARD COMPONENT ---
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
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rx: 0, ry: 0, active: false });

  // 3D Tilt calculation on Mouse Move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Tilt angles (subtle & premium)
    const rx = ((y - centerY) / centerY) * -7;
    const ry = ((x - centerX) / centerX) * 7;

    setMousePos({ x, y, rx, ry, active: true });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0, rx: 0, ry: 0, active: false });
  };

  const currentPrice = sel.size ? sel.size.price : product.basePrice;
  const currentOrigPrice = sel.size ? sel.size.originalPrice : product.originalPrice;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: mousePos.active
          ? `perspective(1000px) rotateX(${mousePos.rx}deg) rotateY(${mousePos.ry}deg) translateY(-6px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transition: mousePos.active ? 'transform 0.1s ease-out' : 'transform 0.5s ease',
      }}
      className="group relative rounded-3xl bg-gradient-to-b from-neutral-900/90 via-neutral-950/90 to-black border border-neutral-800/90 hover:border-[#ccff00]/60 p-4 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-all duration-300"
    >
      {/* Neon Radial Mouse Spotlight Tracker */}
      {mousePos.active && (
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-30 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204,255,0,0.18), transparent 60%)`,
          }}
        />
      )}

      {/* Top Image & Badge Container */}
      <div className="relative w-full h-64 rounded-2xl bg-[#09090b] overflow-hidden flex items-center justify-center p-3 border border-neutral-800/60">
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ccff00] text-black font-black text-[11px] tracking-wider uppercase shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            <Flame size={12} className="fill-black stroke-black animate-bounce" />
            <span>{product.discount}</span>
          </div>
        </div>

        {/* Wishlist Button with Heart Animation */}
        <button
          onClick={() => onToggleWishlist(product)}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full backdrop-blur-xl border transition-all duration-300 active:scale-75 ${
            isWishlisted
              ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.6)]'
              : 'bg-black/60 text-neutral-300 border-neutral-700/60 hover:text-white hover:bg-neutral-800 hover:border-neutral-500'
          }`}
          title={isWishlisted ? 'Wishlist se hatayein' : 'Wishlist me jodein'}
        >
          <Heart size={15} fill={isWishlisted ? 'white' : 'none'} className="transition-transform duration-300" />
        </button>

        {/* Main Product Image */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover rounded-xl group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Quick View Specs Glass Overlay on Hover */}
        <div className="absolute inset-0 bg-neutral-950/85 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-5 text-center z-10">
          {product.specs && (
            <div className="space-y-2 mb-5 w-full">
              <span className="inline-block px-2.5 py-1 rounded-md bg-[#ccff00]/15 text-[#ccff00] text-[10px] font-black uppercase tracking-widest border border-[#ccff00]/30 mb-1">
                {product.tag || 'Premium Clinical Grade'}
              </span>
              <div className="text-xs font-semibold text-neutral-200 bg-neutral-900/90 rounded-xl p-2.5 border border-neutral-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-neutral-400">⚡ Protein/Scoop:</span>
                  <span className="text-[#ccff00] font-black">{product.specs.protein || '25g'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">💪 BCAAs:</span>
                  <span className="text-white font-bold">{product.specs.bcaa || '5.5g'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">🌱 Added Sugar:</span>
                  <span className="text-emerald-400 font-bold">{product.specs.sugar || '0g'}</span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2.5 rounded-xl bg-white hover:bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer active:scale-95"
          >
            <Eye size={15} />
            <span>Quick View Specs</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag & Rating Bar */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black tracking-widest uppercase text-[#ccff00]/90">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-[11px] font-bold">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              <span className="text-white">{product.rating}</span>
              <span className="text-neutral-500 font-normal">({product.reviews})</span>
            </div>
          </div>

          {/* Title */}
          <h3
            onClick={() => onQuickView(product)}
            className="text-base font-black text-white hover:text-[#ccff00] transition-colors line-clamp-2 leading-snug cursor-pointer mb-3"
          >
            {product.name}
          </h3>

          {/* Size Selectors (Pills) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {product.sizes.map((sz, idx) => {
                const isSelected = sel.size?.label === sz.label;
                return (
                  <button
                    key={idx}
                    onClick={() => onSizeChange(product.id, sz)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black tracking-tight transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#ccff00] text-black shadow-[0_0_12px_rgba(204,255,0,0.5)] scale-102'
                        : 'bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                    }`}
                  >
                    {sz.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Pricing & CTA Buttons */}
        <div>
          <div className="flex items-baseline gap-2 pt-3 pb-3 border-t border-neutral-800/80">
            <span className="text-2xl font-black text-white tracking-tight">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {currentOrigPrice && (
              <span className="text-xs text-neutral-500 line-through">
                ₹{currentOrigPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[10px] text-[#ccff00] font-black uppercase tracking-wider ml-auto bg-[#ccff00]/10 px-2 py-0.5 rounded border border-[#ccff00]/20">
              GST Included
            </span>
          </div>

          {/* Action Button Grid */}
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => onAddToCart(product)}
              className={`py-3 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-95 cursor-pointer ${
                isAdded
                  ? 'bg-emerald-500 text-white shadow-[0_0_18px_rgba(16,185,129,0.5)]'
                  : 'bg-[#ccff00] hover:bg-[#d8ff33] text-black shadow-[0_0_20px_rgba(204,255,0,0.35)] hover:shadow-[0_0_25px_rgba(204,255,0,0.6)]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={16} className="stroke-[3]" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={15} className="stroke-[2.5]" />
                  <span>Add To Cart</span>
                </>
              )}
            </button>

            <button
              onClick={() => onBuyNow(product)}
              className="py-3 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white hover:text-[#ccff00] font-black text-xs uppercase tracking-wider border border-neutral-800 hover:border-neutral-600 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PRODUCTS COMPONENT ---
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
  const [addedIds, setAddedIds] = useState({});
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [productSelections, setProductSelections] = useState({});

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

      return matchesCategory && matchesSearch && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.basePrice - b.basePrice;
      if (sortBy === 'price-high') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy, priceFilter]);

  return (
    <section className="products-section bg-neutral-950 text-white min-h-screen pb-24 px-4 sm:px-8 font-['Outfit']" id="products-catalog">
      <div className="max-w-7xl mx-auto pt-4">
        
        {/* Store Hero Banner */}
        <div className="mb-10 text-center md:text-left bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-950 p-8 sm:p-12 rounded-3xl border border-neutral-800 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black tracking-widest uppercase mb-4">
              <Zap size={14} className="animate-pulse" />
              <span>OFFICIAL BUILDIFF NUTRITION VAULT</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-4">
              CLINICAL GRADE <span className="text-[#ccff00]">SUPPLEMENTS</span>
            </h1>
            
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
              100% Native Whey Isolates, German Creapure®, Explosive Pre-Workouts & Anabolic Mass Gainers. Formulated for bodybuilders, lifters & elite athletes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <ShieldCheck size={16} className="text-[#ccff00]" />
                <span>100% Authentic</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Award size={16} className="text-[#ccff00]" />
                <span>3-Tier Lab Tested</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Truck size={16} className="text-[#ccff00]" />
                <span>48H Express Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <Sparkles size={16} className="text-[#ccff00]" />
                <span>Zero Bloat Tech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Control Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-neutral-800 gap-4">
          <div className="flex items-center gap-3">
            <Filter size={18} className="text-[#ccff00]" />
            <h2 className="text-lg font-black uppercase tracking-wider text-white">
              Filter Catalog ({filteredProducts.length} Items)
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Price Filter Pills */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl text-xs">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under1500', label: '< ₹1.5k' },
                { id: '1500-3500', label: '₹1.5k - ₹3.5k' },
                { id: '3500plus', label: '₹3.5k+' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPriceFilter(p.id)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    priceFilter === p.id
                      ? 'bg-[#ccff00] text-black shadow-[0_0_10px_rgba(204,255,0,0.4)]'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3 py-1.5 rounded-xl text-xs">
              <ArrowUpDown size={14} className="text-[#ccff00]" />
              <select
                className="bg-transparent text-white font-bold outline-none cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="featured" className="bg-neutral-900">Featured</option>
                <option value="price-low" className="bg-neutral-900">Price: Low to High</option>
                <option value="price-high" className="bg-neutral-900">Price: High to Low</option>
                <option value="rating" className="bg-neutral-900">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search & Category Navigation Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search Whey, Creatine, Pre-workout..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* 3D Animated Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          <div className="py-16 text-center bg-neutral-900 border border-neutral-800 rounded-3xl">
            <SlidersHorizontal size={48} className="mx-auto text-neutral-600 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No supplements match filters</h3>
            <p className="text-sm text-neutral-400 max-w-md mx-auto mb-6">
              Try adjusting your search query, price filter, or selecting another category.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setPriceFilter('all');
              }}
              className="px-6 py-2.5 rounded-xl bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        )}
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
