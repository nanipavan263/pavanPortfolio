"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import testimonialsData from "@/content/testimonials.json";

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-12 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase mb-3"
          >
            <span className="w-6 h-px bg-[#e1e440]" />
            <span>TESTIMONIALS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-4xl sm:text-6xl font-bold tracking-tight text-[#fffdec]"
          >
            Kind <span className="text-gradient-accent">words.</span>
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-strong rounded-3xl p-8 border-[#fffdec]/15 relative overflow-hidden flex flex-col justify-between group"
            >
              <Quote className="w-10 h-10 text-[#e1e440]/30 mb-6 group-hover:text-[#e1e440] transition-colors" />

              <p className="text-[#fffdec]/80 text-base font-inter italic leading-relaxed mb-8">
                &ldquo;{item.quote}&rdquo;
              </p>

              <div className="pt-6 border-t border-[#fffdec]/10 flex items-center justify-between">
                <div>
                  <h4 className="font-space font-bold text-[#fffdec] text-sm">{item.author}</h4>
                  <p className="text-xs text-[#fffdec]/50 font-mono">{item.role}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#e1e440]/10 text-[#e1e440] border border-[#e1e440]/20 text-[11px] font-mono">
                  {item.company}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
