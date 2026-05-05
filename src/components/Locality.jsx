"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Images from "@/data/images";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const locations = [
  { name: "Tidel Park", img: Images.TidelPark, cat: "Work", dist: "~8 km", time: "~15 min", angle: -90, r: 210, tag: "IT Hub" },
  { name: "Chennai Airport", img: Images.ChennaiAirport, cat: "Transport", dist: "~4 km", time: "~10 min", angle: -45, r: 210, tag: "International" },
  { name: "Velachery Station", img: Images.VelacherryRailwayStation, cat: "Transport", dist: "~1.5 km", time: "~5 min", angle: 0, r: 210, tag: "MRTS" },
  { name: "Madipakkam Metro", img: Images.MetroStation, cat: "Transport", dist: "~5 km", time: "~12 min", angle: 45, r: 210, tag: "Metro" },
  { name: "Iswarya Hospital", img: Images.IshwaryaHospital, cat: "Health", dist: "~1 km", time: "~3 min", angle: 90, r: 210, tag: "Multi-specialty" },
  { name: "Guindy Park", img: Images.GuindyNationalPark, cat: "Leisure", dist: "3 km", time: "7 min", angle: 135, r: 210, tag: "National Park" },
  { name: "IIT Madras", img: Images.IITMadras, cat: "Education", dist: "6 km", time: "12 min", angle: 180, r: 210, tag: "Premier Institute" },
  { name: "Phoenix Mall", img: Images.PhoenixMarketcity, cat: "Leisure", dist: "5 km", time: "10 min", angle: -135, r: 210, tag: "Premium Retail" },
];

const categories = [...new Set(locations.map(l => l.cat))];

export default function Locality() {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const filteredLocations = locations.filter(l => l.cat === activeCategory);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % locations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

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
    <section id="locality" className="bg-cream py-20 lg:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, rgba(184,150,87,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="text-gold text-[10px] tracking-[6px] font-semibold uppercase block mb-4">Strategic Location</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl lg:text-6xl text-royal-dark font-serif mb-6">Connected to <em className="text-gold not-italic">Everything</em></motion.h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: Radial Layout matching the sketch */}
          <div className="lg:col-span-7 relative aspect-square max-w-[550px] mx-auto w-full">
            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              {/* Radial Circles from sketch */}
              <circle cx="250" cy="250" r="110" fill="none" stroke="rgba(184,150,87,0.1)" strokeWidth="1" />
              <circle cx="250" cy="250" r="210" fill="none" stroke="rgba(184,150,87,0.2)" strokeWidth="1.5" strokeDasharray="8 6" />
              
              {/* Lines from center image to nodes */}
              {locations.map((loc, i) => {
                const pos = getPosition(loc.angle, loc.r);
                const isVisible = loc.cat === activeCategory;
                return (
                  <motion.line
                    key={i}
                    x1="250" y1="250" x2={pos.x} y2={pos.y}
                    stroke={activeIndex === i ? "#B89657" : "rgba(184,150,87,0.15)"}
                    strokeWidth={activeIndex === i ? "2" : "1"}
                    strokeDasharray={activeIndex === i ? "10 5" : "5 8"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0.1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Central Hub: Square Image as shown in the sketch */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="relative w-40 h-32 md:w-48 md:h-36 p-1 bg-white border border-gold/30 shadow-2xl"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={Images.Locality} alt="Sai Ram Flats" fill className="object-cover" sizes="200px" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-white px-5 py-1.5 whitespace-nowrap text-[8px] font-bold tracking-[3px] uppercase shadow-xl">
                  Sai Ram Flats
                </div>
              </motion.div>
            </div>

            {/* Orbit Nodes: Positioned 45 degrees apart as per sketch placement */}
            {locations.map((loc, i) => {
              const pos = getPosition(loc.angle, loc.r);
              const isVisible = loc.cat === activeCategory;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: isVisible ? 1 : 0.15, scale: 1 }}
                  style={{ left: `${(pos.x / 500) * 100}%`, top: `${(pos.y / 500) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                  onMouseEnter={() => { setActiveIndex(i); setIsPaused(true); }}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className={`w-16 h-16 rounded-full p-1 bg-white border border-gold/20 shadow-xl transition-all duration-500 overflow-hidden relative
                                 ${activeIndex === i ? "scale-125 border-gold shadow-gold/20" : "group-hover:scale-110 group-hover:border-gold/50"}`}>
                    <Image src={loc.img} alt={loc.name} fill className="object-cover" sizes="64px" />
                    <div className={`absolute inset-0 bg-gold/10 transition-opacity duration-500 ${activeIndex === i ? "opacity-0" : "opacity-40 group-hover:opacity-0"}`} />
                  </div>
                  <span className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wider transition-colors duration-300
                                 ${activeIndex === i ? "text-gold" : "text-royal-dark/40"}`}>
                    {loc.name.split(" ")[0]}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT Panel: Filtered Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 mb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveIndex(locations.findIndex(l => l.cat === cat)); }}
                  className={`text-[9px] font-bold tracking-[2px] uppercase px-5 py-2.5 border transition-all duration-300
                             ${activeCategory === cat ? "bg-gold text-white border-gold shadow-lg shadow-gold/20" : "bg-white border-gold/20 text-royal-dark/40 hover:border-gold/50 hover:text-royal-dark"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto max-h-[550px] pr-2 custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {locations.filter(l => l.cat === activeCategory).map((loc) => {
                  const idx = locations.indexOf(loc);
                  const isActive = activeIndex === idx;
                  return (
                    <motion.div
                      key={loc.name}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onMouseEnter={() => { setActiveIndex(idx); setIsPaused(true); }}
                      onMouseLeave={() => setIsPaused(false)}
                      className={`bg-white border p-5 cursor-pointer transition-all duration-500 relative overflow-hidden group shadow-sm
                                 ${isActive ? "border-gold/40 shadow-xl shadow-gold/5" : "border-gold/10 hover:border-gold/30 hover:shadow-md"}`}
                    >
                      <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gold transition-transform duration-500 origin-top
                                     ${isActive ? "scale-y-100" : "scale-y-0"}`} />

                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-full border border-gold/10 overflow-hidden flex-shrink-0">
                          <Image src={loc.img} alt={loc.name} fill className="object-cover" sizes="48px" />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-serif text-lg transition-colors duration-300 ${isActive ? "text-gold" : "text-royal-dark"}`}>
                            {loc.name}
                          </h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] font-bold text-gold">{loc.dist}</span>
                            <div className="w-px h-2.5 bg-gold/20" />
                            <span className="text-[10px] text-royal-dark/30 uppercase tracking-tight">{loc.time}</span>
                          </div>
                        </div>
                        <ChevronRight size={16} className={`transition-all duration-500 ${isActive ? "text-gold translate-x-1" : "text-gold/20"}`} />
                      </div>

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
                                <p className="text-[7px] tracking-[2px] uppercase text-royal-dark/30">Category</p>
                                <p className="text-[10px] text-royal-dark/60">{loc.cat}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[7px] tracking-[2px] uppercase text-royal-dark/30">Status</p>
                                <p className="text-[10px] text-gold font-bold">{loc.tag}</p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-[7px] tracking-[2px] uppercase text-royal-dark/30">Reach</p>
                                <p className="text-[10px] text-royal-dark/80">{loc.dist}</p>
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
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(184,150,87,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(184,150,87,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(184,150,87,0.4); }
      `}</style>
    </section>
  );
}
