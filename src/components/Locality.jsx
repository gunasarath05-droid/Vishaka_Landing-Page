"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Images from "@/data/images";
import Image from "next/image";
import Stack from "./Stack";

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

  const cx = 250;
  const cy = 250;

  const getPosition = (angle, r) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };

  const localityCards = React.useMemo(() => locations.map((loc, i) => (
    <div key={i} className="w-full h-full bg-white relative group overflow-hidden">
      {/* Top Image */}
      <div className="relative w-full h-1/2 overflow-hidden">
        <Image src={loc.img} alt={loc.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="400px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-4 left-6">
          <span className="bg-gold text-white text-[9px] px-3 py-1 font-bold tracking-[3px] uppercase shadow-lg">
            {loc.tag}
          </span>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="p-6 h-1/2 flex flex-col justify-between border-t border-gold/10">
        <div>
          <h3 className="font-serif text-2xl text-royal-dark mb-1">{loc.name}</h3>
          <p className="text-gold text-[10px] font-bold tracking-[3px] uppercase mb-4">Location Highlight</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-[8px] tracking-[2px] uppercase text-royal-dark/30 font-bold">Category</p>
              <p className="text-xs font-medium text-royal-dark/70">{loc.cat}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] tracking-[2px] uppercase text-royal-dark/30 font-bold">Distance</p>
              <p className="text-xs font-bold text-royal-dark italic">{loc.dist}</p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gold/5 flex justify-between items-center">
          <span className="text-[9px] text-royal-dark/40 font-medium">ESTIMATED TRAVEL</span>
          <span className="text-sm font-serif font-bold text-gold italic">{loc.time}</span>
        </div>
      </div>
    </div>
  )), []);


  return (
    <section id="locality" className="bg-cream py-20 lg:py-32 px-6 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle, rgba(184,150,87,0.15) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Strategic Location</span>
          <h2 className="text-4xl md:text-5xl text-royal-dark font-serif">Connected to Everything</h2>
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
                  onMouseEnter={() => { setActiveIndex(i); setIsPaused(true); }}
                  onMouseLeave={() => { setIsPaused(false); }}
                  onClick={() => { setActiveIndex(i); setIsPaused(true); }}
                >
                  <div className={`w-14 h-14 rounded-full p-1 bg-white border border-gold/20 shadow-xl transition-all duration-500 overflow-hidden relative
                                 ${activeIndex === i ? "scale-125 border-gold shadow-gold/20" : "group-hover:scale-110"}`}>
                    <Image src={loc.img} alt={loc.name} fill className="object-cover" sizes="64px" />
                  </div>
                  <span className={`absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold tracking-wider transition-colors duration-300
                                 ${activeIndex === i ? "text-gold" : "text-royal-dark/70"}`}>
                    {loc.name.split(" ")[0]}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Stack Component Integration */}
          <div className="lg:col-span-5 flex flex-col items-center">
             <div className="relative w-full max-w-[380px] aspect-[3/4] lg:aspect-[4/5] mt-12 lg:mt-0">
                <Stack 
                  cards={localityCards}
                  randomRotation={true}
                  sensitivity={180}
                  sendToBackOnClick={true}
                  autoplay={!isPaused}
                  autoplayDelay={4000}
                  activeCardId={activeIndex}
                  onCardChange={(id) => setActiveIndex(id)}
                />
             </div>
             
             <p className="mt-8 text-[10px] text-royal-dark/40 font-bold tracking-[3px] uppercase animate-pulse">
                Swipe or Click to Explore
             </p>
          </div>
        </div>
      </div>
    </section>
  );
}
