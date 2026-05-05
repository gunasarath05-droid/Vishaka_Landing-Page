"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as Images from "@/data/images";

export default function Hero() {
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

      {/* <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-3 border border-gold/30 px-5 py-2 mb-8 bg-gold/5 backdrop-blur-sm">
            <span className="text-gold text-[10px] tracking-[4px] uppercase">
              ◆ Luxury Plotted Development · Chennai
            </span>
          </div>

          <h1 className="text-royal-dark font-light leading-[1.1] mb-6">
            <span className="block text-4xl md:text-7xl font-serif">Own Your</span>
            <span className="block text-5xl md:text-8xl font-serif text-gold italic font-semibold">Dream Plot</span>
            <span className="block text-sm md:text-base font-sans mt-4 text-royal-dark/40 tracking-[5px] uppercase">
              In the heart of the city
            </span>
          </h1>

          <p className="text-royal-dark/70 text-sm md:text-base leading-relaxed mb-10 max-w-lg">
            Discover premium DTCP-approved plotted developments crafted for those who believe land is the finest investment. Secure your legacy today.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button
              onClick={() => document.getElementById('cta').scrollIntoView({ behavior: 'smooth' })}
              className="btn-gold px-10 py-4 text-xs font-bold tracking-[3px] uppercase shadow-lg shadow-gold/20 cursor-pointer"
            >
              Book Site Visit
            </button>
            <button
              onClick={() => document.getElementById('floor-plan').scrollIntoView({ behavior: 'smooth' })}
              className="border border-gold/30 text-gold hover:bg-gold/10 px-10 py-4 text-xs font-bold tracking-[3px] uppercase transition-all cursor-pointer"
            >
              View Site Plan
            </button>
          </div>

          <div className="flex gap-8 md:gap-12 pt-8 border-t border-gold/20">
            {[
              { num: "45+", label: "Projects Done" },
              { num: "250+", label: "Happy Families" },
              { num: "15+", label: "Years Trust" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-gold font-serif text-3xl md:text-4xl font-bold">{stat.num}</div>
                <div className="text-royal-dark/40 text-[9px] tracking-[2px] uppercase mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2 w-96 glass p-10 border border-gold/20 shadow-2xl"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
          
          <h3 className="text-royal-dark font-serif text-3xl mb-1">Get Free Consultation</h3>
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

            <select className="w-full bg-royal-dark/5 border border-gold/10 p-4 text-royal-dark/50 text-sm outline-none focus:border-gold transition-all appearance-none cursor-pointer">
              <option className="bg-cream">Plot Size Preference</option>
              <option className="bg-cream">Below 1000 sq.ft</option>
              <option className="bg-cream">1000 – 1500 sq.ft</option>
              <option className="bg-cream">1500 – 2400 sq.ft</option>
              <option className="bg-cream">Above 2400 sq.ft</option>
            </select>
            
            <button className="w-full bg-royal-dark text-white py-5 text-[10px] font-bold tracking-[4px] uppercase mt-4 hover:bg-maroon transition-all duration-500 shadow-xl group flex items-center justify-center gap-3">
              Request Callback
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
          </form>
          
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-gold/10" />
            <span className="text-[8px] text-gold/40 tracking-[2px] uppercase">Exclusive Pre-Launch Offer</span>
            <div className="h-px flex-1 bg-gold/10" />
          </div>
        </motion.div>
      </div> */}

    </section>
  );
}
