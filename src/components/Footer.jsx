import React from "react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-gold/10 py-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8">
        <div className="flex items-center gap-4">
          <Image 
            src="/Logo.png" 
            alt="Vishaka Logo" 
            width={40} 
            height={40} 
            className="object-contain"
          />
          <div className="text-center lg:text-left">
            <span className="font-serif text-lg font-bold text-gold tracking-widest uppercase">
              Vishaka <span className="text-royal-dark">Constructions</span>
            </span>
            <p className="text-royal-dark/20 text-[10px] tracking-wider mt-1">© 2024 Vishaka Constructions. All rights reserved.</p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {["Privacy Policy", "Terms of Service", "Contact"].map((link, i) => (
            <a 
              key={i} 
              href="#" 
              className="text-royal-dark/40 hover:text-gold text-[10px] tracking-[2px] uppercase transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
