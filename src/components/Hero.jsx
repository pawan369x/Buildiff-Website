import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Truck, Award, Dumbbell, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Hero = () => {
  const { setActiveTab, navigateToCategory } = useCart();

  const handleShopNow = () => {
    setActiveTab('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="hero-section advance-hero">
      <div className="hero-ambient-orb orb-1"></div>
      <div className="hero-ambient-orb orb-2"></div>
      <div className="hero-grid-pattern"></div>
      
      <div className="hero-content">
        <div className="hero-badge-wrap">
          <div className="hero-cyber-pill">
            <span className="live-pulse-dot"></span>
            <span className="pill-title">2026 PRO LINEUP RELEASED</span>
            <span className="pill-sep">|</span>
            <span className="pill-offer">CODE: <strong>FITNESS20</strong> (20% OFF)</span>
          </div>
        </div>

        <h1 className="hero-title hero-advance-title">
          UNLEASH <span className="neon-volt-text">BRUTAL</span><br />
          <span className="metal-gradient-text">POWER & RECOVERY</span>
        </h1>

        <p className="hero-subtitle">
          Engineered for raw heavy lifting and elite athletic performance. 100% authentic FSSAI-certified sports nutrition,
          competition-spec Olympic barbells, and indestructible cast iron equipment.
        </p>

        <div className="hero-actions">
          <button className="btn-glow-primary" onClick={handleShopNow}>
            <Sparkles size={18} />
            <span>Explore All Gear</span>
            <ArrowRight size={18} />
          </button>
          <button
            className="btn-glass-secondary"
            onClick={() => navigateToCategory('equipment')}
          >
            <Dumbbell size={18} />
            <span>Heavy Iron Equipment</span>
          </button>
        </div>

        {/* Quick Category Jump Badges */}
        <div className="quick-category-jump-row">
          <span className="jump-title">Quick Jump:</span>
          <button onClick={() => navigateToCategory('supplements')} className="jump-badge">
            <Flame size={14} className="text-primary" /> Whey & Creatine
          </button>
          <button onClick={() => navigateToCategory('equipment')} className="jump-badge">
            <Dumbbell size={14} className="text-accent" /> Cast Dumbbells
          </button>
          <button onClick={() => navigateToCategory('gear')} className="jump-badge">
            <ShieldCheck size={14} className="text-warning" /> Powerlifting Belts
          </button>
        </div>

        {/* Stats Ticker Cards */}
        <div className="hero-stats-deck">
          <div className="stat-card">
            <div className="stat-icon-box">
              <ShieldCheck size={22} className="text-accent" />
            </div>
            <div>
              <span className="stat-big-number">100%</span>
              <p className="stat-caption">Lab Tested & Authentic</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box">
              <Truck size={22} className="text-primary" />
            </div>
            <div>
              <span className="stat-big-number">48 HRS</span>
              <p className="stat-caption">Pan-India Express Transit</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-box">
              <Award size={22} className="text-warning" />
            </div>
            <div>
              <span className="stat-big-number">50K+</span>
              <p className="stat-caption">Active Bodybuilders & Lifters</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
