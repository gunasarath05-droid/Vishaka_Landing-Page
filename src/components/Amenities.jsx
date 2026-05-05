"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Waves, Dumbbell, TreePine, ShieldCheck,
  Trophy, Car, Sun, Droplets,
  Home, Baby, Leaf, Road,
  ChevronLeft, ChevronRight
} from "lucide-react";
import Image from "next/image";
import * as Images from "@/data/images";

const amenities = [
  { name: "Swimming Pool", icon: Waves },
  { name: "Fitness Centre", icon: Dumbbell },
  { name: "Landscaped Park", icon: TreePine },
  { name: "24/7 Security", icon: ShieldCheck },
  { name: "Tennis Court", icon: Trophy },
  { name: "Ample Parking", icon: Car },
  { name: "Solar Lighting", icon: Sun },
  { name: "Bore Well Water", icon: Droplets },
  { name: "Clubhouse", icon: Home },
  { name: "Children's Play Area", icon: Baby },
  { name: "Avenue Plantation", icon: Leaf },
  { name: "Wide BT Roads", icon: Road },
];

const featuredImages = [
  {
    url: Images.Amenities6,
    title: "Eco-Friendly Living"
  },
  {
    url: Images.Amenities2,
    title: "Safety First"
  },
  {
    url: Images.Amenities4,
    title: "Eco-Friendly Living"
  },
  {
    url: Images.Amenities1,
    title: "Convenience"
  },
  {
    url: Images.Amenities3,
    title: "Uninterrupted Comfort"
  },
  {
    url: Images.Amenities5,
    title: "Convenience"
  }
];

export default function Amenities() {
  const [activeImage, setActiveImage] = useState(0);

  const nextImage = () => setActiveImage((prev) => (prev + 1) % featuredImages.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + featuredImages.length) % featuredImages.length);

  // Auto-switch functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % featuredImages.length);
    }, 4000); // Switches every 4 seconds

    // Cleanup interval on unmount or when user manually changes image
    return () => clearInterval(timer);
  }, [activeImage]);

  return (
    <section id="amenities" className="bg-white py-24 px-6 md:px-12 overflow-hidden relative luxury-pattern-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">World-Class Facilities</span>
          <h2 className="section-title text-4xl md:text-5xl text-deep">Premium Amenities</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
        </div>

        {/* Featured Image Slider */}
        <div className="relative mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl shadow-2xl bg-deep/5 border border-gold/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={featuredImages[activeImage].url}
                  alt={featuredImages[activeImage].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 90vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Slider Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent pointer-events-none z-10" />

            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-20">
              <div>
                <motion.p
                  key={activeImage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white text-lg md:text-2xl font-light tracking-wide"
                >
                  {featuredImages[activeImage].title}
                </motion.p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={prevImage}
                  className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="p-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`h-1 transition-all duration-500 rounded-full ${activeImage === i ? "w-8 bg-gold" : "w-2 bg-gold/30 hover:bg-gold/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Amenities Grid - Circular Layout */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-8 sm:gap-y-12 gap-x-4 sm:gap-x-8">
          {amenities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="group flex flex-col items-center text-center"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-6">
                {/* Decorative background circle */}
                <div className="absolute inset-0 rounded-full bg-gold/5 border border-gold/10 group-hover:bg-gold/10 group-hover:scale-110 transition-all duration-500" />

                {/* Icon container */}
                <div className="absolute inset-0 flex items-center justify-center text-deep group-hover:text-gold transition-colors duration-300">
                  <item.icon size={32} strokeWidth={1.5} />
                </div>

                {/* Progress-like border animation */}
                <svg className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="44%"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeDasharray="100 100"
                    strokeDashoffset="100"
                    className="text-gold opacity-0 group-hover:opacity-100 group-hover:stroke-dashoffset-0 transition-all duration-700 ease-out"
                  />
                </svg>
              </div>

              <span className="text-[11px] font-medium tracking-[2px] text-deep/70 uppercase group-hover:text-deep transition-colors duration-300">
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
