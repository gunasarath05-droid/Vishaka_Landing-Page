"use client";
import { motion } from "framer-motion";
import { 
  Building, LayoutPanelLeft, DoorOpen, LayoutGrid, 
  ChefHat, Bath, Wrench, Droplets, 
  Paintbrush, Zap, Layers
} from "lucide-react";

const specs = [
  {
    title: "Structure",
    icon: Building,
    desc: "Reinforced Cement Concrete (RCC) framed structure designed by structural consultants based on soil investigation reports."
  },
  {
    title: "Walls",
    icon: LayoutPanelLeft,
    items: [
      "External walls: 9 inch red brick masonry",
      "Internal walls: 4 inch red brick masonry"
    ]
  },
  {
    title: "Doors",
    icon: DoorOpen,
    items: [
      "Main Door: Teak wood door and frame with premium locks",
      "Bedroom Doors: Teak wood doors",
      "Bathroom Doors: WPC doors"
    ]
  },
  {
    title: "Windows",
    icon: LayoutGrid,
    items: [
      "Sliding UPVC windows",
      "Mosquito mesh provision"
    ]
  },
  {
    title: "Kitchen",
    icon: ChefHat,
    items: [
      "Black Galaxy Granite cooking platform",
      "Stainless steel sink with drain board"
    ]
  },
  {
    title: "Bathroom",
    icon: Bath,
    items: [
      "Glazed tiles up to 10 feet height",
      "Premium sanitary fittings"
    ]
  },
  {
    title: "Plumbing",
    icon: Wrench,
    items: [
      "CPVC internal pipelines",
      "PVC external pipelines"
    ]
  },
  {
    title: "Water Storage",
    icon: Droplets,
    items: [
      "Underground sump – 13,000 litres",
      "Overhead tank – 6,000 litres",
      "Separate tap provision for municipal water supply in kitchen"
    ]
  },
  {
    title: "Painting & Finishes",
    icon: Paintbrush,
    items: [
      "Internal Walls: Putty finish with emulsion paint",
      "Ceiling: Emulsion paint",
      "External Walls: Exterior grade weatherproof paint"
    ]
  },
  {
    title: "Electrical",
    icon: Zap,
    items: [
      "Concealed Polycab wiring",
      "Branded switches",
      "3 Phase electrical supply",
      "Manual phase changeover provision",
      "MCB and RCCB protection",
      "Inverter provision"
    ]
  },
  {
    title: "Flooring",
    icon: Layers,
    items: [
      "Living and Dining: Vitrified tiles",
      "Kitchen: Wall tiles and vitrified flooring",
      "Bathrooms and Balcony: Anti-skid tiles"
    ]
  }
];

export default function Specifications() {
  return (
    <section id="specifications" className="bg-cream py-16 md:py-24 px-6 md:px-12 relative overflow-hidden font-sans">
      
      {/* Background Graphic Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(201,168,76,0.03) 80px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,168,76,0.03) 80px)' 
        }} 
      />

      {/* Decorative Text */}
      <div className="absolute top-1/2 left-[-5%] -translate-y-1/2 text-[15rem] font-serif text-[#C9A84C]/[0.03] select-none pointer-events-none hidden lg:block leading-none tracking-tighter rotate-[-90deg]">
        Quality
      </div>

      <div className="max-w-8xl mx-auto relative z-10">
        
        <div className="text-center mb-16">
          <span className="text-gold text-[10px] tracking-[5px] font-semibold uppercase block mb-4">Uncompromising Quality</span>
          <h2 className="section-title text-4xl md:text-5xl text-deep">Construction Specifications</h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-gold to-transparent mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {specs.map((spec, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.03)] border border-[#C9A84C]/15 hover:shadow-[0_20px_40px_rgba(201,168,76,0.08)] hover:-translate-y-1 hover:border-[#C9A84C]/30 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle Corner Graphic */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FAF6EE] to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FAF6EE] flex items-center justify-center border border-[#C9A84C]/20 text-deep group-hover:bg-gradient-to-br from-[#C9A84C] to-[#9A7330] group-hover:text-white transition-all shadow-sm">
                  <spec.icon size={20} />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-deep">{spec.title}</h3>
              </div>
              
              <div className="relative z-10">
                {spec.desc ? (
                  <p className="text-[13px] text-deep/70 leading-relaxed font-light">
                    {spec.desc}
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {spec.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#C9A84C] to-[#9A7330] mt-1.5 flex-shrink-0" />
                        <span className="text-[13px] text-deep/70 leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
