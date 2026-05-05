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
    }, 6000);
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

          {/* RIGHT: Segmented CSS Book Flip (Image Left, Details Right) */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="book-desk">
              <div className="book-spread">
                
                {/* Left Page: Always Image */}
                <div className="page left-static">
                  <div className="image-container">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative w-full h-full"
                      >
                        <Image src={activeLoc.img} alt="" fill className="object-cover" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Page: Always Details */}
                <div className="page right-static">
                  <div className="details-container">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.8 }}
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

                {/* The Flipping Overlay (Matches CSS segments) */}
                <div className="flips-container">
                   <div className="flip-segment s1">
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
                   </div>
                </div>

                <div className="book-gap"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .book-desk {
          perspective: 1200px;
          perspective-origin: center 50px;
          transform: scale(1.1);
          filter: drop-shadow(0px 20px 40px rgba(0, 0, 0, 0.15));
        }

        .book-spread {
          position: relative;
          width: 480px;
          height: 320px;
          transform-style: preserve-3d;
        }

        .page {
          width: 240px;
          height: 320px;
          background: white;
          position: absolute;
          top: 0;
          border: 1px solid rgba(0,0,0,0.1);
          transform-style: preserve-3d;
          box-shadow: inset 3px 0 10px rgba(0,0,0,0.05);
        }

        .left-static {
          right: 50%;
          transform: rotateX(25deg) rotateY(3deg);
          transform-origin: 100% 100%;
          border-radius: 4px 0 0 4px;
          overflow: hidden;
        }

        .right-static {
          left: 50%;
          transform: rotateX(25deg) rotateY(-3deg);
          transform-origin: 0% 100%;
          border-radius: 0 4px 4px 0;
          padding: 30px;
        }

        .image-container {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .book-gap {
          width: 4px;
          height: 320px;
          background: rgba(0,0,0,0.1);
          position: absolute;
          left: 50%;
          transform: translateX(-50%) rotateX(25deg);
          z-index: 100;
        }

        /* Flipping Segments Animation Logic */
        .flips-container {
          position: absolute;
          top: 0;
          right: 50%;
          width: 240px;
          height: 320px;
          pointer-events: none;
          transform-style: preserve-3d;
        }

        .flip-segment {
          width: 34px; /* 240 / 7 segments approx */
          height: 100%;
          position: absolute;
          top: 0;
          transform-origin: 100% 100%;
          right: 100%;
          border: solid rgba(0,0,0,0.05);
          border-width: 1px 0;
          background: white;
          transform-style: preserve-3d;
        }

        .s1 {
          right: 0;
          width: 34px;
          animation: flipMove 6s infinite ease-in-out;
          border-width: 1px 1px 1px 0;
        }

        .flip-segment:not(.s1) {
          right: calc(100% - 1px);
          top: -1px;
          transform-origin: right;
          animation: flipCurl 6s infinite ease-in-out;
        }

        @keyframes flipMove {
          0%, 10% { transform: rotateX(25deg) rotateY(-3deg); }
          50%, 100% { transform: rotateX(25deg) rotateY(-177deg); }
        }

        @keyframes flipCurl {
          0%, 10% { transform: rotateY(0deg); }
          30%, 70% { transform: rotateY(-12deg); }
          90%, 100% { transform: rotateY(0deg); }
        }

        .s7 {
          border-width: 1px 0 1px 1px;
        }
      `}</style>
    </section>
  );
}
