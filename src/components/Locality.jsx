"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Images from "@/data/images";
import Image from "next/image";

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

  // Auto-cycle highlight flow
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % locations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeLoc = locations[activeIndex];

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
    <section id="locality" className="bg-cream py-20 lg:py-32 px-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, rgba(184,150,87,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span className="text-gold text-[10px] tracking-[6px] font-semibold uppercase block mb-4">Strategic Location</motion.span>
          <motion.h2 className="text-4xl lg:text-6xl text-royal-dark font-serif mb-6">Connected to <em className="text-gold not-italic">Everything</em></motion.h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: Radial Layout */}
          <div className="lg:col-span-7 relative aspect-square max-w-[550px] mx-auto w-full">
            <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <circle cx="250" cy="250" r="110" fill="none" stroke="rgba(184,150,87,0.1)" strokeWidth="1" />
              <circle cx="250" cy="250" r="210" fill="none" stroke="rgba(184,150,87,0.2)" strokeWidth="1.5" strokeDasharray="8 6" />
              
              {locations.map((loc, i) => {
                const pos = getPosition(loc.angle, loc.r);
                return (
                  <motion.line
                    key={i}
                    x1="250" y1="250" x2={pos.x} y2={pos.y}
                    stroke={activeIndex === i ? "#B89657" : "rgba(184,150,87,0.3)"}
                    strokeWidth={activeIndex === i ? "2" : "1.5"}
                    strokeDasharray={activeIndex === i ? "10 5" : "5 8"}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Central Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
              <motion.div className="relative w-40 h-32 md:w-48 md:h-36 p-1 bg-white border border-gold/30 shadow-2xl">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={Images.Locality} alt="Sai Ram Flats" fill className="object-cover" sizes="200px" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-white px-5 py-1.5 whitespace-nowrap text-[8px] font-bold tracking-[3px] uppercase shadow-xl">
                  Sai Ram Flats
                </div>
              </motion.div>
            </div>

            {/* Orbit Nodes */}
            {locations.map((loc, i) => {
              const pos = getPosition(loc.angle, loc.r);
              return (
                <motion.div
                  key={i}
                  style={{ left: `${(pos.x / 500) * 100}%`, top: `${(pos.y / 500) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                  onClick={() => { setActiveIndex(i); setIsPaused(true); }}
                  onMouseEnter={() => { setActiveIndex(i); setIsPaused(true); }}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className={`w-16 h-16 rounded-full p-1 bg-white border border-gold/20 shadow-xl transition-all duration-500 overflow-hidden relative
                                 ${activeIndex === i ? "scale-125 border-gold shadow-gold/20" : "group-hover:scale-110 group-hover:border-gold/50"}`}>
                    <Image src={loc.img} alt={loc.name} fill className="object-cover" sizes="64px" />
                    <div className={`absolute inset-0 bg-gold/5 transition-opacity duration-500 ${activeIndex === i ? "opacity-0" : "opacity-20 group-hover:opacity-0"}`} />
                  </div>
                  <span className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wider transition-colors duration-300
                                 ${activeIndex === i ? "text-gold" : "text-royal-dark/70"}`}>
                    {loc.name.split(" ")[0]}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Notebook Style Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setActiveIndex(locations.findIndex(l => l.cat === cat)); }}
                  className={`text-[9px] font-bold tracking-[2px] uppercase px-4 py-2 border transition-all duration-300
                             ${activeCategory === cat ? "bg-gold text-white border-gold" : "bg-white border-gold/20 text-royal-dark/40"}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Notebook Page Container */}
            <div className="relative w-full max-w-[400px] perspective-1000">
              {/* Spiral/Rings on the left */}
              <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-8 h-2 bg-gradient-to-r from-gray-400 to-gray-200 rounded-full shadow-md border border-gray-300" />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ rotateY: -20, opacity: 0, x: 50 }}
                  animate={{ rotateY: 0, opacity: 1, x: 0 }}
                  exit={{ rotateY: 20, opacity: 0, x: -50 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="bg-white shadow-2xl rounded-r-2xl overflow-hidden border border-gold/10 relative"
                  style={{ transformOrigin: "left center" }}
                >
                  {/* Notebook Paper Texture Overlay */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 23px, #000 24px)' }} />

                  {/* Top: Image Section */}
                  <div className="relative w-full h-56 md:h-64 overflow-hidden border-b border-gold/10">
                    <Image src={activeLoc.img} alt={activeLoc.name} fill className="object-cover" sizes="400px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-gold/90 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                      {activeLoc.tag}
                    </div>
                  </div>

                  {/* Bottom: Details Section */}
                  <div className="p-8 space-y-8 bg-white/80 backdrop-blur-sm relative">
                    <div className="border-b border-gold/10 pb-4">
                      <h3 className="font-serif text-3xl text-royal-dark mb-1">{activeLoc.name}</h3>
                      <p className="text-gold text-xs font-medium tracking-[3px] uppercase">Landmark Details</p>
                    </div>

                    <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                      <div className="space-y-1">
                        <p className="text-[8px] tracking-[3px] uppercase text-royal-dark/30 font-bold">Category</p>
                        <p className="text-sm font-medium text-royal-dark/70">{activeLoc.cat}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] tracking-[3px] uppercase text-royal-dark/30 font-bold">Status</p>
                        <p className="text-sm font-bold text-gold italic">{activeLoc.tag}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] tracking-[3px] uppercase text-royal-dark/30 font-bold">Reach</p>
                        <p className="text-sm font-serif text-royal-dark font-semibold italic text-xl">{activeLoc.dist}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] tracking-[3px] uppercase text-royal-dark/30 font-bold">Travel Time</p>
                        <p className="text-sm font-medium text-royal-dark/60">{activeLoc.time}</p>
                      </div>
                    </div>

                    {/* Signature/Stamp look */}
                    <div className="flex justify-end pt-4">
                      <div className="w-16 h-16 border-2 border-gold/20 rounded-full flex items-center justify-center -rotate-12">
                        <span className="text-gold/40 text-[8px] font-bold tracking-widest uppercase text-center leading-none">Verified<br/>Site</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
}
