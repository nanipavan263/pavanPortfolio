"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Mail, Phone } from "lucide-react";
import portfolioData from "@/content/portfolio.json";
import educationData from "@/content/education.json";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-12 z-10">
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
            <span>ABOUT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-4xl sm:text-6xl font-bold tracking-tight text-[#fffdec]"
          >
            A storyteller who designs with <span className="text-gradient-accent">intent.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Bio Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-strong rounded-3xl p-8 sm:p-10 flex flex-col justify-between border-[#fffdec]/15 relative overflow-hidden"
          >
            <div className="space-y-4 mb-10">
              <p className="text-[#fffdec]/80 text-base sm:text-lg leading-relaxed font-inter">
                {portfolioData.bio}
              </p>
              <p className="text-[#fffdec]/60 text-sm sm:text-base leading-relaxed font-inter">
                To craft compelling visual narratives that elevate brands, blending cinematic storytelling with cutting-edge graphic design and AI-driven creative workflows.
              </p>
            </div>

            {/* Bottom Meta Grid */}
            <div className="pt-8 border-t border-[#fffdec]/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#fffdec]/5 text-[#e1e440] border border-[#fffdec]/10">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#fffdec]/40 uppercase">LOCATION</p>
                  <p className="text-[#fffdec] font-space font-semibold text-sm">{portfolioData.socials.location}, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#fffdec]/5 text-[#e1e440] border border-[#fffdec]/10">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#fffdec]/40 uppercase">EMAIL</p>
                  <p className="text-[#fffdec] font-space font-semibold text-sm">{portfolioData.socials.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#fffdec]/5 text-[#e1e440] border border-[#fffdec]/10">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#fffdec]/40 uppercase">PHONE</p>
                  <p className="text-[#fffdec] font-space font-semibold text-sm">{portfolioData.socials.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#fffdec]/5 text-[#e1e440] border border-[#fffdec]/10">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[#fffdec]/40 uppercase">EDUCATION</p>
                  <p className="text-[#fffdec] font-space font-semibold text-sm">Arena Animation</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Education Timeline */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="text-xs font-mono tracking-widest text-[#fffdec]/40 uppercase mb-2">
              EDUCATION TIMELINE
            </div>

            <div className="space-y-4 flex-1 flex flex-col justify-between">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-strong rounded-3xl p-6 sm:p-8 border-[#fffdec]/15 flex flex-col justify-between flex-1 group hover:border-[#e1e440]/40 transition-colors"
                >
                  <div>
                    <span className="text-xs font-mono text-[#e1e440]/90 tracking-wider mb-2 block">
                      {edu.years}
                    </span>
                    <h3 className="font-space font-bold text-lg sm:text-xl text-[#fffdec] mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-xs font-medium text-[#fffdec]/70 mb-4">{edu.institution}</p>
                  </div>
                  <p className="text-[11px] font-mono text-[#fffdec]/40 border-t border-[#fffdec]/5 pt-3">
                    {idx === 0 ? "Video Editing, Graphic Design, Visual Production" : "Technical foundations & systems thinking"}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
