"use client";

import { motion } from "framer-motion";
import { ArrowUp, Instagram, Mail, Phone, MapPin, Sparkles } from "lucide-react";
import portfolioData from "@/content/portfolio.json";

export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const marqueeText = "MOTION GRAPHICS • COMMERCIAL ADS • COLOR GRADING • AI CREATIVE WORKFLOWS • STORYTELLING • ";

  return (
    <footer className="relative z-10 pt-20 pb-10 border-t border-[#fffdec]/10 bg-[#070d0c]/90 overflow-hidden">
      {/* Infinite Scrolling Marquee */}
      <div className="w-full overflow-hidden py-6 bg-gradient-to-r from-[#186e4f]/20 via-[#e1e440]/10 to-[#186e4f]/20 border-y border-[#fffdec]/5 mb-16">
        <div className="whitespace-nowrap flex animate-marquee">
          <span className="font-space font-bold text-lg md:text-2xl tracking-widest text-[#fffdec]/30 uppercase pr-8">
            {marqueeText.repeat(4)}
          </span>
          <span className="font-space font-bold text-lg md:text-2xl tracking-widest text-[#fffdec]/30 uppercase pr-8">
            {marqueeText.repeat(4)}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#fffdec]/10">
          {/* Left Monogram & Bio */}
          <div className="md:col-span-6 flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#186e4f] to-[#e1e440] flex items-center justify-center font-space font-extrabold text-sm tracking-tighter text-[#070d0c] shadow-lg shadow-[#e1e440]/20">
                PK
              </div>
              <span className="font-space font-bold text-xl tracking-tight text-[#fffdec]">
                PAVAN KALYAN
              </span>
            </div>
            <p className="text-[#fffdec]/60 text-sm leading-relaxed max-w-md">
              {portfolioData.bio}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#e1e440]/80 mt-2 bg-[#e1e440]/10 px-3 py-1.5 rounded-full border border-[#e1e440]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Available for Freelance & Full-time Roles</span>
            </div>
          </div>

          {/* Quick Contact & Links */}
          <div className="md:col-span-6 flex flex-col md:items-end justify-between gap-6">
            <div className="flex flex-wrap gap-4">
              <a
                href={portfolioData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-2xl glass hover:bg-[#fffdec]/10 text-[#fffdec]/70 hover:text-[#e1e440] transition-colors flex items-center gap-2 text-xs font-medium"
              >
                <Instagram className="w-4 h-4" />
                <span>@pavannanifx</span>
              </a>
              <a
                href={`mailto:${portfolioData.socials.email}`}
                className="p-3 rounded-2xl glass hover:bg-[#fffdec]/10 text-[#fffdec]/70 hover:text-[#e1e440] transition-colors flex items-center gap-2 text-xs font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>{portfolioData.socials.email}</span>
              </a>
            </div>

            <div className="flex items-center gap-6 text-xs text-[#fffdec]/40">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#e1e440]" />
                <span>{portfolioData.socials.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#186e4f]" />
                <span>{portfolioData.socials.phone}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#fffdec]/40 font-mono">
          <p>© {new Date().getFullYear()} Pavan Kalyan. Crafted with Next.js 15 & Framer Motion.</p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full glass hover:bg-[#fffdec]/10 text-[#fffdec]/80 hover:text-[#fffdec] transition-all group"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
