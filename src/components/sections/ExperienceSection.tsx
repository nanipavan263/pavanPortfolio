"use client";

import { motion } from "framer-motion";
import { Briefcase, MapPin, Trophy, ChevronRight } from "lucide-react";

export default function ExperienceSection() {
  const experiences = [
    {
      id: "exp-1",
      company: "The Vivid View",
      subtitle: "Marketing Agency",
      location: "Hyderabad, India",
      duration: "MAY 2025 — PRESENT",
      isCurrent: true,
      role: "VIDEO EDITOR & MOTION GRAPHICS DESIGNER",
      description: "Leading the visual production pipeline — from commercial ad concepts to motion-driven brand campaigns.",
      bullets: [
        "Direct and edit commercial advertisements for digital marketing clients",
        "Design motion graphics, kinetic typography, and brand identity reels",
        "Build social media campaign assets across Reels, Shorts, and TVCs",
        "Collaborate with strategists and designers on full-funnel creative",
      ],
      achievements: [
        "Shipped 40+ commercial ad cuts across 12 brands",
        "Established a reusable motion-graphics template system",
      ],
    },
    {
      id: "exp-2",
      company: "BIG TV — Chota News",
      subtitle: "Broadcast Network",
      location: "Hyderabad, India",
      duration: "DECEMBER 2024 — MAY 2025",
      isCurrent: false,
      role: "VIDEO EDITOR",
      description: "Edited promotional reels, broadcast packages, and digital media for one of South India's leading news networks.",
      bullets: [
        "Edited promotional videos and television content for broadcast",
        "Cut digital-first short formats for social platforms",
        "Managed tight daily deadlines under live broadcast schedules",
      ],
      achievements: [
        "Delivered daily packages with zero on-air delivery delays",
        "Designed visual lower-third templates adopted across the network",
      ],
    },
    {
      id: "exp-3",
      company: "Grid Marketing Agency",
      subtitle: "Performance Marketing",
      location: "Hyderabad, India",
      duration: "MAR 2024 — NOV 2024",
      isCurrent: false,
      role: "MARKETING CREATIVES & PROMOTIONAL VIDEO EDITOR",
      description: "Started as an intern, promoted to full-time creative — produced high-converting ad creatives and promotional videos.",
      bullets: [
        "Designed marketing creatives for multiple brands across categories",
        "Edited promotional videos, advertisements, and social media content",
        "A/B tested creative variations for performance campaigns",
      ],
      achievements: [
        "Promoted from intern to full-time within 3 months",
        "Contributed to ad campaigns reaching 2M+ impressions",
      ],
    },
  ];

  return (
    <section id="experience" className="relative py-28 px-4 sm:px-6 lg:px-12 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header matching screenshot 1 */}
        <div className="flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase mb-4"
          >
            <span className="w-6 h-px bg-[#e1e440]" />
            <span>EXPERIENCE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-16 text-[#fffdec]"
          >
            Where I&apos;ve <span className="text-gradient-accent">crafted.</span>
          </motion.h2>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Center Spine Line */}
          <div className="hidden lg:block absolute left-[35%] top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#e1e440] via-[#186e4f] to-[#fffdec]/20" />

          <div className="space-y-16">
            {experiences.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative"
              >
                {/* Timeline Spine Node */}
                <div className="hidden lg:flex absolute left-[35%] -translate-x-1/2 top-8 z-20 items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-[#e1e440] border-4 border-[#070d0c]" />
                </div>

                {/* Left Column: Dates & Company */}
                <div className="lg:col-span-4 flex flex-col items-start text-left space-y-2 lg:pr-8">
                  <span className="text-xs font-mono text-[#e1e440]/90 font-semibold tracking-widest uppercase">
                    {item.duration}
                  </span>
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#fffdec]">
                    {item.company}
                  </h3>
                  <p className="text-xs font-mono text-[#fffdec]/50">{item.subtitle}</p>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#fffdec]/40 pt-1">
                    <span>{item.location}</span>
                    <MapPin className="w-3 h-3 text-[#e1e440]" />
                  </div>
                </div>

                {/* Right Column: Role Card */}
                <div className="lg:col-span-8">
                  <div className="glass-strong rounded-3xl p-6 sm:p-8 border-[#fffdec]/15 relative overflow-hidden group hover:border-[#e1e440]/40 transition-all">
                    {/* Role Title Badge */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#e1e440] font-bold uppercase tracking-wider mb-4 bg-[#e1e440]/10 px-3 py-1.5 rounded-xl border border-[#e1e440]/20 w-fit">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.role}</span>
                    </div>

                    <p className="text-[#fffdec]/80 text-sm font-inter leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Bullet Items */}
                    <div className="space-y-2.5 mb-6">
                      {item.bullets.map((bullet, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#fffdec]/70">
                          <ChevronRight className="w-4 h-4 text-[#e1e440] shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Key Achievements Box */}
                    <div className="pt-4 border-t border-[#fffdec]/10 space-y-2">
                      {item.achievements.map((achieve, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-mono text-[#e1e440]/90 bg-[#e1e440]/5 px-3 py-2 rounded-xl border border-[#e1e440]/10">
                          <Trophy className="w-3.5 h-3.5 text-[#e1e440] shrink-0" />
                          <span>{achieve}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
