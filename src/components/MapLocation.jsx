"use client";
import React from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function MapLocation() {
  return (
    <section id="map-location" className="bg-white py-24 px-6 md:px-12 luxury-pattern-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Find Us</span>
          <h2 className="section-title text-4xl md:text-5xl text-royal-dark mb-8">Project Location</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mb-8" />
          
          <p className="text-royal-dark/50 text-sm md:text-base leading-relaxed mb-10">
            Strategically situated for maximum connectivity with easy access to major highways, IT parks, educational institutions, and healthcare facilities.
          </p>

          <div className="bg-cream border border-gold/20 p-8">
            <span className="text-gold text-[10px] tracking-[3px] uppercase font-bold block mb-3">Project Address</span>
            <address className="text-royal-dark/70 text-sm md:text-base not-italic leading-relaxed">
              Survey No. 123/4, Near Pallavaram,<br />
              Chromepet, Chennai – 600 044,<br />
              Tamil Nadu, India.
            </address>
          </div>

          <a 
            href="https://www.google.com/maps/search/?api=1&query=12.9664,80.1882"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-gold text-[11px] font-bold tracking-[2px] uppercase mt-8 border-b border-gold/30 pb-2 hover:text-gold-light transition-colors"
          >
            → Open in Google Maps
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="aspect-[4/3] bg-royal-dark/5 border border-gold/20 relative overflow-hidden group">
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3888.0851338813636!2d80.18817899999999!3d12.966403999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDU3JzU5LjEiTiA4MMKwMTEnMTcuNCJF!5e0!3m2!1sen!2sin!4v1777550702340!5m2!1sen!2sin" 
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
             <div className="absolute inset-0 border-[10px] border-white pointer-events-none" />
             <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
