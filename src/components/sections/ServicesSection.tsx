"use client";

import { motion } from "framer-motion";
import { Film, Sparkles, Palette, Cpu, Smartphone, Megaphone, CheckCircle2 } from "lucide-react";
import servicesData from "@/content/services.json";

const iconMap: Record<string, React.ElementType> = {
  Film,
  Sparkles,
  Palette,
  Cpu,
  Smartphone,
  Megaphone,
};

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-28 px-4 sm:px-6 lg:px-12 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header matching inspector screenshot */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase mb-4"
          >
            <span className="w-6 h-px bg-[#e1e440]" />
            <span>SERVICES</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-16 text-[#fffdec]"
          >
            What I <span className="text-gradient-accent">deliver.</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon] || Film;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-strong rounded-3xl p-8 border-[#fffdec]/15 relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-[#e1e440]/50"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e1e440]/10 rounded-full blur-2xl group-hover:bg-[#e1e440]/25 transition-colors duration-500 pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#e1e440]/20 to-[#186e4f]/20 border border-[#e1e440]/30 flex items-center justify-center text-[#e1e440] mb-6 group-hover:scale-110 group-hover:bg-[#e1e440] group-hover:text-[#070d0c] transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="font-display text-2xl font-bold text-[#fffdec] mb-3 group-hover:text-[#e1e440] transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-[#fffdec]/65 text-sm font-inter leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#fffdec]/10">
                  <ul className="space-y-2">
                    {service.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs font-mono text-[#fffdec]/70">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#e1e440] shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
