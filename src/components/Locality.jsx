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

export default function Locality() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
        <div className="text-center mb-12">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Strategic Location</span>
          <h2 className="section-title text-4xl md:text-5xl text-deep">Connected to Everything</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
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

          {/* RIGHT: Premium Notebook Style Card with Better Animation */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] perspective-3000">
              
              {/* Premium Spiral Binder */}
              <div className="absolute left-[-22px] top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="relative group">
                    <div className="w-10 h-3 bg-gradient-to-r from-gray-500 via-gray-100 to-gray-400 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.3)] border-y border-white/20" />
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-black/20 rounded-full blur-[1px]" />
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ rotateY: 90, skewY: 10, x: 50, opacity: 0 }}
                  animate={{ rotateY: 0, skewY: 0, x: 0, opacity: 1 }}
                  exit={{ rotateY: -130, skewY: -15, x: -100, opacity: 0 }}
                  transition={{ 
                    duration: 1.1, 
                    ease: [0.645, 0.045, 0.355, 1], // Custom cubic-bezier for physical page turn
                  }}
                  className="bg-[#FAFAFA] shadow-[25px_25px_80px_rgba(0,0,0,0.12)] rounded-r-3xl overflow-hidden border-l-[14px] border-l-gold/10 border border-gold/5 relative min-h-[600px]"
                  style={{ transformOrigin: "left center", backfaceVisibility: "hidden" }}
                >
                  {/* Subtle Page Turn Shadow Gradient */}
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-40 pointer-events-none"
                  />

                  {/* Premium Paper Texture Layer */}
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none" 
                       style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }} />
                  
                  {/* Notebook Ruled Lines */}
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none" 
                       style={{ backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, #000 32px)' }} />

                  {/* Vertical Margin Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-[1.5px] bg-red-400/25" />

                  {/* Top: Image Section with Premium Overlay */}
                  <div className="relative w-full h-64 md:h-72 overflow-hidden border-b border-gold/10">
                    <Image src={activeLoc.img} alt={activeLoc.name} fill className="object-cover" sizes="420px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Floating Badge */}
                    <div className="absolute bottom-6 right-6 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-2 text-white">
                       <p className="text-[9px] font-bold tracking-[3px] uppercase opacity-90 mb-0.5">Location Hub</p>
                       <p className="text-sm font-serif italic text-gold">{activeLoc.tag}</p>
                    </div>
                  </div>

                  {/* Bottom: Handcrafted Content Section */}
                  <div className="p-10 pt-14 space-y-12 relative">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="font-serif text-4xl text-royal-dark mb-1 leading-tight tracking-tight">
                        {activeLoc.name}
                      </h3>
                      <p className="text-gold/70 text-[9px] font-black tracking-[5px] uppercase">Architectural Site Data</p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-12">
                      {[
                        { label: "Classification", value: activeLoc.cat },
                        { label: "Connectivity", value: activeLoc.tag },
                        { label: "Regional Reach", value: activeLoc.dist, big: true },
                        { label: "Time Metric", value: `${activeLoc.time} Drive` }
                      ].map((item, idx) => (
                        <motion.div 
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + idx * 0.1 }}
                          className="group"
                        >
                          <p className="text-[8px] tracking-[4px] uppercase text-royal-dark/25 font-black mb-3 group-hover:text-gold transition-colors duration-500">
                            {item.label}
                          </p>
                          <p className={`text-royal-dark/80 font-medium ${item.big ? "text-3xl font-serif font-light" : "text-base"}`}>
                            {item.value}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Official Site Stamp */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                      animate={{ opacity: 0.4, scale: 1, rotate: -15 }}
                      transition={{ delay: 0.8, type: "spring" }}
                      className="flex justify-end pt-6 grayscale"
                    >
                      <div className="relative w-24 h-24 border-2 border-gold/40 rounded-full flex flex-col items-center justify-center p-2 text-center overflow-hidden">
                        <div className="absolute inset-1 border border-gold/20 rounded-full" />
                        <span className="text-gold text-[8px] font-black tracking-[4px] uppercase mb-1">VISHAKA</span>
                        <span className="text-royal-dark text-[7px] font-bold uppercase leading-tight tracking-tighter">Site Authenticated</span>
                        <div className="absolute -bottom-2 -right-2 w-full h-1 bg-gold/10 rotate-45" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .perspective-3000 { perspective: 3000px; }
      `}</style>
    </section>
  );
}
