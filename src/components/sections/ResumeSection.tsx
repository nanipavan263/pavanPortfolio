"use client";

import { motion } from "framer-motion";
import { FileText, Download, ExternalLink, Sparkles, CheckCircle2 } from "lucide-react";
import portfolioData from "@/content/portfolio.json";

export default function ResumeSection() {
  const features = [
    "Comprehensive Work Experience (2+ Years)",
    "Diploma in Animation & Multimedia + Engineering",
    "Detailed Toolstack & Creative Competencies",
    "Verified Client & Agency Track Record",
  ];

  return (
    <section id="resume" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-8 sm:p-12 border-[#fffdec]/20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Ambient Lighting Gradient */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#e1e440]/20 via-[#186e4f]/10 to-transparent rounded-bl-full pointer-events-none" />

          {/* Left Description */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-[#fffdec]/10 text-xs font-mono text-[#e1e440] mb-4">
              <FileText className="w-3.5 h-3.5" />
              <span>CURRICULUM VITAE</span>
            </div>
            <h2 className="font-space text-3xl sm:text-5xl font-bold text-[#fffdec] mb-6 tracking-tight">
              Looking for a <span className="text-gradient-accent">Detailed Resume?</span>
            </h2>
            <p className="text-[#fffdec]/70 text-base font-inter leading-relaxed mb-8">
              Download Pavan Kalyan&apos;s complete official resume for an in-depth breakdown of his technical workflow, agency roles, client projects, and academic background.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {features.map((item) => (
                <div key={item} className="flex items-center gap-2.5 text-xs text-[#fffdec]/80 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-[#e1e440] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={portfolioData.hero.resumeUrl}
                download="Pavan_Kalyan_Resume.pdf"
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#e1e440] via-[#186e4f] to-[#fffdec] font-space font-semibold text-sm text-[#072e27] shadow-xl shadow-[#e1e440]/25 hover:shadow-[#e1e440]/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Resume</span>
              </a>

              <a
                href={portfolioData.hero.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl glass font-space font-semibold text-sm text-[#fffdec]/90 hover:text-[#fffdec] hover:bg-[#fffdec]/10 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 border-[#fffdec]/15"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-4 h-4 text-[#e1e440]" />
              </a>
            </div>
          </div>

          {/* Right Preview Box mockup */}
          <div className="w-full lg:w-96 aspect-[3/4] glass rounded-2xl border-[#fffdec]/15 p-6 flex flex-col justify-between relative group shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#fffdec]/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#e1e440] text-[#072e27] flex items-center justify-center font-space font-bold text-xs">
                  PK
                </div>
                <span className="font-space text-xs font-bold text-[#fffdec]">PAVAN KALYAN</span>
              </div>
              <Sparkles className="w-4 h-4 text-[#e1e440]" />
            </div>

            <div className="space-y-3 py-4 text-xs text-[#fffdec]/50 font-mono">
              <div className="p-3 rounded-xl bg-[#fffdec]/5 border border-[#fffdec]/5">
                <p className="text-[#e1e440] font-bold">Video Editor & Motion Graphics</p>
                <p className="text-[10px]">2+ Years Experience</p>
              </div>
              <div className="p-3 rounded-xl bg-[#fffdec]/5 border border-[#fffdec]/5">
                <p className="text-[#fffdec] font-semibold">The Vivid View • BIG TV • Grid Agency</p>
              </div>
              <div className="p-3 rounded-xl bg-[#fffdec]/5 border border-[#fffdec]/5">
                <p className="text-[#fffdec] font-semibold">Premiere Pro • After Effects • DaVinci</p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#fffdec]/10 text-center">
              <span className="text-[11px] font-mono text-[#e1e440] uppercase tracking-widest">
                Official PDF Document
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
