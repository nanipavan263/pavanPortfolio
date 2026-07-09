"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Briefcase, MapPin, Trophy, ChevronRight, Radio } from "lucide-react";

interface Experience {
  id: string;
  company: string;
  subtitle: string;
  location: string;
  duration: string;
  isCurrent: boolean;
  role: string;
  description: string;
  bullets: string[];
  achievements: string[];
}

const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "The Vivid View",
    subtitle: "Marketing Agency",
    location: "Hyderabad, India",
    duration: "MAY 2025 — PRESENT",
    isCurrent: true,
    role: "VIDEO EDITOR & MOTION GRAPHICS DESIGNER",
    description:
      "Leading the visual production pipeline — from commercial ad concepts to motion-driven brand campaigns.",
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
    description:
      "Edited promotional reels, broadcast packages, and digital media for one of South India's leading news networks.",
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
    description:
      "Started as an intern, promoted to full-time creative — produced high-converting ad creatives and promotional videos.",
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

const n = experiences.length;

function ProgressDot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const center = n > 1 ? index / (n - 1) : 0;
  const step = n > 1 ? 1 / (n - 1) : 1;
  const range = [center - step, center, center + step];

  const scale = useTransform(progress, range, [1, 1.6, 1]);
  const backgroundColor = useTransform(progress, range, [
    "rgba(255,253,236,0.25)",
    "rgba(225,228,64,1)",
    "rgba(255,253,236,0.25)",
  ]);

  return <motion.span style={{ scale, backgroundColor }} className="w-1.5 h-1.5 rounded-full" />;
}

function ExperiencePanel({
  item,
  index,
  progress,
}: {
  item: Experience;
  index: number;
  progress: MotionValue<number>;
}) {
  const center = n > 1 ? index / (n - 1) : 0;
  const step = n > 1 ? 1 / (n - 1) : 1;
  const range = [center - step, center, center + step];

  // Coverflow: the active panel sits flat and full-strength; neighbors recede,
  // dim, and tilt away — the incoming panel visually "covers" the outgoing one.
  const opacity = useTransform(progress, range, [0.25, 1, 0.25]);
  const scale = useTransform(progress, range, [0.88, 1, 0.88]);
  const rotateY = useTransform(progress, range, [18, 0, -18]);
  const z = useTransform(progress, range, [-120, 0, -120]);

  return (
    <motion.div
      style={{ opacity, scale, rotateY, z }}
      className="relative w-full h-full shrink-0 flex items-center justify-center px-4 sm:px-8 lg:px-16"
    >
      {/* Ghost index number */}
      <span
        aria-hidden
        className="absolute top-[8%] left-1/2 -translate-x-1/2 lg:left-[8%] lg:translate-x-0 text-[9rem] sm:text-[13rem] font-space font-black text-[#fffdec]/[0.035] leading-none select-none pointer-events-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Dates & Company */}
        <div className="lg:col-span-4 flex flex-col items-start text-left space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-mono text-[#e1e440]/90 font-semibold tracking-widest uppercase">
              {item.duration}
            </span>
            {item.isCurrent && (
              <span className="flex items-center gap-1 text-[9px] font-mono font-bold text-[#e1e440] bg-[#e1e440]/10 border border-[#e1e440]/30 rounded-full px-2 py-0.5">
                <Radio className="w-2.5 h-2.5 animate-pulse" />
                LIVE
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#fffdec] leading-tight">
            {item.company}
          </h3>
          <p className="text-xs font-mono text-[#fffdec]/50">{item.subtitle}</p>
          <div className="flex items-center gap-1 text-[11px] font-mono text-[#fffdec]/40 pt-1">
            <span>{item.location}</span>
            <MapPin className="w-3 h-3 text-[#e1e440]" />
          </div>
        </div>

        {/* Role Card */}
        <div className="lg:col-span-8 w-full">
          <div className="relative glass-strong rounded-3xl p-5 sm:p-7 lg:p-8 border-[#fffdec]/15 overflow-hidden shadow-2xl max-h-[56svh] sm:max-h-[60svh] overflow-y-auto">
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#e1e440] font-bold uppercase tracking-wider mb-3.5 bg-[#e1e440]/10 px-3 py-1.5 rounded-xl border border-[#e1e440]/20 w-fit">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{item.role}</span>
            </div>

            <p className="text-[#fffdec]/80 text-sm font-inter leading-relaxed mb-4">
              {item.description}
            </p>

            <div className="space-y-2 mb-4">
              {item.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#fffdec]/70">
                  <ChevronRight className="w-4 h-4 text-[#e1e440] shrink-0 mt-0.5" />
                  <span>{bullet}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#fffdec]/10 flex flex-wrap gap-2">
              {item.achievements.map((achieve, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#e1e440]/90 bg-[#e1e440]/5 px-3 py-1.5 rounded-xl border border-[#e1e440]/10"
                >
                  <Trophy className="w-3.5 h-3.5 text-[#e1e440] shrink-0" />
                  <span>{achieve}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const pinRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const trackX = useTransform(scrollYProgress, [0, 1], ["0%", `-${(n - 1) * 100}%`]);
  const progressBar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative z-10">
      {/* Header */}
      <div className="relative py-28 pb-10 px-4 sm:px-6 lg:px-12 overflow-hidden">
        <div
          aria-hidden
          className="absolute top-1/3 right-[6%] w-72 h-72 rounded-full bg-[#186e4f]/15 blur-[110px] pointer-events-none"
        />
        <div className="relative max-w-7xl mx-auto flex flex-col items-start text-left">
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
            className="font-display text-5xl md:text-7xl font-bold tracking-tight text-[#fffdec]"
          >
            Where I&apos;ve <span className="text-gradient-accent">crafted.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-xs sm:text-sm font-mono text-[#fffdec]/40 uppercase tracking-wide"
          >
            Scroll to move through the timeline
          </motion.p>
        </div>
      </div>

      {/* Pinned horizontal slider */}
      <div ref={pinRef} className="relative" style={{ height: `${n * 100}svh` }}>
        <div className="sticky top-0 h-[100svh] overflow-hidden" style={{ perspective: 1600 }}>
          {/* Ambient glows */}
          <div
            aria-hidden
            className="absolute bottom-1/4 left-[4%] w-72 h-72 rounded-full bg-[#e1e440]/10 blur-[110px] pointer-events-none"
          />

          <motion.div
            style={{ x: trackX, transformStyle: "preserve-3d" }}
            className="relative h-full flex"
            data-panels={n}
          >
            {experiences.map((item, index) => (
              <ExperiencePanel key={item.id} item={item} index={index} progress={scrollYProgress} />
            ))}
          </motion.div>

          {/* Progress UI */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 w-[min(90vw,320px)]">
            <div className="w-full h-[3px] rounded-full bg-[#fffdec]/10 overflow-hidden">
              <motion.div
                style={{ width: progressBar }}
                className="h-full bg-gradient-to-r from-[#186e4f] via-[#e1e440] to-[#e1e440] shadow-[0_0_10px_rgba(225,228,64,0.6)]"
              />
            </div>
            <div className="flex items-center gap-2">
              {experiences.map((item, index) => (
                <ProgressDot key={item.id} index={index} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
