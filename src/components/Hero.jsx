"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import * as Images from "@/data/images";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-popup every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative w-full bg-cream lg:h-screen lg:flex lg:items-center lg:overflow-hidden">

      {/* --- DESKTOP VIEW --- */}
      <div className="hidden lg:block absolute inset-0 z-0 mt-[100px]">
        <Image
          src={Images.HeroBg}
          alt="Luxury Plotted Development"
          fill
          priority
          loading="eager"
          sizes="100vw"
          className="object-contain object-top"
        />
      </div>

      {/* --- MOBILE & TABLET VIEW --- */}
      <div className="block lg:hidden w-full relative z-0 mt-[80px] md:mt-[100px]">
        <Image
          src={Images.MobileHeroBg}
          alt="Luxury Plotted Development"
          priority
          loading="eager"
          sizes="100vw"
          className="w-full h-auto object-top block"
        />
      </div>

      {/* Hero Content & Form Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto lg:left-[34%]">

        {/* Right Side: Static Consultation Form (Responsive) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full lg:w-[400px] glass p-8 lg:p-10 border border-gold/20 shadow-2xl relative"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

          <h3 className="text-royal-dark font-serif text-2xl lg:text-3xl mb-1">Get Free Consultation</h3>
          <p className="text-royal-dark/40 text-[10px] tracking-wider mb-8">Our advisor will call you within 30 mins</p>

          <form className="space-y-5">
            <div className="relative group">
              <input type="text" placeholder="Your Full Name" className="w-full bg-royal-dark/5 border border-gold/10 p-4 text-royal-dark text-sm outline-none focus:border-gold transition-all" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-focus-within:w-full transition-all duration-500" />
            </div>

            <div className="relative group">
              <input type="tel" placeholder="Mobile Number" className="w-full bg-royal-dark/5 border border-gold/10 p-4 text-royal-dark text-sm outline-none focus:border-gold transition-all" />
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-focus-within:w-full transition-all duration-500" />
            </div>

            <button className="w-full bg-gold-dark text-white py-5 text-[10px] font-bold tracking-[4px] uppercase mt-4 hover:bg-maroon transition-all duration-500 shadow-xl group flex items-center justify-center gap-3">
              Request Callback
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gold/10" />
            <span className="text-[8px] text-emerald-dark tracking-[2px] uppercase">Exclusive Pre-Launch Offer</span>
            <div className="h-px flex-1 bg-gold/10" />
          </div>
        </motion.div>
      </div>

      {/* Premium Popup Consultation Form (Automated) */}
      {/* <AnimatePresence>
        {isOpen && (
          <>
           
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-deep/60 backdrop-blur-md z-[1000] cursor-pointer"
            />

          
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.9, y: 20, x: "-50%" }}
              className="fixed left-1/2 top-1/2 -translate-y-1/2 w-[92%] max-w-md glass p-8 md:p-10 border border-gold/20 shadow-2xl z-[1001]"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-gold text-white rounded-full flex items-center justify-center shadow-lg hover:bg-maroon transition-colors z-[1002]"
              >
                <X size={20} />
              </button>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

              <h3 className="text-royal-dark font-serif text-2xl md:text-3xl mb-1">Get Free Consultation</h3>
              <p className="text-royal-dark/40 text-[10px] tracking-wider mb-8">Our advisor will call you within 30 mins</p>

              <form className="space-y-5">
                <div className="relative group">
                  <input type="text" placeholder="Your Full Name" className="w-full bg-royal-dark/5 border border-gold/10 p-4 text-royal-dark text-sm outline-none focus:border-gold transition-all" />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-focus-within:w-full transition-all duration-500" />
                </div>

                <div className="relative group">
                  <input type="tel" placeholder="Mobile Number" className="w-full bg-royal-dark/5 border border-gold/10 p-4 text-royal-dark text-sm outline-none focus:border-gold transition-all" />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-focus-within:w-full transition-all duration-500" />
                </div>

                <button className="w-full bg-gold-dark text-white py-5 text-[10px] font-bold tracking-[4px] uppercase mt-4 hover:bg-maroon transition-all duration-500 shadow-xl group flex items-center justify-center gap-3">
                  Request Callback
                  <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                </button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="h-px flex-1 bg-gold/10" />
                <span className="text-[8px] text-emerald-dark tracking-[2px] uppercase">Exclusive Pre-Launch Offer</span>
                <div className="h-px flex-1 bg-gold/10" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> */}

    </section>
  );
}
