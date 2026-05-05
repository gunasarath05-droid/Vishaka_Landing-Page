"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import * as Images from "@/data/images";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 px-6 lg:px-12 overflow-hidden relative luxury-pattern-light">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full max-w-[400px] mx-auto lg:w-1/2 lg:max-w-none pb-8 sm:pb-10 lg:pb-0"
        >
          <div className="relative aspect-[3/4] max-h-[500px] border border-gold/20">
            <Image
              src={Images.About}
              alt="Vishaka Constructions Office"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 sm:-right-8 w-32 sm:w-40 h-32 sm:h-40 bg-gold flex flex-col items-center justify-center text-maroon shadow-2xl">
            <span className="font-serif text-5xl font-bold leading-none">15+</span>
            <span className="text-[10px] font-bold tracking-[2px] uppercase mt-2 text-center px-4">Years of Excellence</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Our Legacy</span>
          <h2 className="section-title text-4xl lg:text-5xl text-royal-dark mb-8">About Vishaka Constructions</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mb-8" />

          <div className="space-y-6 text-royal-dark/60 text-sm lg:text-base leading-relaxed">
            <p>
              Vishaka Constructions is a trusted name in Chennai's real estate landscape, built on a foundation of transparency, quality, and customer-first values. Since our inception, we have helped hundreds of families realize their dream of owning premium land.
            </p>
            <p>
              Every project we undertake is DTCP-approved, vastu-compliant, and built with meticulous attention to infrastructure — from wide BT roads to underground cabling and rainwater harvesting systems.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "DTCP & RERA Approved",
              "Clear Title & Legal Documentation",
              "Bank Loan Assistance",
              "100% Transparent Pricing",
              "Vastu-Compliant Layouts",
              "Premium Amenities Included",
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-royal-dark/80 text-xs tracking-wider">
                <span className="text-gold">◆</span>
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
