"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Mail, Instagram, Sparkles } from "lucide-react";
import portfolioData from "@/content/portfolio.json";
import HeroShowcase from "./HeroShowcase";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Draw on scroll SVG path length transform
  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.4]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      if (window.__lenis) window.__lenis.scrollTo(contactEl, { offset: -80 });
      else contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 pt-32 pb-20 overflow-hidden z-10"
    >
      {/* Dynamic Draw-on-Scroll SVG Constellation Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-30">
        <motion.path
          d="M 50 100 Q 350 300 600 150 T 1200 400"
          fill="none"
          stroke="url(#heroGradient)"
          strokeWidth="2"
          strokeDasharray="8 8"
          style={{ pathLength }}
        />
        <motion.path
          d="M 100 500 C 400 200 800 600 1300 250"
          fill="none"
          stroke="url(#heroGradient2)"
          strokeWidth="1.5"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e1e440" />
            <stop offset="50%" stopColor="#186e4f" />
            <stop offset="100%" stopColor="#070d0c" />
          </linearGradient>
          <linearGradient id="heroGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#186e4f" />
            <stop offset="100%" stopColor="#e1e440" />
          </linearGradient>
        </defs>
      </svg>

      <motion.div style={{ opacity }} className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Availability Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-[#fffdec]/10 text-[10px] sm:text-xs font-mono tracking-widest text-[#fffdec]/80 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#186e4f] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#186e4f] -ml-4" />
            <span className="uppercase">AVAILABLE FOR FREELANCE & FULL-TIME OPPORTUNITIES</span>
          </motion.div>

          {/* Headline Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-bold text-5xl sm:text-7xl lg:text-8xl text-[#fffdec] tracking-tight leading-[0.95] mb-6 select-none"
          >
            Pavan <br /> Kalyan.
          </motion.h1>

          {/* Subtitle with Star */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-2 text-base sm:text-lg font-space font-semibold text-[#e1e440] mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#e1e440] shrink-0" />
            <span>Video Editor & Motion Graphics Designer</span>
          </motion.div>

          {/* Bio Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm sm:text-base text-[#fffdec]/65 font-inter leading-relaxed max-w-xl mb-10"
          >
            Crafting cinematic stories that move brands forward. Creative Video Editor and Motion Graphics Designer with 2+ years of experience creating engaging content for brands and digital platforms. Skilled in video editing, storytelling, motion graphics, color grading, and AI-powered creative workflows.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-16"
          >
            <a
              href="#contact"
              onClick={scrollToContact}
              className="px-7 py-3.5 rounded-full bg-[#fffdec] text-[#070d0c] font-space font-bold text-xs sm:text-sm hover:bg-[#fffdec]/90 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 group"
            >
              <span>Let&apos;s work together</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href={portfolioData.hero.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full glass font-space font-semibold text-xs sm:text-sm text-[#fffdec] hover:bg-[#fffdec]/10 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center gap-2 border-[#fffdec]/15"
            >
              <Download className="w-4 h-4 text-[#e1e440]" />
              <span>Download Resume</span>
            </a>

            <a
              href={`mailto:${portfolioData.socials.email}`}
              className="p-3.5 rounded-full glass hover:bg-[#fffdec]/10 text-[#fffdec]/80 hover:text-[#fffdec] hover:scale-110 transition-all border-[#fffdec]/15"
              aria-label="Email Pavan"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={portfolioData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full glass hover:bg-[#fffdec]/10 text-[#fffdec]/80 hover:text-[#fffdec] hover:scale-110 transition-all border-[#fffdec]/15"
              aria-label="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Bottom Ribbon */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-4 text-[10px] sm:text-xs font-mono tracking-widest text-[#fffdec]/40 uppercase"
          >
            <span>BASED IN HYDERABAD, TELANGANA, INDIA</span>
            <span className="w-8 h-px bg-[#fffdec]/20" />
            <span>OPEN TO REMOTE</span>
          </motion.div>
        </div>

        {/* Right Column: Software Showcase & Impact Numbers */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <HeroShowcase />
        </div>
      </motion.div>
    </section>
  );
}
