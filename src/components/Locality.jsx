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
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const activeLoc = locations[activeIndex];
  const nextLoc = locations[(activeIndex + 1) % locations.length];

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
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Strategic Location</span>
          <h2 className="text-4xl md:text-5xl text-royal-dark font-serif">Connected to Everything</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* LEFT: Radial Layout */}
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

            {/* Orbit Nodes */}
            {locations.map((loc, i) => {
              const pos = getPosition(loc.angle, loc.r);
              return (
                <motion.div
                  key={i}
                  style={{ left: `${(pos.x / 500) * 100}%`, top: `${(pos.y / 500) * 100}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group"
                  onClick={() => { setActiveIndex(i); setIsPaused(true); }}
                >
                  <div className={`w-12 h-12 rounded-full p-0.5 bg-white border border-gold/20 shadow-lg transition-all duration-500 overflow-hidden relative
                                 ${activeIndex === i ? "scale-125 border-gold shadow-gold/20" : "group-hover:scale-110"}`}>
                    <Image src={loc.img} alt={loc.name} fill className="object-cover" sizes="48px" />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT: Realistic Segmented Book Flip */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="book-container">
              <div className="book-body">
                {/* Static Left Page (Current Info) */}
                <div className="book-page left-page">
                   <div className="page-content">
                      <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                        <Image src={activeLoc.img} alt={activeLoc.name} fill className="object-cover" />
                      </div>
                      <h3 className="font-serif text-2xl text-royal-dark mb-2">{activeLoc.name}</h3>
                      <div className="space-y-2 text-[10px] tracking-wider uppercase text-royal-dark/60 font-bold">
                        <p className="flex justify-between"><span>Category:</span> <span className="text-gold">{activeLoc.cat}</span></p>
                        <p className="flex justify-between"><span>Distance:</span> <span className="text-gold">{activeLoc.dist}</span></p>
                        <p className="flex justify-between"><span>Travel:</span> <span className="text-gold">{activeLoc.time}</span></p>
                      </div>
                   </div>
                </div>

                {/* Static Right Page (Next Info - visible during flip) */}
                <div className="book-page right-page">
                   <div className="page-content">
                      <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg">
                        <Image src={nextLoc.img} alt={nextLoc.name} fill className="object-cover" />
                      </div>
                      <h3 className="font-serif text-2xl text-royal-dark mb-2">{nextLoc.name}</h3>
                      <div className="space-y-2 text-[10px] tracking-wider uppercase text-royal-dark/60 font-bold">
                        <p className="flex justify-between"><span>Category:</span> <span className="text-gold">{nextLoc.cat}</span></p>
                        <p className="flex justify-between"><span>Distance:</span> <span className="text-gold">{nextLoc.dist}</span></p>
                        <p className="flex justify-between"><span>Travel:</span> <span className="text-gold">{nextLoc.time}</span></p>
                      </div>
                   </div>
                </div>

                {/* The Flipping Page Segments */}
                <div className="flipping-page-container">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={activeIndex}
                      className="flipping-segment-root"
                      initial={{ rotateY: 0 }}
                      animate={{ rotateY: -180 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                      {/* Segment 1 */}
                      <div className="segment s1">
                        <div className="segment s2">
                          <div className="segment s3">
                            <div className="segment s4">
                               <div className="segment-content">
                                  {/* Back of the page (shows next content) */}
                                  <div className="back-side">
                                    <Image src={nextLoc.img} alt="" fill className="object-cover" />
                                  </div>
                                  {/* Front of the page (shows current content) */}
                                  <div className="front-side">
                                    <Image src={activeLoc.img} alt="" fill className="object-cover" />
                                  </div>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="spine"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .book-container {
          perspective: 1200px;
          width: 100%;
          max-width: 500px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          transform: rotateX(25deg);
        }
        .book-body {
          position: relative;
          width: 480px;
          height: 320px;
          background: #e5e5e5;
          transform-style: preserve-3d;
          box-shadow: 0 20px 50px rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .book-page {
          position: absolute;
          width: 240px;
          height: 320px;
          background: white;
          padding: 30px;
          box-sizing: border-box;
          border: 1px solid #ddd;
        }
        .left-page {
          left: 0;
          transform-origin: right;
          border-radius: 4px 0 0 4px;
        }
        .right-page {
          right: 0;
          transform-origin: left;
          border-radius: 0 4px 4px 0;
        }
        .page-content {
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        .spine {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100%;
          background: rgba(0,0,0,0.1);
          z-index: 100;
        }
        
        .flipping-page-container {
          position: absolute;
          right: 0;
          width: 240px;
          height: 320px;
          transform-style: preserve-3d;
          z-index: 50;
          pointer-events: none;
        }

        .flipping-segment-root {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transform-origin: left center;
        }

        .segment {
          position: absolute;
          top: 0;
          left: 0;
          width: 25%;
          height: 100%;
          background: white;
          transform-style: preserve-3d;
          transform-origin: right center;
        }

        .s1 { width: 100%; left: 0; transform-origin: left center; }
        .s2, .s3, .s4 { width: 100%; left: 0; }

        .segment-content {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        .front-side, .back-side {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          background: white;
          border: 1px solid #eee;
        }

        .back-side {
          transform: rotateY(180deg);
        }

        /* Simulating the bend by adding rotation to each nested segment */
        /* This is a simplified version of the segmented flip */
      `}</style>
    </section>
  );
}
