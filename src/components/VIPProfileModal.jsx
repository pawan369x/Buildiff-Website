import React from 'react';
import { X, Award, ShieldCheck, Zap, Sparkles, CheckCircle2, Copy } from 'lucide-react';
import { useCart } from '../context/CartContext';

const VIPProfileModal = () => {
  const { isAccountModalOpen, setIsAccountModalOpen, showToast, applyCoupon } = useCart();

  if (!isAccountModalOpen) return null;

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    applyCoupon(code);
    showToast(`Copied & Applied "${code}"!`);
  };

  return (
    <div className="payment-backdrop" onClick={() => setIsAccountModalOpen(false)}>
      <div className="vip-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="vip-modal-header">
          <div className="flex-align">
            <Award className="text-warning" size={24} />
            <h3>Titan Athlete Pass</h3>
          </div>
          <button
            className="btn-icon-close"
            onClick={() => setIsAccountModalOpen(false)}
            aria-label="Close Profile"
          >
            <X size={20} />
          </button>
        </div>

        <div className="vip-card-banner">
          <div className="vip-badge-row">
            <span className="tier-tag">TITAN ELITE TIER</span>
            <span className="tier-level">LEVEL 3 VIP</span>
          </div>
          <h4>VIKRAM SHARMA</h4>
          <p className="vip-id">ATHLETE ID: #TF-994021 • ACTIVE MEMBER</p>
          <div className="vip-stats-row">
            <div>
              <span className="v-stat-num">1,450</span>
              <span className="v-stat-lbl">FIT COINS</span>
            </div>
            <div>
              <span className="v-stat-num">5</span>
              <span className="v-stat-lbl">ORDERS PLACED</span>
            </div>
            <div>
              <span className="v-stat-num">FREE</span>
              <span className="v-stat-lbl">EXPRESS SHIPPING</span>
            </div>
          </div>
        </div>

        <div className="vip-perks-section">
          <h5>Your Exclusive Member Perks:</h5>
          <div className="perk-row">
            <CheckCircle2 size={18} className="text-accent" />
            <div>
              <strong>Exclusive 20% Discount</strong>
              <p>Apply promo code <code>FITNESS20</code> on any supplement or iron gear order.</p>
            </div>
            <button
              className="btn-copy-code"
              onClick={() => handleCopyCode('FITNESS20')}
            >
              <Copy size={13} />
              <span>Apply</span>
            </button>
          </div>

          <div className="perk-row">
            <ShieldCheck size={18} className="text-accent" />
            <div>
              <strong>Priority Dispatch & Insurance</strong>
              <p>All your orders are packaged with tamper-proof seal and 48hr express transit.</p>
            </div>
          </div>

          <div className="perk-row">
            <Zap size={18} className="text-warning" />
            <div>
              <strong>Free Fitness & Diet Consultation</strong>
              <p>Access our certified nutritionist and coach chat anytime.</p>
            </div>
          </div>
        </div>

        <div className="vip-modal-footer">
          <button
            className="btn-primary full-width"
            onClick={() => setIsAccountModalOpen(false)}
          >
            Done & Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default VIPProfileModal;
