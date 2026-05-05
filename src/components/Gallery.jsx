"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import * as Images from "@/data/images";

const highlights = [
  { title: "Grand Entrance", img: Images.SaiRam, large: true },
  { title: "Landscaping", img: Images.Image1, large: false },
  { title: "Clubhouse", img: Images.Image2, large: false },
  { title: "Wide Roads", img: Images.Image3, large: false },
  { title: "Sunrise View", img: Images.Image4, large: false },
];

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80 }),
};

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };
  const prev = () => goTo((active - 1 + highlights.length) % highlights.length);
  const next = () => goTo((active + 1) % highlights.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % highlights.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [active]);

  const backgroundGrid = {
    backgroundImage:
      "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,168,76,0.03) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,168,76,0.03) 80px)",
  };

  return (
    <section id="project" className="bg-white py-16 md:py-24 px-6 md:px-12 relative overflow-hidden font-sans">
      <div className="absolute inset-0 pointer-events-none z-0" style={backgroundGrid} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Crafted With Finesse</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-deep">Project Highlights</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
        </div>

        {/* ── Mobile & Tablet: Single-image auto-scroll carousel ── */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden rounded-2xl h-[280px] sm:h-[340px] bg-[#0D0A06]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="absolute inset-0"
                onClick={() => setSelectedImage(highlights[active])}
              >
                <Image
                  src={highlights[active].img}
                  alt={highlights[active].title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-85"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A06]/80 via-transparent to-transparent" />

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white">
                  <Maximize2 size={16} />
                </div>

                {/* Title badge */}
                <div className="absolute bottom-5 left-5">
                  <div className="bg-[#0D0A06]/60 backdrop-blur-md border border-white/10 px-4 py-3 rounded-xl inline-block">
                    <span className="text-[#C9A84C] text-[8px] tracking-[4px] uppercase font-bold block mb-0.5">Vishaka Heritage</span>
                    <h3 className="text-white font-serif text-base tracking-wide leading-none">{highlights[active].title}</h3>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5 px-1">
            <button onClick={prev} className="p-2.5 rounded-full border border-gold/20 text-deep/50 hover:border-gold hover:text-gold transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-2">
              {highlights.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${active === i ? "w-8 bg-gold" : "w-2 bg-gold/30"}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-2.5 rounded-full border border-gold/20 text-deep/50 hover:border-gold hover:text-gold transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Desktop: Masonry bento grid ── */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setSelectedImage(item)}
              className={`relative group overflow-hidden bg-[#0D0A06] rounded-2xl cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.05)] ${item.large ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0A06]/90 via-[#0D0A06]/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 z-10">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-2xl">
                  <Maximize2 size={20} />
                </div>
              </div>
              <div className="absolute inset-4 border border-[#C9A84C]/0 group-hover:border-[#C9A84C]/40 transition-all duration-700 pointer-events-none scale-105 group-hover:scale-100 z-10 rounded-xl" />
              <div className="absolute bottom-6 left-6 right-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 z-20">
                <div className="bg-[#0D0A06]/60 backdrop-blur-md border border-white/10 px-5 py-4 rounded-xl inline-block shadow-lg">
                  <span className="text-[#C9A84C] text-[8px] tracking-[4px] uppercase font-bold block mb-1">Vishaka Heritage</span>
                  <h3 className="text-white font-serif text-lg md:text-xl tracking-wide leading-none">{item.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#0D0A06]/95 flex items-center justify-center p-4 md:p-12 mt-12 cursor-pointer backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 md:top-10 md:right-10 p-4 bg-white/5 text-white hover:text-[#C9A84C] hover:bg-white/10 rounded-full transition-all shadow-lg backdrop-blur-md z-50 border border-white/10"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-[1200px] max-h-[85vh] rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(201,168,76,0.1)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage.img} alt={selectedImage.title} fill sizes="100vw" className="object-contain" />
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#0D0A06]/80 backdrop-blur-md px-8 py-3 rounded-full border border-[#C9A84C]/30 text-white font-serif tracking-[4px] uppercase text-xs md:text-sm shadow-2xl">
                {selectedImage.title}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


