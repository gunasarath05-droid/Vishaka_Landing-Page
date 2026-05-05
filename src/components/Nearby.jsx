"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Hospital, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "hospitals", label: "Hospitals", icon: Hospital },
  { id: "shopping", label: "Shopping", icon: ShoppingBag },
];

const data = {
  education: [
    { name: "Sairam Vidyalaya School", dist: "Nearby" },
    { name: "Narayana Olympiad School", dist: "Madipakkam" },
    { name: "Prince Matriculation", dist: "Hr. Sec. School" },
    { name: "Brilliant Matriculation", dist: "Hr. Sec. School" },
    { name: "Kidzee & Little Millennium", dist: "Early Education" },
    { name: "Guru Nanak College", dist: "Velachery (5-10km)" },
    { name: "IIT Madras", dist: "Higher Education" },
    { name: "Anna University", dist: "Higher Education" },
  ],
  hospitals: [
    { name: "Kamakshi Memorial Hospital", dist: "Multispecialty" },
    { name: "Dr. Kennedy's Saraswathy", dist: "0.4 - 3 km" },
    { name: "Anjakha & Neolife Hospital", dist: "0.4 - 3 km" },
    { name: "Swetha Ishwarya Hospitals", dist: "0.4 - 3 km" },
    { name: "Padhuvai & Urban Primary", dist: "0.4 - 3 km" },
    { name: "Vijayam & CM Hospital", dist: "Short Drive" },
    { name: "Medcross Bone & Joint", dist: "Short Drive" },
    { name: "Srinivasan Rajalakshmi", dist: "Memorial Hospital" },
  ],
  shopping: [
    { name: "Phoenix Marketcity", dist: "5 km · 10 mins" },
    { name: "Grand Square Mall", dist: "4 km · 8 mins" },
    { name: "D-Mart", dist: "1.5 km · 4 mins" },
    { name: "Palladium Mall", dist: "8 km · 15 mins" },
  ],
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.02, staggerDirection: -1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

export default function Nearby() {
  const [activeTab, setActiveTab] = useState("education");

  return (
    <section id="nearby" className="bg-cream py-20 lg:py-28 px-4 lg:px-12 luxury-pattern-light overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Connectivity</span>
          <h2 className="section-title text-4xl lg:text-5xl text-royal-dark font-serif">Everything Nearby</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
        </div>

        {/* Premium Animated Tabs */}
        <div className="flex justify-center mb-10 lg:mb-12">
          <div className="flex w-full lg:w-auto bg-white/80 backdrop-blur-md border border-gold/20 p-1.5 rounded-full shadow-sm relative">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex-1 lg:flex-none px-1 lg:px-8 py-3 lg:py-3.5 text-[8px] lg:text-[10px] font-bold tracking-[1px] lg:tracking-[2px] uppercase transition-all duration-500 flex items-center justify-center gap-1.5 lg:gap-2.5 rounded-full z-10",
                    isActive ? "text-white" : "text-royal-dark/50 hover:text-royal-dark"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-gold to-[#E4C97E] rounded-full -z-10 shadow-[0_4px_15px_rgba(201,168,76,0.3)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon size={14} className={isActive ? "text-white" : "text-gold"} />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Staggered Cards Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5"
            >
              {data[activeTab].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group relative bg-white border border-gold/10 p-4 lg:p-6 hover:border-gold/40 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(201,168,76,0.12)] transition-all duration-500 overflow-hidden"
                >
                  {/* Decorative Background Element */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold/5 to-transparent rounded-bl-[100px] -z-10 group-hover:scale-125 transition-transform duration-700" />
                  
                  <div className="flex flex-col items-start gap-3 lg:gap-4">
                    <div className="w-9 h-9 lg:w-12 lg:h-12 rounded-full bg-cream flex items-center justify-center text-gold group-hover:scale-110 group-hover:bg-gold group-hover:text-white transition-all duration-500 flex-shrink-0 border border-gold/20 shadow-inner">
                      {activeTab === 'education' && <GraduationCap size={16} className="lg:w-5 lg:h-5" />}
                      {activeTab === 'hospitals' && <Hospital size={16} className="lg:w-5 lg:h-5" />}
                      {activeTab === 'shopping' && <ShoppingBag size={16} className="lg:w-5 lg:h-5" />}
                    </div>
                    
                    <div className="flex flex-col justify-start">
                      <h4 className="text-royal-dark font-serif font-medium text-[12px] sm:text-[14px] lg:text-[16px] leading-tight mb-2 group-hover:text-gold transition-colors duration-300">
                        {item.name}
                      </h4>
                      <div>
                        <span className="inline-block bg-cream border border-gold/10 px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-sm text-royal-dark/60 text-[7px] lg:text-[9px] font-bold tracking-[1px] lg:tracking-[2px] uppercase">
                          {item.dist}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
