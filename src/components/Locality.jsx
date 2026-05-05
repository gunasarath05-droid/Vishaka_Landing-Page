"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, Plane, Train, MapPin, 
  Hospital, TreePine, GraduationCap, 
  ShoppingBag, ChevronRight, Home 
} from "lucide-react";

const locations = [
  { name: "Tidel Park", icon: Building2, cat: "Work", dist: "~8 km", time: "~15 min", angle: -120, r: 150, tag: "IT Hub" },
  { name: "Chennai Airport", icon: Plane, cat: "Transport", dist: "~4 km", time: "~10 min", angle: -60, r: 150, tag: "International" },
  { name: "Velachery Station", icon: Train, cat: "Transport", dist: "~1.5 km", time: "~5 min", angle: 0, r: 150, tag: "MRTS" },
  { name: "Madipakkam Metro", icon: MapPin, cat: "Transport", dist: "~5 km", time: "~12 min", angle: 60, r: 150, tag: "Metro" },
  { name: "Iswarya Hospital", icon: Hospital, cat: "Health", dist: "~1 km", time: "~3 min", angle: 120, r: 150, tag: "Multi-specialty" },
  { name: "Guindy Park", icon: TreePine, cat: "Leisure", dist: "3 km", time: "7 min", angle: 180, r: 150, tag: "National Park" },
  { name: "IIT Madras", icon: GraduationCap, cat: "Education", dist: "6 km", time: "12 min", angle: -180, r: 220, tag: "Premier Institute" },
  { name: "Phoenix Mall", icon: ShoppingBag, cat: "Leisure", dist: "5 km", time: "10 min", angle: -90, r: 220, tag: "Premium Retail" },
];

const categories = ["All", ...new Set(locations.map(l => l.cat))];

export default function Locality() {
  const [activeCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredLocations = locations.filter(l => activeCategory === "All" || l.cat === activeCategory);

  // Auto-cycle highlight flow
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredLocations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, filteredLocations.length]);

  const cx = 250;

  const cy = 250;

  const getPosition = (angle, r) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };

  return (
    <section id="locality" className="bg-[#0D0A06] py-20 lg:py-32 px-6 relative overflow-hidden font-sans">
      {/* Subtle background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-40" 
           style={{ backgroundImage: 'radial-gradient(circle, rgba(201,168,76,0.18) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[100px]"
           style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-gold text-[10px] tracking-[6px] font-semibold uppercase block mb-4"
          >
            Prime Connectivity
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl text-[#FAF6EE] font-serif mb-6"
          >
            In the Heart of <em className="text-gold not-italic">Chennai</em>
          </motion.h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* LEFT: Orbit Canvas */}
          <div className="lg:col-span-7 relative aspect-square max-w-[600px] mx-auto w-full">
            {/* SVG Orbit Lines & Rings */}
            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              {/* Concentric Rings */}
              <circle cx="250" cy="250" r="80" fill="none" stroke="rgba(201,168,76,0.08)" strokeWidth="1" />
              <circle cx="250" cy="250" r="150" fill="none" stroke="rgba(201,168,76,0.14)" strokeWidth="1" strokeDasharray="6 5" />
              <circle cx="250" cy="250" r="220" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
              
              {/* Connection Lines */}
              {locations.map((loc, i) => {
                const pos = getPosition(loc.angle, loc.r);
                const isVisible = activeCategory === "All" || loc.cat === activeCategory;
                return (
                  <motion.line
                    key={i}
                    x1="250" y1="250" x2={pos.x} y2={pos.y}
                    className="transition-all duration-500"
                    stroke={activeIndex === i ? "#C9A84C" : "rgba(201,168,76,0.2)"}
                    strokeWidth={activeIndex === i ? "1.5" : "1"}
                    strokeDasharray={activeIndex === i ? "6 4" : "5 6"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0.15 }}
                  />
                );
              })}
            </svg>

            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative w-24 h-24 rounded-full bg-[#1A1508] border border-gold flex flex-col items-center justify-center gap-1 shadow-[0_0_30px_rgba(201,168,76,0.2)]">
                {/* Pulsing rings */}
                <div className="absolute inset-[-10px] border border-gold/20 rounded-full animate-ping opacity-20" />
                <div className="absolute inset-[-20px] border border-gold/10 rounded-full animate-ping opacity-10 [animation-delay:0.5s]" />
                <Home className="text-gold" size={28} />
                <span className="text-[8px] tracking-[2px] uppercase text-gold/70 font-bold">Project</span>
              </div>
            </div>

            {/* Orbit Nodes */}
            {locations.map((loc, i) => {
              const pos = getPosition(loc.angle, loc.r);
              const isVisible = activeCategory === "All" || loc.cat === activeCategory;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: isVisible ? 1 : 0.2, scale: 1 }}
                  style={{ left: `${(pos.x / 500) * 100}%`, top: `${(pos.y / 500) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                  onMouseEnter={() => { setActiveIndex(i); setIsPaused(true); }}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className={`w-14 h-14 rounded-full bg-[#150F04] border border-gold/25 flex items-center justify-center transition-all duration-500 relative
                                 ${activeIndex === i ? "scale-125 border-gold bg-[#2A1E00] shadow-[0_0_20px_rgba(201,168,76,0.2)]" : "group-hover:scale-110 group-hover:border-gold/50"}`}>
                    <loc.icon className={`${activeIndex === i ? "text-gold" : "text-gold/60"} transition-colors`} size={24} />
                    <div className={`absolute inset-[-4px] border border-transparent rounded-full transition-all duration-500 ${activeIndex === i ? "border-gold/30" : ""}`} />
                  </div>
                  <span className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wider transition-colors duration-300
                                 ${activeIndex === i ? "text-[#E4C97E]" : "text-white/40"}`}>
                    {loc.name.split(" ")[0]}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Detail Cards Panel */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Scrollable Cards Stack */}
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">

              <AnimatePresence mode="popLayout">
                {filteredLocations.map((loc) => {
                  const idx = locations.indexOf(loc);
                  const isActive = activeIndex === idx;
                  return (
                    <motion.div
                      key={loc.name}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setActiveIndex(isActive ? -1 : idx)}
                      onMouseEnter={() => { setActiveIndex(idx); setIsPaused(true); }}
                      onMouseLeave={() => setIsPaused(false)}
                      className={`bg-[#120E03] border p-5 cursor-pointer transition-all duration-500 relative overflow-hidden group
                                 ${isActive ? "border-gold/40 bg-[#1C1604]" : "border-gold/10 hover:border-gold/30 hover:bg-[#151105]"}`}
                    >
                      {/* Active indicator bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gold to-transparent transition-transform duration-500 origin-top
                                     ${isActive ? "scale-y-100" : "scale-y-0"}`} />

                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center transition-colors duration-300
                                       ${isActive ? "bg-gold/20 border-gold/40" : "bg-gold/5"}`}>
                          <loc.icon className={isActive ? "text-gold" : "text-gold/40"} size={18} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-serif text-lg transition-colors duration-300 ${isActive ? "text-[#E4C97E]" : "text-white/70"}`}>
                            {loc.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-bold text-gold">{loc.dist}</span>
                            <div className="w-px h-2.5 bg-gold/20" />
                            <span className="text-[10px] text-white/30 uppercase tracking-tight">{loc.time}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className={`transition-all duration-500 ${isActive ? "text-gold translate-x-1" : "text-gold/20"}`} />
                      </div>

                      {/* Expandable Content */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-5 mt-5 border-t border-gold/10 grid grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <p className="text-[7px] tracking-[2px] uppercase text-gold/40">Category</p>
                                <p className="text-[10px] text-white/50">{loc.cat}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[7px] tracking-[2px] uppercase text-gold/40">Status</p>
                                <p className="text-[10px] text-gold font-bold">{loc.tag}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[7px] tracking-[2px] uppercase text-gold/40">Reach</p>
                                <p className="text-[10px] text-[#E4C97E]">{loc.dist}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(201,168,76,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(201,168,76,0.4); }
      `}</style>
    </section>
  );
}
