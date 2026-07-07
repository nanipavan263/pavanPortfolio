"use client";

import { motion } from "framer-motion";
import { Clock, Users, Sparkles, Briefcase, LucideIcon } from "lucide-react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: LucideIcon;
}

const stats: Stat[] = [
  { label: "YEARS EXPERIENCE", value: 2, suffix: "+", icon: Clock },
  { label: "CLIENTS SERVED", value: 40, suffix: "+", icon: Users },
  { label: "CREATIVES DELIVERED", value: 300, suffix: "+", icon: Sparkles },
  { label: "BRANDS WORKED WITH", value: 30, suffix: "+", icon: Briefcase },
];

export default function StatsSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative glass-strong rounded-3xl p-8 sm:p-12 border-[#fffdec]/15 backdrop-blur-3xl overflow-hidden"
        >
          {/* Ambient glow accents */}
          <div
            aria-hidden
            className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#e1e440]/10 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#186e4f]/25 blur-3xl pointer-events-none"
          />

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#fffdec]/10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className={`group flex flex-col items-center ${idx !== 0 ? "pt-6 lg:pt-0" : ""}`}
                >
                  <div className="mb-4 p-2.5 rounded-xl bg-[#e1e440]/10 text-[#e1e440] border border-[#fffdec]/10 group-hover:bg-[#e1e440]/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div className="font-space font-extrabold text-4xl sm:text-6xl text-[#fffdec] mb-2 tracking-tight">
                    <AnimatedCounter value={stat.value} />
                    <span className="text-[#e1e440]">{stat.suffix}</span>
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase">
                    {stat.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
