"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Download, Maximize2, X } from "lucide-react";
import * as Images from "@/data/images";

const floorPlans = [
  {
    category: "Project Layout",
    title: "Stilt Floor Plan",
    subtitle: "Ground Level",
    details: ["Covered Car Parking", "Direct Lift Access"],
    image: Images.Floor1,
  },
  {
    category: "Project Layout",
    title: "Typical Floor",
    subtitle: "1st to 3rd Floor Plan",
    details: ["Master Layout", "Ventilation Focused"],
    image: Images.Floor2,
  },
  {
    category: "Typical Flat 1",
    title: "Unit A - 4 BHK",
    subtitle: "Premium Residency",
    details: ["4 BHK", "1805 sq.ft", "East Facing"],
    image: Images.Floor3,
  },
  {
    category: "Typical Flat 2",
    title: "Unit B - 3 BHK",
    subtitle: "Executive Living",
    details: ["3 BHK", "1418 sq.ft", "Corner Unit"],
    image: Images.Floor4,
  }
];

export default function FloorPlan() {
  const [activePlan, setActivePlan] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) return;
    const timer = setInterval(() => {
      setActivePlan((prev) => (prev + 1) % floorPlans.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [activePlan, isFullscreen]);

  const plan = floorPlans[activePlan];

  const bgGrid = {
    backgroundImage:
      "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,168,76,0.03) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,168,76,0.03) 80px)",
  };

  return (
    <section id="floor-plan" className="bg-white py-16 md:py-24 px-4 md:px-8 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none z-0" style={bgGrid} />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12 relative z-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Architectural Precision</span>
            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-deep">Masterful Layouts</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
          </motion.div>
        </div>

        {/* ─── MOBILE LAYOUT ─── */}
        <div className="lg:hidden space-y-6">

          {/* 1. Large centered floor plan image */}
          <div className="relative w-full aspect-square bg-white rounded-2xl border border-[#C9A84C]/10 shadow-[0_10px_40px_rgba(0,0,0,0.06)] overflow-hidden flex items-center justify-center p-6">
            {/* Blueprint grid */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(rgba(201,168,76,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.08) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#C9A84C]/30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#C9A84C]/30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#C9A84C]/30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#C9A84C]/30" />

            {/* Fullscreen button */}
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-14 z-30 p-2 bg-white/90 backdrop-blur-md rounded-full shadow border border-[#C9A84C]/20 text-[#9A7330]"
            >
              <Maximize2 size={16} />
            </button>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan}
                initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                className="relative w-full h-full z-10"
              >
                <Image
                  src={plan.image}
                  alt={plan.title}
                  fill
                  sizes="100vw"
                  className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {floorPlans.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePlan(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${activePlan === i ? "w-8 bg-gold" : "w-2 bg-gold/30"}`}
                />
              ))}
            </div>
          </div>

          {/* 2. Plan selector tabs — 2×2 grid */}
          <div className="grid grid-cols-2 gap-3">
            {floorPlans.map((p, i) => {
              const isActive = activePlan === i;
              return (
                <button
                  key={i}
                  onClick={() => setActivePlan(i)}
                  className={`relative px-4 py-4 rounded-2xl border text-left transition-all duration-300 w-full ${
                    isActive
                      ? "bg-royal-dark border-royal-dark shadow-lg"
                      : "bg-white border-[#C9A84C]/15 hover:border-[#C9A84C]/40"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-indicator"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full bg-gradient-to-b from-[#C9A84C] to-[#E4C97E]"
                    />
                  )}
                  <p className={`text-[8px] uppercase tracking-widest font-bold mb-1 ${isActive ? "text-[#E4C97E]" : "text-[#9A7330]"}`}>
                    {p.category}
                  </p>
                  <h4 className={`text-sm font-serif leading-tight ${isActive ? "text-[#E4C97E]" : "text-royal-dark"}`}>
                    {p.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* 3. Specifications card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePlan}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="bg-white rounded-2xl border border-[#C9A84C]/15 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FAF6EE] to-transparent pointer-events-none" />
              <h5 className="text-[#9A7330] text-[10px] tracking-[4px] uppercase font-bold mb-3">Specifications</h5>
              <span className="font-serif text-2xl text-royal-dark block mb-4">{plan.subtitle}</span>
              <div className="flex flex-wrap gap-2 mb-6">
                {plan.details.map((d, idx) => (
                  <span key={idx} className="text-[9px] font-bold tracking-widest uppercase bg-[#FAF6EE] text-[#7A6540] px-3 py-1.5 rounded-full border border-[#C9A84C]/20">
                    {d}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3.5 bg-gradient-to-br from-[#C9A84C] to-[#9A7330] text-white text-[9px] font-bold uppercase tracking-[3px] rounded-xl flex items-center justify-center gap-2">
                  Enquire <ArrowRight size={13} />
                </button>
                <button className="py-3.5 border border-[#C9A84C]/30 text-[#9A7330] text-[9px] font-bold uppercase tracking-[3px] rounded-xl flex items-center justify-center gap-2">
                  <Download size={13} /> PDF
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── DESKTOP LAYOUT (unchanged) ─── */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-14 items-start">

          {/* Left: Navigation + Specs */}
          <div className="lg:col-span-4 flex flex-col h-full">
            <div className="space-y-3">
              {floorPlans.map((p, i) => {
                const isActive = activePlan === i;
                return (
                  <motion.div
                    key={i}
                    onClick={() => setActivePlan(i)}
                    className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 group overflow-hidden border ${
                      isActive
                        ? "bg-royal-dark text-white border-royal-dark shadow-[0_20px_40px_rgba(0,0,0,0.1)] scale-[1.02] z-10"
                        : "bg-white/60 hover:bg-white backdrop-blur-sm border-[#C9A84C]/10 hover:border-[#C9A84C]/30 z-0"
                    }`}
                  >
                    {isActive && (
                      <motion.div layoutId="sidebar-indicator" className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#C9A84C] to-[#E4C97E]" />
                    )}
                    <div className="flex justify-between items-center pl-2">
                      <div>
                        <p className={`text-[9px] uppercase tracking-widest font-bold mb-1.5 transition-colors ${isActive ? "text-[#E4C97E]" : "text-[#9A7330]"}`}>
                          {p.category}
                        </p>
                        <h4 className={`text-2xl font-serif transition-colors ${isActive ? "text-[#E4C97E]" : "text-black"}`}>{p.title}</h4>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? "bg-white/10" : "bg-transparent -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                        <ArrowRight className={isActive ? "text-[#E4C97E]" : "text-[#9A7330]"} size={18} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePlan}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mt-4 p-8 bg-white rounded-[2rem] shadow-[0_15px_40px_rgba(0,0,0,0.04)] border border-[#C9A84C]/15 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#FAF6EE] to-transparent pointer-events-none" />
                <h5 className="text-[#9A7330] text-[10px] tracking-[4px] uppercase font-bold mb-5">Specifications</h5>
                <div className="mb-2">
                  <span className="font-serif text-2xl text-royal-dark">{plan.subtitle}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-8 mt-4">
                  {plan.details.map((d, idx) => (
                    <span key={idx} className="text-[9px] font-bold tracking-widest uppercase bg-[#FAF6EE] text-[#7A6540] px-3 py-1.5 rounded-full border border-[#C9A84C]/20">
                      {d}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-4 bg-gradient-to-br from-[#C9A84C] to-[#9A7330] text-royal-dark text-[9px] font-bold uppercase tracking-[3px] rounded-xl hover:shadow-[0_8px_20px_rgba(201,168,76,0.3)] hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                    Enquire <ArrowRight size={14} />
                  </button>
                  <button className="py-4 bg-transparent border border-[#C9A84C]/30 text-[#9A7330] text-[9px] font-bold uppercase tracking-[3px] rounded-xl hover:bg-[#C9A84C]/5 hover:border-[#C9A84C] transition-all flex items-center justify-center gap-2">
                    <Download size={14} /> PDF
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Image Stage */}
          <div className="lg:col-span-8 relative group h-[700px]">
            <div className="absolute inset-0 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#C9A84C]/10 overflow-hidden flex items-center justify-center p-16">
              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(201,168,76,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.08) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#C9A84C]/30" />
              <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-[#C9A84C]/30" />
              <div className="absolute bottom-6 left-6 w-12 h-12 border-b-2 border-l-2 border-[#C9A84C]/30" />
              <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#C9A84C]/30" />
              <div className="absolute top-8 right-8 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button onClick={() => setIsFullscreen(true)} className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-[#C9A84C]/20 text-[#9A7330] hover:bg-royal-dark hover:text-[#C9A84C] hover:border-royal-dark transition-all">
                  <Maximize2 size={18} />
                </button>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlan}
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 0.9 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                  className="relative w-full h-full max-w-[800px] z-10"
                >
                  <Image src={plan.image} alt={plan.title} fill sizes="66vw" className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]" priority />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 mt-12"
          >
            <button onClick={() => setIsFullscreen(false)} className="absolute top-6 right-6 md:top-10 md:right-10 p-4 bg-[#F8F5F0] text-royal-dark rounded-full hover:bg-royal-dark hover:text-white transition-all shadow-lg">
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-[1200px]"
            >
              <Image src={plan.image} alt="Fullscreen floorplan" fill sizes="100vw" className="object-contain drop-shadow-2xl" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}