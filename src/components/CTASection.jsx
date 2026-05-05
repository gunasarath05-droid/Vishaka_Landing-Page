"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight, MapPin, Building2, TrendingUp, CheckCircle2 } from "lucide-react";

export default function CTASection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="cta" className="relative bg-white py-24 md:py-32 px-6 md:px-12 overflow-hidden luxury-pattern-light">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="pr-0 lg:pr-12"
          >
            {/* Pre-Title */}
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
              </span>
              <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block">
                Pre-Launch Offer Ending
              </span>
            </div>

            <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-deep mb-6">
              Secure Your <span className="text-gold italic font-semibold">Legacy</span> Today
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mb-8" />
            
            <p className="text-deep/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
              Don't miss this opportunity to own premium land in Chennai's fastest-growing residential corridor. Book a free site visit and secure exclusive pre-launch pricing.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 border-t border-gold/10 pt-8 sm:pt-10">
              <div className="space-y-2 group">
                <div className="text-emerald flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-[10px] tracking-[2px] uppercase text-deep/50 font-bold group-hover:text-gold transition-colors">Starting</span>
                </div>
                <div className="text-deep font-serif text-3xl font-bold group-hover:scale-105 origin-left transition-transform">
                  ₹1.57<span className="text-xl text-deep/40 font-sans font-normal">Cr</span>
                </div>
              </div>
              
              <div className="space-y-2 group">
                <div className="text-emerald flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-[10px] tracking-[2px] uppercase text-deep/50 font-bold group-hover:text-gold transition-colors">Area</span>
                </div>
                <div className="text-deep font-serif text-3xl font-bold group-hover:scale-105 origin-left transition-transform">
                  3000<span className="text-xl text-deep/40 font-sans font-normal">+ sq.ft</span>
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="text-emerald flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5" />
                  <span className="text-[10px] tracking-[2px] uppercase text-deep/50 font-bold group-hover:text-gold transition-colors">Payment</span>
                </div>
                <div className="text-deep font-serif text-3xl font-bold group-hover:scale-105 origin-left transition-transform">
                  EMI<span className="text-xl text-deep/40 font-sans font-normal"> options</span>
                </div>
              </div>

              <div className="space-y-2 group">
                <div className="text-emerald flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-[10px] tracking-[2px] uppercase text-deep/50 font-bold group-hover:text-gold transition-colors">Title</span>
                </div>
                <div className="text-deep font-serif text-3xl font-bold group-hover:scale-105 origin-left transition-transform">
                  100%<span className="text-xl text-deep/40 font-sans font-normal"> Clear</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Premium Form Card Light */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="bg-white border border-gold/10 rounded-none p-8 md:p-12 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-gold transition-colors duration-500 relative overflow-hidden group/card">
              
              <div className="mb-10 relative z-10">
                <h3 className="section-title text-3xl md:text-4xl text-deep mb-3">Request Callback</h3>
                <p className="text-deep/50 text-sm">Our property experts will reach out to you within 30 minutes to assist with your inquiry.</p>
              </div>

              <form className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[2px] text-deep/60 ml-1 font-bold">Full Name</label>
                  <div className="relative group/input">
                    <input 
                      type="text" 
                      placeholder="e.g. John Doe" 
                      className="w-full bg-cream border border-gold/20 rounded-none p-4 text-deep outline-none focus:border-gold focus:bg-white transition-all duration-300 placeholder:text-deep/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[2px] text-deep/60 ml-1 font-bold">Mobile Number</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-deep/50 font-medium border-r border-gold/20 pr-3 my-3">
                      +91
                    </div>
                    <input 
                      type="tel" 
                      placeholder="00000 00000" 
                      className="w-full bg-cream border border-gold/20 rounded-none p-4 pl-[4.5rem] text-deep outline-none focus:border-gold focus:bg-white transition-all duration-300 placeholder:text-deep/30"
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    type="button" 
                    className="w-full btn-gold px-8 py-5 text-[12px] md:text-[13px] font-bold tracking-[3px] uppercase whitespace-nowrap flex items-center justify-center gap-3 group"
                  >
                    Book Site Visit
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                
                <div className="flex items-center justify-center gap-2 mt-6">
                  <CheckCircle2 className="w-4 h-4 text-emerald" />
                  <span className="text-deep/50 text-[10px] uppercase tracking-[1px] font-bold">100% Secure & Confidential</span>
                </div>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
