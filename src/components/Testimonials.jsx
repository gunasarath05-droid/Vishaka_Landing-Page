"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "IT Professional, Chennai",
    text: "Vishaka delivered exactly what they promised. The plot location is prime and the documentation process was completely transparent.",
    stars: 5,
  },
  {
    name: "Priya Anand",
    role: "Business Owner, Coimbatore",
    text: "Best investment decision of my life. The amenities are world-class and the team's after-sales support has been outstanding.",
    stars: 5,
  },
  {
    name: "Suresh Natarajan",
    role: "NRI Investor, Dubai",
    text: "DTCP approved, vastu-compliant plots with clear titles. We did extensive research before choosing Vishaka and they exceeded our expectations.",
    stars: 5,
  },
];

function TestimonialCard({ t }) {
  return (
    <div className="bg-white border border-gold/10 p-8 relative group w-full rounded-2xl">
      <div className="relative h-36 bg-royal-dark mb-6 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-maroon/30 to-transparent" />
        <div className="relative z-10 w-12 h-12 rounded-full bg-gold flex items-center justify-center text-maroon cursor-pointer group-hover:scale-110 group-hover:bg-maroon group-hover:text-gold transition-all duration-300">
          <Play size={20} fill="currentColor" />
        </div>
      </div>
      <div className="flex gap-1 mb-4">
        {[...Array(t.stars)].map((_, i) => (
          <Star key={i} size={14} className="fill-gold text-gold" />
        ))}
      </div>
      <p className="text-deep/70 italic text-sm md:text-base leading-relaxed mb-6 font-serif">
        &ldquo;{t.text}&rdquo;
      </p>
      <div>
        <h4 className="text-deep font-bold text-xs tracking-wider uppercase">{t.name}</h4>
        <span className="text-gold text-[10px] tracking-widest uppercase">{t.role}</span>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = (index) => {
    setDirection(index > active ? 1 : -1);
    setActive(index);
  };

  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);
  const next = () => goTo((active + 1) % testimonials.length);

  // Auto-scroll every 4 seconds on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [active]);

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  };

  return (
    <section id="testimonials" className="bg-cream py-16 md:py-24 px-6 md:px-12 luxury-pattern-light">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Real Stories</span>
          <h2 className="section-title text-3xl sm:text-4xl md:text-5xl text-deep">What Our Clients Say</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
        </div>

        {/* Mobile: Single card auto-scroll carousel */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <TestimonialCard t={testimonials[active]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6 px-1">
            <button
              onClick={prev}
              className="p-2.5 rounded-full border border-gold/20 text-deep/50 hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    active === i ? "w-8 bg-gold" : "w-2 bg-gold/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2.5 rounded-full border border-gold/20 text-deep/50 hover:border-gold hover:text-gold transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Desktop: 3-column grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="hover:-translate-y-2 transition-transform duration-500"
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


