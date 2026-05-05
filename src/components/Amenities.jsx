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

        {/* Full-Width Continuous Marquee Banner */}
      </div>

      <div className="w-full relative overflow-hidden py-12 md:py-20">
        <div className="flex gap-4 md:gap-6 w-max animate-marquee">
          {[...featuredImages, ...featuredImages, ...featuredImages].map((img, i) => (
            <div 
              key={i} 
              className="relative w-[280px] sm:w-[450px] lg:w-[600px] aspect-[16/10] flex-shrink-0 group overflow-hidden rounded-2xl shadow-xl"
            >
              <Image
                src={img.url}
                alt={img.title}
                fill
                sizes="(max-width: 768px) 450px, 600px"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 text-white translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-sm font-light tracking-[3px] uppercase">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee CSS is needed for smooth continuous motion */}
        <style jsx global>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}</style>
      </div>

      <div className="max-w-7xl mx-auto">


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
