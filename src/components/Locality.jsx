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
  const [isFlipping, setIsFlipping] = useState(false);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (isPaused || isFlipping) return;
    const timer = setInterval(() => {
      changePage((activeIndex + 1) % locations.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex, isPaused, isFlipping]);

  const changePage = (newIndex) => {
    if (newIndex === activeIndex || isFlipping) return;
    setIsFlipping(true);
    // After the flip animation duration (0.8s), update content
    setTimeout(() => {
      setActiveIndex(newIndex);
      setTimeout(() => setIsFlipping(false), 50);
    }, 400); // half of total flip time – content changes mid-flip
  };

  const handleNodeClick = (idx) => {
    if (idx === activeIndex) return;
    setIsPaused(true);
    changePage(idx);
    // Resume auto-rotate after 10 seconds of inactivity
    setTimeout(() => setIsPaused(false), 10000);
  };

  const activeLoc = locations[activeIndex];

  const cx = 250;
  const cy = 250;
  const getPosition = (angle, r) => {
    const rad = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };

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
          {/* LEFT: Radial Diagram */}
          <div className="lg:col-span-6 relative aspect-square max-w-[500px] mx-auto w-full">
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
              <motion.div className="relative w-32 h-24 md:w-40 md:h-28 p-1 bg-white border border-gold/30 shadow-2xl">
                <div className="relative w-full h-full overflow-hidden">
                  <Image src={Images.Locality} alt="Sai Ram Flats" fill className="object-cover" sizes="200px" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gold text-white px-4 py-1 whitespace-nowrap text-[7px] font-bold tracking-[2px] uppercase shadow-xl">
                  Sai Ram Flats
                </div>
              </motion.div>
            </div>

            {/* Orbit Nodes - clickable */}
            {locations.map((loc, i) => {
              const pos = getPosition(loc.angle, loc.r);
              return (
                <motion.div
                  key={i}
                  style={{ left: `${(pos.x / 500) * 100}%`, top: `${(pos.y / 500) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                  onClick={() => handleNodeClick(i)}
                >
                  <div className={`w-12 h-12 rounded-full p-0.5 bg-white border border-gold/20 shadow-lg transition-all duration-500 overflow-hidden relative
                                 ${activeIndex === i ? "scale-125 border-gold shadow-gold/20" : "group-hover:scale-110"}`}>
                    <Image src={loc.img} alt={loc.name} fill className="object-cover" sizes="48px" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Segmented Open Book (Image-Left, Details-Right) */}
          <div className="lg:col-span-6 flex flex-col items-center perspective-container">
            <div className="book-spread">
              
              {/* Left Page - Image */}
              <div className="page left-page">
                <div className="image-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full h-full"
                    >
                      <Image src={activeLoc.img} alt={activeLoc.name} fill className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Page - Details */}
              <div className="page right-page">
                <div className="details-container">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="h-full flex flex-col justify-center"
                    >
                      <h3 className="font-serif text-3xl text-royal-dark mb-4">{activeLoc.name}</h3>
                      <div className="space-y-4 text-[10px] tracking-[3px] uppercase text-royal-dark/60 font-bold">
                        <p className="flex justify-between border-b border-gold/10 pb-2"><span>Category:</span> <span className="text-gold">{activeLoc.cat}</span></p>
                        <p className="flex justify-between border-b border-gold/10 pb-2"><span>Distance:</span> <span className="text-gold">{activeLoc.dist}</span></p>
                        <p className="flex justify-between border-b border-gold/10 pb-2"><span>Time Metric:</span> <span className="text-gold">{activeLoc.time}</span></p>
                        <p className="flex justify-between"><span>Strategic Hub:</span> <span className="text-gold">{activeLoc.tag}</span></p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Animated Segmented 3D Flip Overlay */}
              <div className="flips-container">
                <motion.div
                  key={activeIndex}
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: isFlipping ? -180 : 0 }}
                  transition={{ duration: 0.8, ease: [0.645, 0.045, 0.355, 1] }}
                  className="flip-segment s1"
                >
                  <div className="flip-segment s2">
                    <div className="flip-segment s3">
                      <div className="flip-segment s4">
                        <div className="flip-segment s5">
                          <div className="flip-segment s6">
                            <div className="flip-segment s7"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="book-gap"></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-container {
          perspective: 1200px;
          perspective-origin: center 50px;
        }

        .book-spread {
          position: relative;
          width: 480px;
          height: 320px;
          transform-style: preserve-3d;
          transform: scale(1.05) rotateX(8deg);
          filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
        }

        .page {
          position: absolute;
          width: 240px;
          height: 320px;
          background: white;
          top: 0;
          box-shadow: inset 3px 0 10px rgba(0,0,0,0.05);
          border: 1px solid rgba(0,0,0,0.08);
          overflow: hidden;
        }

        .left-page {
          left: 0;
          border-radius: 4px 0 0 4px;
        }

        .right-page {
          left: 240px;
          border-radius: 0 4px 4px 0;
          padding: 30px;
          background: linear-gradient(145deg, #ffffff 0%, #fcfcfc 100%);
        }

        .image-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .book-gap {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: rgba(0,0,0,0.1);
          z-index: 100;
        }

        .flips-container {
          position: absolute;
          top: 0;
          left: 240px;
          width: 240px;
          height: 320px;
          pointer-events: none;
          transform-style: preserve-3d;
          z-index: 50;
        }

        .flip-segment {
          width: 34.2px;
          height: 100%;
          position: absolute;
          top: 0;
          transform-origin: 0% center;
          left: 100%;
          background: white;
          border: 1px solid rgba(0,0,0,0.05);
          border-width: 0 1px;
          transform-style: preserve-3d;
        }

        .s1 {
          left: 0;
          width: 34.2px;
          transform-origin: left center;
        }

        .flip-segment:not(.s1) {
          left: calc(100% - 1px);
          transform-origin: left;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .book-spread { transform: scale(0.9) rotateX(6deg); width: 400px; height: 280px; }
          .page { width: 200px; height: 280px; }
          .right-page { left: 200px; padding: 20px; }
          .flips-container { left: 200px; width: 200px; height: 280px; }
          .flip-segment { width: 28.5px; }
        }
      `}</style>
    </section>
  );
}