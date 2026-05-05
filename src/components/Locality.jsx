"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Images from "@/data/images";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const locations = [
  { name: "Tidel Park", img: Images.TidelPark, dist: "~8 km", time: "~15 mins drive", angle: -135 },
  { name: "Chennai Airport", img: Images.ChennaiAirport, dist: "~4 km", time: "~10 mins drive", angle: -90 },
  { name: "Velachery Station", img: Images.VelacherryRailwayStation, dist: "~1.5 km", time: "~5 mins drive", angle: -45 },
  { name: "Madipakkam Metro", img: Images.MetroStation, dist: "~5 km", time: "~12 mins drive", angle: 180 },
  { name: "Iswarya Hospital", img: Images.IshwaryaHospital, dist: "~1 km", time: "~3 mins drive", angle: 0 },
  { name: "Guindy Park", img: Images.GuindyNationalPark, dist: "3 km", time: "7 mins drive", angle: 135 },
  { name: "IIT Madras", img: Images.IITMadras, dist: "6 km", time: "12 mins drive", angle: 90 },
  { name: "Phoenix Marketcity", img: Images.PhoenixMarketcity, dist: "5 km", time: "10 mins drive", angle: 45 },
];

const CARDS_PER_PAGE = 4;
const totalPages = Math.ceil(locations.length / CARDS_PER_PAGE);

const containerVariants = {
  enter: { opacity: 1 },
  center: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30, scale: 0.9, filter: "blur(4px)" }),
  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30, scale: 0.9, filter: "blur(4px)", transition: { duration: 0.3 } }),
};

export default function Locality() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    setDirection(index > page ? 1 : -1);
    setPage(index);
  };
  const prev = () => goTo((page - 1 + totalPages) % totalPages);
  const next = () => goTo((page + 1) % totalPages);

  // Auto-scroll every 4s on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setPage((p) => (p + 1) % totalPages);
    }, 4000);
    return () => clearInterval(timer);
  }, [page]);

  const currentCards = locations.slice(page * CARDS_PER_PAGE, page * CARDS_PER_PAGE + CARDS_PER_PAGE);

  return (
    <section id="locality" className="bg-cream py-16 lg:py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Strategic Location</span>
          <h2 className="section-title text-3xl sm:text-4xl lg:text-5xl text-royal-dark font-serif">Connected to Everything</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mt-6 mx-auto" />
        </div>

        {/* Desktop Radial Map */}
        <div className="hidden lg:block relative h-[800px] w-full">
          {/* Animated Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: ring * 0.2 }}
                className="absolute border border-gold/10 rounded-full"
                style={{ width: `${ring * 250}px`, height: `${ring * 250}px` }}
              />
            ))}
          </div>

          {/* SVG Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(184, 150, 87, 0.05)" />
                <stop offset="50%" stopColor="rgba(184, 150, 87, 0.3)" />
                <stop offset="100%" stopColor="rgba(184, 150, 87, 0.05)" />
              </linearGradient>
            </defs>
            {locations.map((loc, i) => {
              const angleRad = (loc.angle * Math.PI) / 180;
              const x2 = 50 + 40 * Math.cos(angleRad);
              const y2 = 50 + 40 * Math.sin(angleRad);
              return (
                <motion.line
                  key={i}
                  x1="50%" y1="50%" x2={`${x2}%`} y2={`${y2}%`}
                  stroke="url(#lineGradient)" strokeWidth="1.5" strokeDasharray="5 8"
                  initial={{ strokeDashoffset: 100, opacity: 0 }}
                  whileInView={{ strokeDashoffset: 0, opacity: 1 }}
                  animate={hoveredIndex === i ? { strokeWidth: 3, strokeDasharray: "10 5" } : {}}
                  transition={{ duration: 1.5, delay: i * 0.1 }}
                />
              );
            })}
          </svg>

          {/* Central Building */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
            <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="w-94 h-84 p-1 group relative">
              <div className="w-full h-full overflow-hidden relative">
                <Image src={Images.Locality} alt="Sai Ram Building" fill sizes="300px" className="object-cover" />
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gold text-white px-8 py-2.5 whitespace-nowrap text-[10px] font-bold tracking-[5px] uppercase shadow-2xl">
                Sai Ram Flats
              </div>
            </motion.div>
          </div>

          {/* Location Nodes */}
          {locations.map((loc, i) => {
            const angleRad = (loc.angle * Math.PI) / 180;
            const x = 50 + 40 * Math.cos(angleRad);
            const y = 50 + 40 * Math.sin(angleRad);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                className="z-20 group"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative">
                  <div className="relative w-28 h-28 rounded-full border border-gold/20 p-1 bg-white shadow-xl overflow-hidden group-hover:border-gold group-hover:scale-110 transition-all duration-300">
                    <Image src={loc.img} alt={loc.name} fill sizes="112px" className="object-cover" />
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={hoveredIndex === i ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                    className={`absolute ${loc.angle > 90 || loc.angle < -90 ? "right-28" : "left-28"} top-1/2 -translate-y-1/2 w-60 p-5 bg-white border border-gold/10 shadow-2xl z-50 pointer-events-none`}
                  >
                    <h4 className="font-serif text-base text-royal-dark mb-2 leading-tight">{loc.name}</h4>
                    <div className="flex items-center gap-4 pt-3 border-t border-gold/5">
                      <div>
                        <p className="text-royal-dark/30 text-[8px] uppercase tracking-tighter mb-0.5">Distance</p>
                        <p className="text-gold text-xs font-bold">{loc.dist}</p>
                      </div>
                      <div className="w-px h-6 bg-gold/10" />
                      <div>
                        <p className="text-royal-dark/30 text-[8px] uppercase tracking-tighter mb-0.5">Time</p>
                        <p className="text-royal-dark text-xs font-medium">{loc.time}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Mobile: 2×2 auto-scroll grid ── */}
        <div className="lg:hidden">
          {/* Card grid with page animation */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={containerVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="grid grid-cols-2 gap-3"
              >
                {currentCards.map((item, i) => (
                  <motion.div
                    key={item.name}
                    custom={direction}
                    variants={cardVariants}
                    className="bg-white border border-gold/10 rounded-2xl overflow-hidden group hover:border-gold/30 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.15)]"
                  >
                    {/* Square image */}
                    <div className="relative w-full aspect-square overflow-hidden">
                      <Image src={item.img} alt={item.name} fill sizes="50vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    {/* Info */}
                    <div className="p-3">
                      <h3 className="font-serif text-sm text-royal-dark leading-tight mb-2 line-clamp-1">{item.name}</h3>
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-royal-dark/30 text-[7px] uppercase tracking-tighter">Dist</p>
                          <p className="text-gold text-[9px] font-bold whitespace-nowrap">{item.dist}</p>
                        </div>
                        <div className="w-px h-4 bg-gold/10" />
                        <div>
                          <p className="text-royal-dark/30 text-[7px] uppercase tracking-tighter">Time</p>
                          <p className="text-royal-dark text-[9px] font-medium whitespace-nowrap">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button onClick={prev} className="p-2.5 rounded-full border border-gold/20 text-deep/50 hover:border-gold hover:text-gold transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${page === i ? "w-8 bg-gold" : "w-2 bg-gold/30"}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2.5 rounded-full border border-gold/20 text-deep/50 hover:border-gold hover:text-gold transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}


