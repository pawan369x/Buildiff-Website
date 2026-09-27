import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartDrawer = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    coupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discount,
    deliveryFee,
    finalTotal,
    totalItems
  } = useCart();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="cart-header">
          <div className="cart-header-title">
            <ShoppingBag className="text-primary" size={24} />
            <h3>Your Fitness Cart</h3>
            <span className="cart-count-bubble">{totalItems} items</span>
          </div>
          <button
            className="btn-icon-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="shipping-progress-box">
          {subtotal >= 1500 ? (
            <div className="free-shipping-unlocked">
              <Sparkles size={16} className="text-accent" />
              <span>You unlocked <strong>FREE Pan-India Delivery!</strong></span>
            </div>
          ) : (
            <div>
              <div className="shipping-text">
                Add <strong>₹{(1500 - subtotal).toLocaleString('en-IN')}</strong> more for <strong>FREE Delivery!</strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${Math.min(100, (subtotal / 1500) * 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items or Empty State */}
        <div className="cart-items-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-circle">
                <ShoppingBag size={48} />
              </div>
              <h4>Your Cart is Empty</h4>
              <p>Looks like you haven't added any fitness gear or supplements yet.</p>
              <button
                className="btn-primary"
                onClick={() => setIsCartOpen(false)}
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(item => {
                const itemKey = item.cartKey || item.id;
                return (
                  <div key={itemKey} className="cart-item-card">
                    <img src={item.image} alt={item.name} className="cart-item-thumb" />
                    
                    <div className="cart-item-details">
                      <div className="cart-item-row-top">
                        <span className="cart-item-cat">{item.categoryLabel}</span>
                        <button
                          className="btn-item-delete"
                          onClick={() => removeFromCart(itemKey)}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <h4 className="cart-item-title">{item.name}</h4>

                      {(item.selectedSizeLabel || item.selectedFlavor) && (
                        <div className="flex flex-wrap gap-1.5 my-1.5 text-[11px]">
                          {item.selectedSizeLabel && (
                            <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 font-semibold border border-neutral-700">
                              Size: {item.selectedSizeLabel}
                            </span>
                          )}
                          {item.selectedFlavor && (
                            <span className="px-2 py-0.5 rounded bg-[#ccff00]/15 text-[#ccff00] font-semibold border border-[#ccff00]/30">
                              Flavor: {item.selectedFlavor}
                            </span>
                          )}
                        </div>
                      )}

                      <div className="cart-item-pricing-row">
                        <span className="cart-item-price">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="cart-item-unit-price">
                            (₹{item.price.toLocaleString('en-IN')} each)
                          </span>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="cart-qty-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(itemKey, -1)}
                          title="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(itemKey, 1)}
                          title="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="clear-cart-row">
                <button className="btn-clear-cart" onClick={clearCart}>
                  Clear all items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer with Calculations & Checkout */}
        {cart.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Section */}
            <div className="promo-box">
              {coupon.applied ? (
                <div className="coupon-applied-badge">
                  <div className="coupon-badge-text">
                    <Tag size={16} />
                    <span>Coupon <strong>{coupon.code}</strong> applied ({coupon.discountPercent}% OFF)</span>
                  </div>
                  <button className="btn-remove-coupon" onClick={removeCoupon}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <div className="coupon-input-wrap">
                    <Tag size={16} className="coupon-icon" />
                    <input
                      type="text"
                      placeholder="Discount Code (e.g. FITNESS20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="coupon-input"
                    />
                  </div>
                  <button type="submit" className="btn-apply-coupon">
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row discount-row">
                  <span>Promo Discount ({coupon.discountPercent}%)</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Shipping / Delivery</span>
                <span>
                  {deliveryFee === 0 ? (
                    <strong className="text-free">FREE</strong>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span className="total-amount">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              className="btn-checkout"
              onClick={handleProceedToCheckout}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </button>

            <div className="security-note">
              <ShieldCheck size={16} className="text-accent" />
              <span>256-Bit SSL Encrypted & 100% Safe Checkout</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
