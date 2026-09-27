import React, { createContext, useState, useEffect } from 'react';
import { useCart } from './useCart';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('titan_fitness_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map(item => ({
            ...item,
            price: Number(item.price || item.basePrice || 2999),
            originalPrice: Number(item.originalPrice || 3999),
            quantity: Number(item.quantity || 1)
          })).filter(item => item.name && item.price > 0);
        }
      }
      return [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('titan_fitness_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'products'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [coupon, setCoupon] = useState({ code: '', discountPercent: 0, applied: false });
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('titan_fitness_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('titan_fitness_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1, selectedSize = null, selectedFlavor = null) => {
    const sizeObj = selectedSize || (product.sizes ? product.sizes[0] : null);
    const itemPrice = sizeObj ? sizeObj.price : product.basePrice || product.price;
    const itemOrigPrice = sizeObj ? sizeObj.originalPrice : product.originalPrice;
    const flavor = selectedFlavor || (product.flavors ? product.flavors[0] : 'Standard');
    const sizeLabel = sizeObj ? sizeObj.label : 'Standard';

    const cartKey = `${product.id}-${sizeLabel}-${flavor}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartKey === cartKey);
      if (existingIndex > -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          ...product,
          cartKey,
          price: itemPrice,
          originalPrice: itemOrigPrice,
          selectedSizeLabel: sizeLabel,
          selectedFlavor: flavor,
          quantity
        }
      ];
    });
    showToast(`⚡ Added to Cart: ${product.name.slice(0, 22)}... (${sizeLabel})`);
  };

  const removeFromCart = (cartKeyOrId) => {
    setCart(prev => prev.filter(item => (item.cartKey || item.id) !== cartKeyOrId));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (cartKeyOrId, delta) => {
    setCart(prev =>
      prev
        .map(item => {
          if ((item.cartKey || item.id) === cartKeyOrId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`, 'info');
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`❤️ Saved to Wishlist: ${product.name.slice(0, 20)}...`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const applyCoupon = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'FITNESS20' || trimmed === 'GYM20') {
      setCoupon({ code: trimmed, discountPercent: 20, applied: true });
      showToast('🎉 Coupon FITNESS20 applied! 20% OFF');
      return { success: true, message: '20% Discount applied!' };
    } else if (trimmed === 'TITAN10') {
      setCoupon({ code: trimmed, discountPercent: 10, applied: true });
      showToast('🎉 Coupon TITAN10 applied! 10% OFF');
      return { success: true, message: '10% Discount applied!' };
    } else {
      showToast('❌ Invalid coupon code. Try FITNESS20', 'error');
      return { success: false, message: 'Invalid coupon code. Try FITNESS20' };
    }
  };

  const removeCoupon = () => {
    setCoupon({ code: '', discountPercent: 0, applied: false });
    showToast('Coupon removed', 'info');
  };

  // Select category and switch to products page
  const navigateToCategory = (catId) => {
    setActiveCategory(catId);
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round((subtotal * coupon.discountPercent) / 100);
  const deliveryFee = subtotal > 1500 || subtotal === 0 ? 0 : 99;
  const gst = Math.round((subtotal - discount) * 0.18);
  const finalTotal = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAccountModalOpen,
        setIsAccountModalOpen,
        activeTab,
        setActiveTab,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        navigateToCategory,
        coupon,
        applyCoupon,
        removeCoupon,
        totalItems,
        subtotal,
        discount,
        deliveryFee,
        gst,
        finalTotal,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { useCart };
