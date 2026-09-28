import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Sparkles, ShieldCheck, Flame, Zap, Award, Layers, ChevronRight, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

/* =========================================================================
   BUILDIFF MASTER CINEMATIC TIMELINE (EP1 + EP2 + EP3)
   =========================================================================
   - 707 Lightweight High-Resolution WebP Frames
   - Pure Floating Luxury Editorial Typography (No Background Pods)
   ========================================================================= */

const SEQUENCE_CONFIG = {
  totalFrames: 707,
  containerHeight: '650vh', // Luxurious scroll runway
  lerpFactor: 0.25,
  canvasWidth: 1920,
  canvasHeight: 1080,

  stages: [
    {
      id: 'stage-1',
      progress: 0.000,
      frame: 1,
      position: 'left-bottom', // Bottom left avoids person walking in center
      episode: 'EPISODE 01',
      title: 'FLAGSHIP STOREFRONT',
      subtitle: 'Buildiff Headquarters',
      tag: '01 // FLAGSHIP ENTRANCE',
      titleLine1: 'Enter The',
      titleLine2: 'Athletic Vault.',
      captionHeadline: 'India\'s Premier Performance Store',
      captionDesc: 'Step inside India\'s most advanced nutrition & gym store. Formulated for bodybuilders, lifters & elite athletes.',
    },
    {
      id: 'stage-2',
      progress: 0.090,
      frame: 68,
      position: 'right', // Open right space over consultation counter
      episode: 'EPISODE 01',
      title: 'SERVICE COUNTER',
      subtitle: 'Certified Nutrition Specialists',
      tag: '02 // CONSULTATION DESK',
      titleLine1: 'Zero Compromise.',
      titleLine2: 'Pure Science.',
      captionHeadline: '3-Tier Independent Lab Testing',
      captionDesc: 'Every formula undergoes strict microbiological & heavy-metal screening to guarantee 100% purity and fast absorption.',
    },
    {
      id: 'stage-3',
      progress: 0.220,
      frame: 155,
      position: 'left-top', // Top left corner clear of athlete's white shirt & head!
      episode: 'EPISODE 01',
      title: 'SUPPLEMENT AISLE',
      subtitle: 'Exploring Formulations',
      tag: '03 // SUPPLEMENT VAULT',
      titleLine1: 'Unrivaled',
      titleLine2: 'Purity & Power.',
      captionHeadline: '100% Whey Isolates & Creapure Creatine',
      captionDesc: 'Maximise muscle hypertrophy with 24g pure whey isolate per scoop, 5.5g BCAAs & zero bloat technology.',
    },
    {
      id: 'stage-4',
      progress: 0.420,
      frame: 300,
      position: 'right', // Open right iron rack space clear of lifter on left
      episode: 'EPISODE 02',
      title: 'THE IRON VAULT',
      subtitle: 'Heavy Equipment Zone',
      tag: '04 // HEAVY IRON RACKS',
      titleLine1: 'Forged From',
      titleLine2: 'High-Tensile Steel.',
      captionHeadline: 'Commercial Grade Equipment',
      captionDesc: 'Solid cast iron dumbbells, 1500lbs-rated Olympic barbells & multi-angle commercial incline press benches.',
    },
    {
      id: 'stage-5',
      progress: 0.630,
      frame: 450,
      position: 'left-top', // Top left clear of person on right
      episode: 'EPISODE 02',
      title: 'PRE-WORKOUT COUNTER',
      subtitle: 'Explosive Formulations',
      tag: '05 // PRE-WORKOUT MATRIX',
      titleLine1: 'Explosive',
      titleLine2: 'Energy & Pumps.',
      captionHeadline: 'Inferno Pre-Workout Matrix',
      captionDesc: 'Engineered with 300mg Caffeine, 3.2g Beta-Alanine, and 6g L-Citrulline Malate for laser focus & vasodilation.',
    },
    {
      id: 'stage-6',
      progress: 0.840,
      frame: 600,
      position: 'left-top', // Top left clear of center athlete & bottom-right card!
      episode: 'EPISODE 03',
      title: 'ATHLETE DISPATCH DESK',
      subtitle: 'Express Packing Station',
      tag: '06 // ATHLETE DISPATCH',
      titleLine1: 'Trusted By',
      titleLine2: '50,000+ Lifters.',
      captionHeadline: 'Tamper-Proof 48H Express Shipping',
      captionDesc: 'All orders are shipped with security holographic seals, express courier tracking & 100% authenticity guarantee.',
    },
    {
      id: 'stage-7',
      progress: 0.960,
      frame: 675,
      position: 'left-bottom', // Bottom left clear of bottle spotlight
      episode: 'EPISODE 03',
      title: 'WELCOME TO BUILDIFF',
      subtitle: 'Explore Catalog Below',
      tag: '07 // READY TO TRANSFORM',
      titleLine1: 'Your Journey',
      titleLine2: 'Starts Here.',
      captionHeadline: 'Unlock Flat 20% OFF Today',
      captionDesc: 'Use promo code FITNESS20 at checkout for instant discounts on all supplements & iron gear.',
    },
  ],
};

function getFrameUrl(globalFrame) {
  const g = Math.max(1, Math.min(SEQUENCE_CONFIG.totalFrames, Math.round(globalFrame)));
  if (g <= 300) {
    const local = g;
    return `/ep1 buildiff/ezgif-frame-${local.toString().padStart(3, '0')}.webp`;
  } else if (g <= 600) {
    const local = g - 300;
    return `/ep2 buildiff/ezgif-frame-${local.toString().padStart(3, '0')}.webp`;
  } else {
    const local = g - 600;
    return `/ep3 buildiff/ezgif-frame-${local.toString().padStart(3, '0')}.webp`;
  }
}

function getActiveStageInfo(currentFrame, stages) {
  let active = stages[0];
  for (let i = 0; i < stages.length; i++) {
    if (currentFrame >= stages[i].frame) {
      active = stages[i];
    }
  }
  return active;
}

export default function SmoothScrollSequence() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progressBarRef = useRef(null);
  const frameTextRef = useRef(null);
  const epTextRef = useRef(null);

  // Animation state
  const currentFrameRef = useRef(1);
  const lastDrawnExactFrameRef = useRef(-1);

  // UI state
  const [activeStage, setActiveStage] = useState(SEQUENCE_CONFIG.stages[0]);
  const [showProductTag, setShowProductTag] = useState(false);
  const [showScrollPrompt, setShowScrollPrompt] = useState(true);
  const [currentEpNumber, setCurrentEpNumber] = useState(1);

  // Image cache
  const imagesRef = useRef(new Map());

  // -------------------------------------------------------------
  // 1. FAST ASYNC WEBP PRELOADER
  // -------------------------------------------------------------
  const loadImage = useCallback((frameIdx) => {
    if (frameIdx < 1 || frameIdx > SEQUENCE_CONFIG.totalFrames) return null;
    
    if (imagesRef.current.has(frameIdx)) {
      return imagesRef.current.get(frameIdx);
    }

    const img = new Image();
    img.decoding = 'async';
    img.src = getFrameUrl(frameIdx);
    imagesRef.current.set(frameIdx, img);

    return img;
  }, []);

  const prefetchWindow = useCallback((centerFrame) => {
    const start = Math.max(1, centerFrame - 40);
    const end = Math.min(SEQUENCE_CONFIG.totalFrames, centerFrame + 100);
    for (let i = start; i <= end; i++) {
      loadImage(i);
    }
  }, [loadImage]);

  useEffect(() => {
    for (let i = 1; i <= 80; i++) {
      loadImage(i);
    }

    let nextIdx = 81;
    let timerId;

    const loadNextBatch = () => {
      const batchSize = 16;
      for (let i = 0; i < batchSize && nextIdx <= SEQUENCE_CONFIG.totalFrames; i++) {
        loadImage(nextIdx++);
      }
      if (nextIdx <= SEQUENCE_CONFIG.totalFrames) {
        timerId = setTimeout(loadNextBatch, 16);
      }
    };

    timerId = setTimeout(loadNextBatch, 80);

    return () => clearTimeout(timerId);
  }, [loadImage]);

  // -------------------------------------------------------------
  // 2. GUARANTEED CANVAS RENDER LOGIC
  // -------------------------------------------------------------
  const renderFrameToCanvas = useCallback((context, canvas, targetIdx) => {
    let img = imagesRef.current.get(targetIdx);
    if (!img) {
      img = loadImage(targetIdx);
    }

    if (img && img.complete && img.naturalWidth > 0) {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      lastDrawnExactFrameRef.current = targetIdx;
      return true;
    }

    for (let offset = 1; offset <= 60; offset++) {
      const lower = imagesRef.current.get(targetIdx - offset);
      if (lower && lower.complete && lower.naturalWidth > 0) {
        context.drawImage(lower, 0, 0, canvas.width, canvas.height);
        return false;
      }
      const higher = imagesRef.current.get(targetIdx + offset);
      if (higher && higher.complete && higher.naturalWidth > 0) {
        context.drawImage(higher, 0, 0, canvas.width, canvas.height);
        return false;
      }
    }

    return false;
  }, [loadImage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = SEQUENCE_CONFIG.canvasWidth;
    canvas.height = SEQUENCE_CONFIG.canvasHeight;
    const context = canvas.getContext('2d', { alpha: false });

    const img1 = loadImage(1);
    if (img1) {
      if (img1.complete && img1.naturalWidth > 0) {
        context.drawImage(img1, 0, 0, canvas.width, canvas.height);
        lastDrawnExactFrameRef.current = 1;
      } else {
        img1.onload = () => {
          context.drawImage(img1, 0, 0, canvas.width, canvas.height);
          lastDrawnExactFrameRef.current = 1;
        };
      }
    }

    return () => {};
  }, [loadImage]);

  // -------------------------------------------------------------
  // 3. GSAP SCROLLTRIGGER ANIMATION
  // -------------------------------------------------------------
  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: false });

    // Force scroll to top before measuring ScrollTrigger
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
    
    const sequenceObj = { frame: 1, lastPrefetched: 1 };
    let lastHudUpdate = 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
          
          if (self.progress > 0.015 && showScrollPrompt) {
            setShowScrollPrompt(false);
          } else if (self.progress <= 0.005 && !showScrollPrompt) {
            setShowScrollPrompt(true);
          }
        }
      }
    });

    tl.to(sequenceObj, {
      frame: SEQUENCE_CONFIG.totalFrames,
      ease: "none",
      onUpdate: () => {
        const frameToDraw = Math.max(1, Math.min(SEQUENCE_CONFIG.totalFrames, Math.round(sequenceObj.frame)));
        currentFrameRef.current = sequenceObj.frame;
        
        renderFrameToCanvas(context, canvas, frameToDraw);

        if (Math.abs(frameToDraw - sequenceObj.lastPrefetched) >= 3) {
          prefetchWindow(frameToDraw);
          sequenceObj.lastPrefetched = frameToDraw;
        }

        if (frameTextRef.current) {
          frameTextRef.current.textContent = `FRAME ${frameToDraw.toString().padStart(3, '0')}/707`;
        }

        const now = performance.now();
        if (now - lastHudUpdate > 35) {
          const ep = frameToDraw <= 300 ? 1 : frameToDraw <= 600 ? 2 : 3;
          setCurrentEpNumber(ep);
          if (epTextRef.current) {
            epTextRef.current.textContent = `EP 0${ep}`;
          }

          setActiveStage(getActiveStageInfo(frameToDraw, SEQUENCE_CONFIG.stages));
          setShowProductTag(frameToDraw >= 620 && frameToDraw <= 707);
          lastHudUpdate = now;
        }
      }
    });

  }, { scope: containerRef, dependencies: [renderFrameToCanvas, prefetchWindow, showScrollPrompt] });

  const handleSkipToStore = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetScrollY = window.scrollY + rect.bottom - window.innerHeight + 10;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Pure floating text positioning (NO CARD BACKGROUND BOX) - 100% Mobile Responsive
  const getOpenSpaceClasses = (pos) => {
    switch (pos) {
      case 'right':
        return 'left-4 right-4 sm:left-auto sm:right-14 lg:right-24 top-24 sm:top-36 text-left sm:text-right';
      case 'left-top':
        return 'left-4 right-4 sm:right-auto sm:left-14 lg:left-24 top-20 sm:top-24 text-left';
      case 'left-bottom':
        return 'left-4 right-4 sm:right-auto sm:left-14 lg:left-24 bottom-20 sm:bottom-28 text-left';
      case 'right-bottom':
        return 'left-4 right-4 sm:left-auto sm:right-14 lg:right-24 bottom-20 sm:bottom-28 text-left sm:text-right';
      case 'center-top':
        return 'left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 top-24 sm:top-36 text-center';
      case 'left':
      default:
        return 'left-4 right-4 sm:right-auto sm:left-14 lg:left-24 top-24 sm:top-36 text-left';
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-black z-30"
      style={{ height: SEQUENCE_CONFIG.containerHeight }}
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen flex justify-center items-center overflow-hidden bg-black select-none">

        {/* Ambient Radial Backlight */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04)_0%,transparent_75%)] pointer-events-none" />

        {/* 1080p High-Precision Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover pointer-events-none will-change-transform"
        />

        {/* Master Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[2.5px] bg-white/10 z-40">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gradient-to-r from-white via-[#ccff00] to-[#b8e600] origin-left shadow-[0_0_12px_rgba(204,255,0,0.9)] will-change-transform"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Top Dark Vignette Gradient (Mutes top background distraction like salon signs) */}
        <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-black/90 via-black/50 to-transparent pointer-events-none z-30" />

        {/* Top Right: Clean Episode Indicator & Skip Button */}
        <div className="absolute top-20 sm:top-24 right-6 sm:right-12 z-40 flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-black/70 backdrop-blur-md text-[10px] sm:text-xs font-mono font-bold tracking-wider text-slate-200 shadow-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse shadow-[0_0_8px_#ccff00]" />
            <span ref={epTextRef}>EP 0{currentEpNumber}</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-full border border-white/15 bg-black/60 backdrop-blur-md">
            {[1, 2, 3].map((ep) => (
              <div
                key={ep}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentEpNumber === ep
                    ? 'w-7 bg-[#ccff00] shadow-[0_0_10px_rgba(204,255,0,0.85)]'
                    : currentEpNumber > ep
                      ? 'w-3 bg-white/60'
                      : 'w-3 bg-white/20'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleSkipToStore}
            className="group flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20 bg-black/80 hover:bg-[#ccff00] hover:text-black hover:border-[#ccff00] backdrop-blur-md text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] cursor-pointer"
          >
            <span>Skip to Store</span>
            <ArrowDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* =========================================================
            PURE FLOATING LUXURY EDITORIAL TYPOGRAPHY (NO CARD BOX)
            ========================================================= */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.id || activeStage.title}
            initial={{
              opacity: 0,
              x: activeStage.position.includes('right') ? 50 : activeStage.position.includes('left') ? -50 : 0,
              y: activeStage.position.includes('bottom') ? 30 : activeStage.position.includes('top') ? -20 : 0,
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{
              opacity: 0,
              x: activeStage.position.includes('right') ? -50 : activeStage.position.includes('left') ? 50 : 0,
              y: activeStage.position.includes('bottom') ? -30 : activeStage.position.includes('top') ? 20 : 0,
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-40 max-w-sm sm:max-w-md lg:max-w-xl select-none pointer-events-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] ${getOpenSpaceClasses(
              activeStage.position
            )}`}
          >
            {/* Micro Tag Line */}
            <div className={`flex items-center gap-2 mb-2 ${activeStage.position.includes('right') ? 'justify-end' : activeStage.position.includes('center') ? 'justify-center' : 'justify-start'}`}>
              <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse shadow-[0_0_8px_#ccff00]" />
              <span className="text-[10px] sm:text-xs font-mono font-black tracking-[0.3em] uppercase text-[#ccff00]">
                {activeStage.tag || activeStage.episode}
              </span>
            </div>

            {/* Luxury Editorial Display Title */}
            <h2 className="text-2xl sm:text-4xl lg:text-6xl font-normal text-white leading-[1.08] font-['Playfair_Display'] tracking-tight">
              <span>{activeStage.titleLine1} </span>
              <span className="italic font-normal text-[#ccff00] font-['Playfair_Display']">
                {activeStage.titleLine2}
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm font-extrabold text-slate-200 uppercase tracking-widest mt-2.5 mb-2 font-['Outfit']">
              {activeStage.captionHeadline || activeStage.subtitle}
            </p>

            {/* Description Paragraph */}
            <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-md font-['Outfit']">
              {activeStage.captionDesc}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Interactive Floating Product Tag in EPISODE 3 */}
        <AnimatePresence>
          {showProductTag && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="absolute bottom-24 sm:bottom-12 right-4 sm:right-12 z-40 max-w-xs sm:max-w-sm p-4 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] text-left"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded-full bg-[#ccff00]/20 text-[#ccff00] text-[10px] font-bold tracking-wider uppercase border border-[#ccff00]/40">
                  Featured Formula
                </span>
                <div className="flex items-center gap-1 text-[11px] text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>100% Authentic</span>
                </div>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                Gold Standard 100% Whey
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 mb-3 leading-relaxed">
                24g Pure Whey Protein • 5.5g BCAAs • Extreme Purity & Fast Muscle Synthesis.
              </p>
              <button
                onClick={handleSkipToStore}
                className="w-full py-2.5 px-3 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-[0_0_20px_rgba(204,255,0,0.45)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore In Store</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Scroll Cue */}
        <AnimatePresence>
          {showScrollPrompt && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center pointer-events-none text-center"
            >
              <span className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-slate-300 font-medium mb-2.5">
                Scroll to Enter Store
              </span>
              <div className="w-5 h-8 rounded-full border border-white/30 flex justify-center p-1 bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1 h-1.5 bg-[#ccff00] rounded-full shadow-[0_0_8px_#ccff00]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Vignette Gradient */}
        <div className="absolute bottom-0 left-0 w-full h-36 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
