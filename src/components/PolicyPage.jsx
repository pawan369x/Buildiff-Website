import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Award,
  FileText,
  Search,
  CheckCircle2,
  HelpCircle,
  PhoneCall,
  ChevronDown,
  Sparkles,
  QrCode,
  Check,
  ShieldAlert,
  ArrowRight,
  RefreshCw,
  Mail
} from 'lucide-react';
import { useCart } from '../context/CartContext';

const policyCategories = [
  { id: 'all', label: 'All Policies', icon: FileText },
  { id: 'authenticity', label: 'Authenticity & Quality', icon: ShieldCheck },
  { id: 'shipping', label: 'Shipping & Delivery', icon: Truck },
  { id: 'refunds', label: 'Returns & Refunds', icon: RotateCcw },
  { id: 'privacy', label: 'Privacy & Security', icon: Lock },
  { id: 'terms', label: 'Terms of Service', icon: Award }
];

const policyData = [
  {
    id: 'auth-1',
    category: 'authenticity',
    title: '100% Genuine Import & Direct Sourcing Guarantee',
    subtitle: 'Zero middle-men. Direct from certified global manufacturers with FSSAI compliance.',
    badge: 'GUARANTEED',
    icon: ShieldCheck,
    highlight: 'Every tub carries an un-scratchable hologram QR code and unique batch security code.',
    details: [
      'Buildiff Nutrition sources all raw materials and finished supplements directly from official brand importers and certified GMP/FSSAI manufacturing units.',
      'Each product container features an intact neck seal, anti-counterfeit holographic label, and unique 12-digit batch verification code.',
      'Independent 3rd-party laboratory testing is conducted regularly for protein purity, heavy metal screening, and nitrogen spiking detection.',
      'We maintain temperature-controlled warehousing (below 24°C) to prevent nutrient breakdown or heat degradation of delicate amino acids and probiotics.'
    ]
  },
  {
    id: 'ship-1',
    category: 'shipping',
    title: 'Express Dispatch & Secure Temperature Packaging',
    subtitle: 'Same-day dispatch for orders placed before 2:00 PM. FREE shipping on orders above ₹1,500.',
    badge: 'EXPRESS',
    icon: Truck,
    highlight: 'Insured transit with real-time SMS tracking updates at every milestone.',
    details: [
      'Standard shipping across India takes 2 to 5 business days depending on tier-1, tier-2, or remote pin codes.',
      'Orders are packed in heavy-duty triple-layer shockproof boxes with tamper-evident security tape.',
      'Free express shipping automatically applies at checkout on orders exceeding ₹1,500.',
      'If your package packaging appears compromised or tampered with at delivery, kindly refuse acceptance and notify our hotline immediately at +91 6230044384.'
    ]
  },
  {
    id: 'ref-1',
    category: 'refunds',
    title: '7-Day Easy Returns & Instant Replacements',
    subtitle: 'Hassle-free 7-day window for damaged, incorrect, or sealed product exchanges.',
    badge: '7-DAY RETURN',
    icon: RotateCcw,
    highlight: 'Instant refund initiation upon receipt and quality inspection at our fulfillment hub.',
    details: [
      'Products are eligible for return or replacement within 7 calendar days from the date of delivery if damaged in transit, missing seals, or incorrect item sent.',
      'Due to strict safety and hygiene standards for consumable health supplements, returned products must be unopened, un-tampered, and in original packaging with intact outer seals.',
      'Refunds are processed within 24–48 hours post-inspection directly to your original payment method or instantly as Buildiff Store Credits.',
      'Reverse pickup is arranged free of charge by Buildiff for verified defect or shipping error claims.'
    ]
  },
  {
    id: 'priv-1',
    category: 'privacy',
    title: 'Bank-Grade Data Encryption & Privacy Protection',
    subtitle: '256-Bit SSL encryption. We never store credit card info or sell customer data.',
    badge: 'SECURED',
    icon: Lock,
    highlight: 'Strict compliance with IT Act 2000 and global data security standards.',
    details: [
      'Your personal details (Name, Address, Phone Number, Order History) are encrypted and stored on secure cloud servers with restricted tokenized access.',
      'All online payment transactions are processed via RBI-compliant, PCI-DSS Level 1 certified gateways (Razorpay/UPI/Cards).',
      'We do not sell, rent, or trade your personal information to third-party marketing companies under any circumstances.',
      'You can request complete deletion of your account and order metadata at any time by contacting privacy@buildiff.com.'
    ]
  },
  {
    id: 'term-1',
    category: 'terms',
    title: 'Product Usage, Allergen Disclaimers & Guidelines',
    subtitle: 'Essential advice regarding dietary supplements, dosages, and medical consultations.',
    badge: 'IMPORTANT',
    icon: Award,
    highlight: 'Supplements are formulated for healthy adults 18+ and intended for nutritional support.',
    details: [
      'Nutritional supplements sold on Buildiff Store are designed for dietary support and athletic performance; they are not intended to diagnose, treat, cure, or prevent any disease.',
      'Always consult with a qualified healthcare practitioner or sports nutritionist prior to beginning any high-intensity supplement regimen.',
      'Check ingredients carefully for potential milk, soy, egg, or nut allergens indicated on product labeling.',
      'Store supplements in a cool, dry place away from direct sunlight, moisture, and out of reach of children.'
    ]
  }
];

export default function PolicyPage() {
  const { setActiveTab } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState('auth-1');

  // Batch code verifier state
  const [batchCodeInput, setBatchCodeInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!batchCodeInput.trim()) return;

    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      const code = batchCodeInput.trim().toUpperCase();
      
      // Simulated authentic lab data response
      setVerificationResult({
        code: code,
        status: 'VERIFIED_GENUINE',
        productName: 'BUILDIFF ISO-WHEY NATIVE ISOLATE',
        batchNumber: code.length > 4 ? code : 'BD-2026-WHEY-9941',
        mfgDate: '15 AUG 2026',
        expDate: '14 AUG 2028',
        proteinPurity: '92.4%',
        labCert: 'ISO/IEC 17025 Certified - NABL Lab Tested',
        fssaiNo: '10021022000482',
        heavyMetals: 'PASS (Below Detectable Limit)',
        aminoProfile: '100% Authentic Natural BCAAs (5.8g)'
      });
    }, 1200);
  };

  const filteredPolicies = policyData.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.details.some((d) => d.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-['Outfit'] pb-24 selection:bg-[#ccff00] selection:text-black">
      
      {/* 1. HERO BANNER */}
      <section className="relative pt-12 pb-16 px-4 sm:px-8 border-b border-neutral-800 bg-gradient-to-b from-neutral-900/80 via-neutral-950 to-neutral-950 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black uppercase tracking-widest mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>BUILDIFF TRUST & GUARANTEE POLICY</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight mb-4 text-white"
          >
            OUR COMMITMENT TO <span className="text-[#ccff00]">PURITY & TRUST</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
          >
            Complete transparency on 100% genuine imports, 7-day easy returns, express delivery, and bank-grade privacy security.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto relative"
          >
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search policies (e.g. shipping, returns, authenticity, privacy)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-neutral-900/90 border border-neutral-700/80 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-all shadow-xl"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-bold text-neutral-400 hover:text-white bg-neutral-800 px-2 py-1 rounded"
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10">
            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col items-center text-center">
              <ShieldCheck className="w-6 h-6 text-[#ccff00] mb-2" />
              <span className="text-white font-extrabold text-sm uppercase">100% Genuine</span>
              <span className="text-neutral-400 text-[11px]">Direct Lab Certified</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col items-center text-center">
              <Truck className="w-6 h-6 text-[#ccff00] mb-2" />
              <span className="text-white font-extrabold text-sm uppercase">Express Delivery</span>
              <span className="text-neutral-400 text-[11px]">Free over ₹1,500</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col items-center text-center">
              <RotateCcw className="w-6 h-6 text-[#ccff00] mb-2" />
              <span className="text-white font-extrabold text-sm uppercase">7-Day Returns</span>
              <span className="text-neutral-400 text-[11px]">Instant Replacement</span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 flex flex-col items-center text-center">
              <Lock className="w-6 h-6 text-[#ccff00] mb-2" />
              <span className="text-white font-extrabold text-sm uppercase">256-Bit SSL</span>
              <span className="text-neutral-400 text-[11px]">PCI-DSS Compliant</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE BATCH AUTHENTICITY VERIFIER WIDGET */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 -mt-6 relative z-20">
        <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900/90 border border-neutral-800 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
            <div>
              <div className="flex items-center gap-2 text-[#ccff00] font-black text-xs uppercase tracking-widest mb-1">
                <QrCode className="w-4 h-4" />
                <span>LIVE PRODUCT AUTHENTICITY SCANNER</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase text-white">
                Verify Your Buildiff Tub Batch Code
              </h2>
              <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                Enter the security code printed under your product container seal to view full lab analysis.
              </p>
            </div>

            {/* Quick Sample Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-400 font-bold">Try Sample Codes:</span>
              {['BD-2026-WHEY', 'CREA-GER-99', 'ISO-NATIVE-88'].map((code) => (
                <button
                  key={code}
                  onClick={() => setBatchCodeInput(code)}
                  className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-[#ccff00] text-xs font-mono font-bold transition-all border border-neutral-700"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          {/* Form Input */}
          <form onSubmit={handleVerify} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={batchCodeInput}
                onChange={(e) => setBatchCodeInput(e.target.value)}
                placeholder="Enter Batch Security Code (e.g. BD-2026-WHEY)"
                className="w-full px-4 py-3.5 rounded-xl bg-black border border-neutral-700 text-white font-mono text-sm uppercase placeholder:normal-case placeholder-neutral-500 focus:outline-none focus:border-[#ccff00]"
              />
            </div>
            <button
              type="submit"
              disabled={isVerifying || !batchCodeInput.trim()}
              className="px-6 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] disabled:opacity-50 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.3)] shrink-0"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Database...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Batch Authenticity →</span>
                </>
              )}
            </button>
          </form>

          {/* Simulated Lab Verification Result Modal / Card */}
          <AnimatePresence>
            {verificationResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-100"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-emerald-500/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-black tracking-widest text-emerald-400 uppercase">
                        AUTHENTICITY VERIFIED • 100% GENUINE
                      </span>
                      <h3 className="text-lg font-black text-white uppercase">{verificationResult.productName}</h3>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                    BATCH: {verificationResult.batchNumber}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-xs">
                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/60">
                    <span className="text-neutral-400 block mb-1">Protein Purity Ratio</span>
                    <span className="text-white font-mono font-bold text-sm text-[#ccff00]">{verificationResult.proteinPurity}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/60">
                    <span className="text-neutral-400 block mb-1">Mfg / Exp Date</span>
                    <span className="text-white font-mono font-bold text-xs">{verificationResult.mfgDate} - {verificationResult.expDate}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/60">
                    <span className="text-neutral-400 block mb-1">FSSAI Reg. License</span>
                    <span className="text-white font-mono font-bold text-xs">{verificationResult.fssaiNo}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/60">
                    <span className="text-neutral-400 block mb-1">Heavy Metal Test</span>
                    <span className="text-emerald-400 font-mono font-bold text-xs">{verificationResult.heavyMetals}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-emerald-900/40 flex items-center justify-between text-[11px] text-emerald-300/80">
                  <span>🛡️ Certified by NABL & ISO 17025 Independent Testing Partner.</span>
                  <span className="font-mono text-emerald-400">STATUS: APPROVED</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. POLICY CATEGORY FILTER TABS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-12">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-neutral-800">
          {policyCategories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.4)]'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. EXPANDABLE POLICY ACCORDIONS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-8 space-y-4">
        {filteredPolicies.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-neutral-900/50 border border-neutral-800">
            <HelpCircle className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
            <h3 className="text-white font-extrabold text-base uppercase">No Policy Found</h3>
            <p className="text-neutral-400 text-xs mt-1">Try adjusting your search keywords or select another tab category.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-[#ccff00] text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPolicies.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-3xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden transition-colors hover:border-neutral-700"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                  className="w-full p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/20 text-[#ccff00] flex items-center justify-center shrink-0 mt-1 sm:mt-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black tracking-widest px-2 py-0.5 rounded bg-[#ccff00]/20 text-[#ccff00] border border-[#ccff00]/30 uppercase">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm mt-0.5 font-medium">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 flex items-center justify-center shrink-0 transition-transform ${
                      isExpanded ? 'rotate-180 bg-[#ccff00] text-black' : ''
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Body Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 pt-2 border-t border-neutral-800/60"
                    >
                      {/* Highlight Box */}
                      <div className="p-4 rounded-2xl bg-[#ccff00]/5 border border-[#ccff00]/20 mb-4 flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-[#ccff00] shrink-0" />
                        <p className="text-xs font-bold text-neutral-200">
                          {item.highlight}
                        </p>
                      </div>

                      {/* Bullet list */}
                      <ul className="space-y-3">
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </section>

      {/* 5. NEED HELP / DIRECT SUPPORT CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 mt-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-black border border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ccff00]/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="text-[#ccff00] text-xs font-black uppercase tracking-widest block">
              HAVE A SPECIFIC POLICY QUESTION?
            </span>
            <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
              WE ARE HERE TO ASSIST YOU 24/7
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-lg">
              Contact Buildiff Customer Concierge team for order tracking, policy clarifications, or wholesale business inquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto">
            <a
              href="tel:6230044384"
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Helpline: 6230044384</span>
            </a>

            <button
              onClick={() => setActiveTab('products')}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border border-neutral-700"
            >
              <span>Explore Store →</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
