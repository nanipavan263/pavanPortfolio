"use client";

import { motion } from "framer-motion";
import { ArrowUp, Instagram, Mail, Phone } from "lucide-react";
import portfolioData from "@/content/portfolio.json";

export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative z-10 pt-20 pb-10 border-t border-[#fffdec]/10 bg-[#070d0c]/90 overflow-hidden">
      {/* Marquee matching screenshot 4 */}
      <div className="w-full overflow-hidden py-12 bg-gradient-to-r from-[#e1e440]/10 via-[#186e4f]/20 to-[#e1e440]/10 border-y border-[#fffdec]/5 mb-16 select-none">
        <div className="whitespace-nowrap flex animate-marquee items-center gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-12 text-4xl sm:text-7xl font-display font-bold tracking-tight text-[#fffdec]/20 uppercase">
              <span>Graphic Design</span>
              <span className="w-3 h-3 rounded-full bg-[#fffdec]/20" />
              <span className="text-gradient opacity-100">Color Grading</span>
              <span className="w-3 h-3 rounded-full bg-[#fffdec]/20" />
              <span>AI Workflows</span>
              <span className="w-3 h-3 rounded-full bg-[#fffdec]/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Container matching screenshot 4 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4">
          {/* Bottom Left: Pavan Kalyan & Copyright */}
          <div className="flex flex-col items-start gap-1">
            <h4 className="font-display font-bold text-lg text-[#fffdec] tracking-tight">
              Pavan Kalyan
            </h4>
            <p className="text-xs font-mono text-[#fffdec]/40">
              © 2026 — Crafted with obsession.
            </p>
          </div>

          {/* Bottom Right: Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={`mailto:${portfolioData.socials.email}`}
              className="p-3.5 rounded-full glass hover:bg-[#fffdec]/10 text-[#fffdec]/80 hover:text-[#fffdec] transition-colors border-[#fffdec]/15"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href={`tel:${portfolioData.socials.phone.replace(/\s+/g, "")}`}
              className="p-3.5 rounded-full glass hover:bg-[#fffdec]/10 text-[#fffdec]/80 hover:text-[#fffdec] transition-colors border-[#fffdec]/15"
              aria-label="Phone"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={portfolioData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-full glass hover:bg-[#fffdec]/10 text-[#fffdec]/80 hover:text-[#fffdec] transition-colors border-[#fffdec]/15"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="px-6 py-3 rounded-full bg-[#fffdec] text-[#070d0c] font-space font-bold text-xs hover:bg-[#fffdec]/90 transition-all flex items-center gap-1.5 ml-2"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
