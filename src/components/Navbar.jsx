"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Amenities", id: "amenities" },
    { name: "Floor Plan", id: "floor-plan" },
    { name: "Location", id: "locality" },
    { name: "About Us", id: "about" },
  ];

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className={cn(
          "fixed top-0 w-full z-[999] transition-all duration-500 px-4 lg:px-8 xl:px-12",
          scrolled 
            ? "bg-white/90 backdrop-blur-xl py-3 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border-b border-[#C9A84C]/15" 
            : "bg-transparent py-5 lg:py-6"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-105 transition-transform duration-500">
              <Image 
                src="/Logo.png" 
                alt="Vishaka Logo" 
                fill
                sizes="48px"
                className="object-contain drop-shadow-sm"
              />
            </div>
            <div className="flex flex-col leading-none justify-center">
              <span className="font-serif text-[16px] sm:text-lg lg:text-2xl font-bold text-[#C9A84C] tracking-[0.15em] uppercase">
                Vishaka Constructions
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="group relative text-[10px] font-bold tracking-[3px] uppercase text-[#1A202C]/70 hover:text-[#C9A84C] transition-colors duration-300 py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C9A84C] group-hover:w-full transition-all duration-300 ease-out" />
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => scrollToSection('cta')}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#C9A84C] to-[#E4C97E] text-[#1A202C] px-7 py-3 rounded-sm text-[9px] font-bold tracking-[3px] uppercase shadow-lg shadow-[#C9A84C]/20 hover:shadow-[#C9A84C]/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <PhoneCall size={14} />
              Enquire Now
            </button>
            
            <button 
              onClick={() => scrollToSection('cta')}
              className="sm:hidden bg-gradient-to-r from-[#C9A84C] to-[#E4C97E] text-[#1A202C] px-5 py-2.5 rounded-sm text-[9px] font-bold tracking-[2px] uppercase shadow-lg shadow-[#C9A84C]/20"
            >
              Enquire
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden text-[#1A202C] p-2 rounded-full hover:bg-[#C9A84C]/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[1000] bg-white/95 flex flex-col overflow-hidden"
          >
            {/* Decorative background accents */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#1A202C]/5 rounded-full blur-3xl" />

            {/* Header */}
            <div className="flex items-center justify-between p-6 relative z-10 border-b border-[#C9A84C]/10 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                 <div className="relative w-8 h-8">
                   <Image src="/Logo.png" alt="Vishaka Logo" fill sizes="32px" className="object-contain" />
                 </div>
                 <span className="font-serif text-[16px] font-bold text-[#C9A84C] tracking-[0.15em] uppercase">Vishaka Constructions</span>
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 text-[#1A202C]/60 hover:text-[#1A202C] bg-[#FAF6EE] border border-[#C9A84C]/20 rounded-full shadow-sm hover:scale-105 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Nav Links */}
            <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
              <div className="flex flex-col gap-8">
                {navLinks.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                    onClick={() => scrollToSection(item.id)}
                    className="flex items-center justify-between text-left group"
                  >
                    <span className="text-[#1A202C] font-serif text-4xl sm:text-5xl font-light tracking-wide group-hover:text-[#C9A84C] transition-colors duration-300">
                      {item.name}
                    </span>
                    <span className="text-[#C9A84C] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      →
                    </span>
                  </motion.button>
                ))}
              </div>
              
              {/* Footer CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-16 pt-8 border-t border-[#C9A84C]/15 flex flex-col gap-4"
              >
                <p className="text-[9px] uppercase tracking-[4px] text-[#1A202C]/50 font-bold mb-1">Take the first step</p>
                <button 
                  onClick={() => scrollToSection('cta')}
                  className="w-full bg-gradient-to-r from-[#C9A84C] to-[#E4C97E] text-[#1A202C] py-5 rounded-sm text-[10px] font-bold tracking-[4px] uppercase shadow-[0_10px_30px_rgba(201,168,76,0.25)] flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                  <PhoneCall size={16} />
                  Book Site Visit
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
