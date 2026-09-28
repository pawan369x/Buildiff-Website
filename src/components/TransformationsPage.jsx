import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle2,
  Trophy,
  Flame,
  TrendingUp,
  Award,
  ThumbsUp,
  Filter,
  Upload,
  ShieldCheck,
  Search,
  Sparkles,
  MessageSquare,
  Play,
  ArrowRight,
  User,
  X,
  Plus
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Mock Data for Real Transformations
const transformationData = [
  {
    id: 1,
    name: "Rohan Verma",
    age: 24,
    location: "Delhi, India",
    category: "Muscle Mass Gain",
    duration: "16 Weeks",
    beforeWeight: "61 kg",
    afterWeight: "74 kg",
    bodyFatBefore: "18%",
    bodyFatAfter: "12%",
    rating: 5,
    verified: true,
    supplements: ["Buildiff Native Whey Isolate", "German Creapure"],
    quote: "Buildiff Whey Isolate had zero bloat and absolute top-tier digestibility. Gained 13kg of clean muscular weight without adding body fat!",
    beforeImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=600&q=80",
    featured: true,
    upvotes: 248
  },
  {
    id: 2,
    name: "Priya Sharma",
    age: 26,
    location: "Mumbai, India",
    category: "Fat Loss & Shred",
    duration: "12 Weeks",
    beforeWeight: "68 kg",
    afterWeight: "56 kg",
    bodyFatBefore: "29%",
    bodyFatAfter: "18%",
    rating: 5,
    verified: true,
    supplements: ["Buildiff Shred Matrix", "Native Iso Whey"],
    quote: "Lost 12kg of stubborn body fat while preserving lean muscle tone. The energy and taste are unmatched. Will never switch back to cheap imported brands!",
    beforeImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
    featured: true,
    upvotes: 194
  },
  {
    id: 3,
    name: "Aman Preet Singh",
    age: 29,
    location: "Chandigarh, India",
    category: "Strength & Peak Performance",
    duration: "20 Weeks",
    beforeWeight: "78 kg",
    afterWeight: "85 kg",
    benchPress: "80kg → 125kg",
    deadlift: "140kg → 210kg",
    rating: 5,
    verified: true,
    supplements: ["Creapure Monohydrate", "Ignite Pre-Workout"],
    quote: "Added 45kg to my deadlift! The Creapure purity is genuine 99.9%. My recovery between heavy sets is 2x faster than before.",
    beforeImage: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=600&q=80",
    featured: true,
    upvotes: 312
  },
  {
    id: 4,
    name: "Karan Malhotra",
    age: 22,
    location: "Bengaluru, India",
    category: "Muscle Mass Gain",
    duration: "14 Weeks",
    beforeWeight: "58 kg",
    afterWeight: "69 kg",
    bodyFatBefore: "14%",
    bodyFatAfter: "13%",
    rating: 5,
    verified: true,
    supplements: ["Buildiff Anabolic Mass Gainer"],
    quote: "Hardgainer my entire life until I tried Buildiff Mass Gainer with complex carbs and zero added sugar. High calorie, zero bloating.",
    beforeImage: "https://images.unsplash.com/photo-1507398941214-572c25f4b1dc?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80",
    featured: false,
    upvotes: 142
  },
  {
    id: 5,
    name: "Sneha Reddy",
    age: 28,
    location: "Hyderabad, India",
    category: "Fat Loss & Shred",
    duration: "10 Weeks",
    beforeWeight: "64 kg",
    afterWeight: "55 kg",
    bodyFatBefore: "26%",
    bodyFatAfter: "19%",
    rating: 5,
    verified: true,
    supplements: ["Buildiff Iso Whey Belgian Chocolate"],
    quote: "Replaced my evening sweet cravings with Buildiff Chocolate Isolate. Tastes like a dessert milkshake but has 27g pure protein!",
    beforeImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=600&q=80",
    featured: false,
    upvotes: 187
  },
  {
    id: 6,
    name: "Vikramaditya Rao",
    age: 31,
    location: "Pune, India",
    category: "Strength & Peak Performance",
    duration: "24 Weeks",
    beforeWeight: "82 kg",
    afterWeight: "88 kg",
    bodyFatBefore: "17%",
    bodyFatAfter: "11%",
    rating: 5,
    verified: true,
    supplements: ["Native Whey Isolate", "Creapure", "ZMA Recovery"],
    quote: "Turned 31 and hit the best shape of my lifetime. 100% authentic supplements with QR verification code on every tub.",
    beforeImage: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=600&q=80",
    afterImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    featured: false,
    upvotes: 215
  }
];

// Wall of Fame Athletes
const athletesData = [
  {
    name: "Tushar 'The Beast' Kapoor",
    title: "IFBB Men's Physique Athlete",
    achievement: "Gold Medalist - National Championship 2025",
    favoriteProduct: "Buildiff 100% Native Iso Whey",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80",
    quote: "When competing at national levels, zero compromise on protein purity is key. Buildiff gives me guaranteed 27g protein per scoop with zero spiking."
  },
  {
    name: "Simran Kaur",
    title: "Powerlifting Champion & Fitness Coach",
    achievement: "National Deadlift Record Holder (215kg)",
    favoriteProduct: "German Creapure + Pre-Workout",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
    quote: "Clean explosive energy without any post-workout crash. Buildiff Creapure is the gold standard for pure strength."
  },
  {
    name: "Dr. Arvind Nambiar",
    title: "Sports Nutritionist & Bodybuilder",
    achievement: "15+ Years Clinical Nutrition Experience",
    favoriteProduct: "Buildiff Raw Whey Isolate",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80",
    quote: "I test every batch in third-party labs before prescribing to my clients. Buildiff passes all HPLC & amino profile tests with flying colors."
  }
];

// Written Verified Reviews
const customerReviewsData = [
  {
    id: 101,
    author: "Deepak Choudhary",
    product: "Buildiff 100% Native Whey Isolate",
    rating: 5,
    date: "2 days ago",
    comment: "Mixability is 10/10. No lumps even with cold water. Lab report QR code on tub scanned perfectly to reveal genuine batch details!",
    verified: true,
    helpful: 42
  },
  {
    id: 102,
    author: "Meghna Joshi",
    product: "German Creapure Monohydrate",
    rating: 5,
    date: "5 days ago",
    comment: "Unflavored Creapure mixes instantly into my morning smoothie. High energy during heavy squat sets. Unbelievable price for Creapure.",
    verified: true,
    helpful: 38
  },
  {
    id: 103,
    author: "Rahul Saini",
    product: "Ignite Pre-Workout (Sour Apple)",
    rating: 5,
    date: "1 week ago",
    comment: "Insane muscle pumps! Beta-alanine tingles within 15 mins of drinking. Hit a 140kg bench PR on day 1.",
    verified: true,
    helpful: 67
  }
];

export default function TransformationsPage() {
  const { setActiveTab } = useCart ? useCart() : { setActiveTab: () => {} };
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProductFilter, setSelectedProductFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [upvotesState, setUpvotesState] = useState(
    transformationData.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.upvotes }), {})
  );
  const [hasUpvoted, setHasUpvoted] = useState({});
  const [modalImage, setModalImage] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    duration: '12 Weeks',
    category: 'Muscle Mass Gain',
    supplement: 'Buildiff Native Whey Isolate',
    story: ''
  });

  const handleUpvote = (id) => {
    if (hasUpvoted[id]) {
      setUpvotesState(prev => ({ ...prev, [id]: prev[id] - 1 }));
      setHasUpvoted(prev => ({ ...prev, [id]: false }));
    } else {
      setUpvotesState(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHasUpvoted(prev => ({ ...prev, [id]: true }));
    }
  };

  const categories = ["All", "Muscle Mass Gain", "Fat Loss & Shred", "Strength & Peak Performance"];

  const filteredTransformations = useMemo(() => {
    return transformationData.filter(item => {
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.quote.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.supplements.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchTerm]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setShowSubmitModal(false);
      setFormData({
        name: '',
        email: '',
        duration: '12 Weeks',
        category: 'Muscle Mass Gain',
        supplement: 'Buildiff Native Whey Isolate',
        story: ''
      });
    }, 2500);
  };

  return (
    <div className="w-full bg-neutral-950 text-neutral-100 min-h-screen pb-24 font-['Outfit']">
      
      {/* HERO BANNER SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-8 border-b border-neutral-800/80 bg-gradient-to-b from-black via-neutral-950 to-neutral-950">
        {/* Glow ambient background elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ccff00]/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#ccff00]/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] text-xs font-black uppercase tracking-widest mb-6"
          >
            <Trophy className="w-4 h-4 text-[#ccff00]" />
            BUILDIFF WALL OF FAME & REVIEWS
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white mb-6 leading-[1.05]"
          >
            REAL PEOPLE. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-lime-400 to-emerald-400">
              100% UNFILTERED RESULTS.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Explore verified fitness transformations, lab-tested product reviews, and athlete stories from over <strong className="text-white">15,000+ athletes</strong> who transformed their physique with Buildiff Nutrition.
          </motion.p>

          {/* Quick Stat Counter Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
              <div className="text-2xl sm:text-4xl font-black text-[#ccff00] mb-1">15,000+</div>
              <div className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Happy Athletes</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
              <div className="text-2xl sm:text-4xl font-black text-[#ccff00] mb-1">4.9 ★</div>
              <div className="text-xs text-neutral-400 uppercase font-bold tracking-wider">12,400+ Reviews</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
              <div className="text-2xl sm:text-4xl font-black text-[#ccff00] mb-1">100%</div>
              <div className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Authentic & Verified</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
              <div className="text-2xl sm:text-4xl font-black text-[#ccff00] mb-1">0%</div>
              <div className="text-xs text-neutral-400 uppercase font-bold tracking-wider">Banned Substances</div>
            </div>
          </motion.div>

          {/* Call to Action Button */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setShowSubmitModal(true)}
              className="px-8 py-4 rounded-2xl bg-[#ccff00] text-black font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(204,255,0,0.4)] hover:bg-[#b8e600] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Upload className="w-4 h-4" />
              Submit Your Story (Win ₹500 Credit)
            </button>
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-neutral-900 border border-neutral-700 text-white font-black text-xs sm:text-sm uppercase tracking-wider hover:border-[#ccff00] hover:text-[#ccff00] transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Shop Featured Supplements →
            </button>
          </div>

        </div>
      </section>

      {/* FILTER & SEARCH BAR SECTION */}
      <section className="py-8 px-4 sm:px-8 border-b border-neutral-800/60 bg-neutral-950 sticky top-16 z-30 backdrop-blur-xl bg-neutral-950/90">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#ccff00] text-black shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, supplement or goal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#ccff00] transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </section>

      {/* TRANSFORMATIONS GALLERY GRID */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-[#ccff00]" />
              BEFORE & AFTER TRANSFORMATIONS
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm mt-1">
              Showing {filteredTransformations.length} verified real customer results
            </p>
          </div>
        </div>

        {filteredTransformations.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-800 rounded-3xl bg-neutral-900/40">
            <Filter className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white uppercase mb-1">No transformations matched</h3>
            <p className="text-neutral-400 text-xs mb-4">Try adjusting your category filter or search query</p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
              className="px-5 py-2.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTransformations.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-neutral-900/90 border border-neutral-800 hover:border-[#ccff00]/50 transition-all overflow-hidden flex flex-col group shadow-xl hover:shadow-2xl hover:shadow-[#ccff00]/5"
              >
                {/* BEFORE / AFTER IMAGES COMPARISON */}
                <div className="relative h-64 sm:h-72 w-full grid grid-cols-2 bg-neutral-950 overflow-hidden">
                  
                  {/* BEFORE PHOTO */}
                  <div className="relative group/before overflow-hidden border-r border-neutral-800">
                    <img
                      src={item.beforeImage}
                      alt={`${item.name} Before`}
                      className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-black uppercase text-red-400 tracking-wider">
                      BEFORE ({item.beforeWeight})
                    </div>
                  </div>

                  {/* AFTER PHOTO */}
                  <div className="relative group/after overflow-hidden">
                    <img
                      src={item.afterImage}
                      alt={`${item.name} After`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-md bg-[#ccff00] text-black font-black text-[10px] uppercase tracking-wider shadow-[0_0_10px_rgba(204,255,0,0.5)]">
                      AFTER ({item.afterWeight})
                    </div>
                  </div>

                  {/* Duration Tag overlay */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-extrabold text-[10px] uppercase border border-white/10 tracking-widest flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-[#ccff00]" />
                    {item.duration}
                  </div>

                  {/* Verified Badge overlay */}
                  {item.verified && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md text-emerald-400 font-extrabold text-[10px] uppercase border border-emerald-500/40 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      VERIFIED
                    </div>
                  )}
                </div>

                {/* CARD CONTENT */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header info */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-neutral-400 font-medium">
                          {item.age} yrs • {item.location}
                        </p>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Category pill */}
                    <div className="mb-4">
                      <span className="inline-block px-2.5 py-1 rounded-lg bg-neutral-800 text-neutral-300 font-extrabold text-[10px] uppercase tracking-wider">
                        {item.category}
                      </span>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-neutral-300 text-xs sm:text-sm italic leading-relaxed mb-4 bg-neutral-950/60 p-3.5 rounded-xl border border-neutral-800/80">
                      "{item.quote}"
                    </p>

                    {/* Supplements Used List */}
                    <div className="mb-5">
                      <div className="text-[10px] text-neutral-500 font-extrabold uppercase tracking-widest mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#ccff00]" />
                        SUPPLEMENT STACK USED:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.supplements.map((supp, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-[#ccff00]/10 text-[#ccff00] border border-[#ccff00]/20 text-[10px] font-bold"
                          >
                            {supp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action bar */}
                  <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleUpvote(item.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        hasUpvoted[item.id]
                          ? 'bg-[#ccff00] text-black font-black'
                          : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                      }`}
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>{upvotesState[item.id]} Inspired</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('products');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="text-xs font-extrabold text-[#ccff00] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Get This Stack →
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ATHLETE & AMBASSADOR SPOTLIGHT (WALL OF FAME) */}
      <section className="py-16 px-4 sm:px-8 bg-neutral-900/50 border-y border-neutral-800">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-[#ccff00] font-black text-xs uppercase tracking-widest block mb-2">
              PRO ATHLETE APPROVED
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
              BUILDIFF <span className="text-[#ccff00]">ATHLETES & PROS</span>
            </h2>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl mx-auto mt-2">
              National level champions and sports nutritionists who trust 100% native whey isolate & Creapure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {athletesData.map((athlete, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-neutral-950 border border-neutral-800 relative group hover:border-[#ccff00]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-5">
                    <img
                      src={athlete.image}
                      alt={athlete.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-wider block w-max mb-1">
                        {athlete.title}
                      </span>
                      <h4 className="text-lg font-black text-white uppercase">{athlete.name}</h4>
                    </div>
                  </div>

                  <div className="text-xs text-emerald-400 font-extrabold uppercase tracking-wide mb-3 flex items-center gap-1">
                    <Award className="w-4 h-4 text-emerald-400" />
                    {athlete.achievement}
                  </div>

                  <p className="text-neutral-300 text-xs italic leading-relaxed mb-4">
                    "{athlete.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800 text-[11px] font-bold text-neutral-400">
                  <span className="text-neutral-500 block text-[9px] uppercase tracking-widest mb-0.5">FAVORITE STACK</span>
                  <span className="text-[#ccff00]">{athlete.favoriteProduct}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* VERIFIED CUSTOMER TEXT REVIEWS */}
      <section className="py-16 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
            RECENT <span className="text-[#ccff00]">VERIFIED REVIEWS</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Real buyers with verified purchase badges
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {customerReviewsData.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-neutral-900 border border-neutral-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-neutral-500 font-bold">{rev.date}</span>
                </div>

                <p className="text-neutral-300 text-xs leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
              </div>

              <div>
                <div className="text-xs font-black text-white uppercase">{rev.author}</div>
                <div className="text-[10px] text-[#ccff00] font-bold uppercase mt-0.5">{rev.product}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SUBMIT TRANSFORMATION MODAL */}
      <AnimatePresence>
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-neutral-950 border border-neutral-800 p-6 sm:p-8 relative shadow-2xl"
            >
              <button
                onClick={() => setShowSubmitModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <span className="px-3 py-1 rounded-full bg-[#ccff00]/10 text-[#ccff00] font-black text-[10px] uppercase tracking-wider inline-block mb-2">
                  WIN ₹500 STORE CREDIT
                </span>
                <h3 className="text-2xl font-black text-white uppercase">SUBMIT YOUR STORY</h3>
                <p className="text-neutral-400 text-xs mt-1">
                  Share your transformation & get featured on our Wall of Fame!
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="w-16 h-16 text-[#ccff00] mx-auto mb-4 animate-bounce" />
                  <h4 className="text-xl font-black text-white uppercase mb-2">STORY SUBMITTED!</h4>
                  <p className="text-neutral-400 text-xs max-w-xs mx-auto">
                    Our team will verify your transformation and issue your ₹500 coupon code within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitForm} className="space-y-4 text-left">
                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Transformation Goal</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                      >
                        <option value="Muscle Mass Gain">Muscle Mass Gain</option>
                        <option value="Fat Loss & Shred">Fat Loss & Shred</option>
                        <option value="Strength & Peak Performance">Strength & Peak Performance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Duration</label>
                      <input
                        type="text"
                        placeholder="e.g. 12 Weeks"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Buildiff Supplement Used</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Native Whey Isolate + Creapure"
                      value={formData.supplement}
                      onChange={(e) => setFormData({ ...formData, supplement: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">Your Story & Results Quote</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Tell us about your diet, workouts and how Buildiff helped you achieve your goal..."
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-[#ccff00]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#ccff00] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:bg-[#b8e600] cursor-pointer"
                  >
                    Submit Story & Claim Reward →
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
