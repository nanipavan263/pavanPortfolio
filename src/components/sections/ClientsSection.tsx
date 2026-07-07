"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkles, MousePointerClick } from "lucide-react";
import FallingText from "@/components/ui/FallingText";

// Multi-word client names are joined with a non-breaking space so FallingText
// (which splits on " ") treats each client as a single falling word/body.
const clients = [
  "Shadab",
  "Telusa",
  "AAA",
  "Accha Telugu",
  "Advaya",
  "Aenugu",
  "Aiwan E Khan",
  "Am Aha",
  "Bengaluru Bhavan",
  "Brunit",
  "Dusk",
  "Cravery",
  "Flavours of Andhra",
  "Hanok",
  "Inframyte",
  "Ishtaa",
  "Itihaas",
  "Kanuma",
  "Kosaraju",
  "Makau",
  "Mordern Muse",
  "Nebesa",
  "Sanctury",
  "Soma",
  "TCT",
  "Vaikuntapuram",
  "Zen",
];

const highlightWords = ["AAA", "TCT", "Zen", "Soma", "Kanuma", "Ishtaa", "Cravery", "Dusk", "Itihaas"];

// FallingText splits its text on a plain space to decide where one falling "word"
// body ends — swap internal spaces for a non-breaking space so multi-word client
// names (e.g. "Accha Telugu") fall as a single piece instead of splitting apart.
const fallingClientsText = clients.map((name) => name.replace(/ /g, " ")).join(" ");

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const badgeOffsetX = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const badgeOffsetY = useTransform(smoothMouseY, [-0.5, 0.5], [-14, 14]);
  const badgeOffsetX2 = useTransform(smoothMouseX, [-0.5, 0.5], [16, -16]);
  const badgeOffsetY2 = useTransform(smoothMouseY, [-0.5, 0.5], [10, -10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-12 z-20 overflow-hidden"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden
        className="absolute top-1/4 left-[8%] w-64 h-64 rounded-full bg-[#186e4f]/20 blur-[100px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 right-[8%] w-64 h-64 rounded-full bg-[#e1e440]/10 blur-[100px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase mb-3"
          >
            <span className="w-6 h-px bg-[#e1e440]" />
            <span>Trusted By</span>
            <span className="w-6 h-px bg-[#e1e440]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-4xl sm:text-6xl font-bold tracking-tight text-[#fffdec] text-center"
          >
            Brands that trusted <span className="text-gradient-accent">the edit.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 flex items-center gap-2 text-xs sm:text-sm font-mono text-[#fffdec]/40 uppercase tracking-wide"
          >
            <MousePointerClick className="w-3.5 h-3.5 text-[#e1e440]" />
            Hover the names below and watch them fall
          </motion.p>
        </div>

        {/* Falling client names */}
        <div className="relative h-[440px] sm:h-[520px] lg:h-[560px]">
          <FallingText
            className="w-full h-full"
            text={fallingClientsText}
            highlightWords={highlightWords}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="clamp(1.15rem, 2.6vw, 2.1rem)"
            mouseConstraintStiffness={0.9}
          />

          {/* Floating parallax suffix badges */}
          <motion.div
            style={{ x: badgeOffsetX, y: badgeOffsetY }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-2 right-2 sm:top-4 sm:right-6 z-30 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-strong border-[#fffdec]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#e1e440]" />
              <span className="text-xs font-space font-extrabold text-[#fffdec]">
                {clients.length}
                <span className="text-[#e1e440]">+</span>
              </span>
              <span className="text-[10px] font-mono text-[#fffdec]/50 uppercase tracking-wide">
                Clients
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ x: badgeOffsetX2, y: badgeOffsetY2 }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute bottom-2 left-2 sm:bottom-4 sm:left-6 z-30 pointer-events-none hidden sm:block"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-strong border-[#fffdec]/20"
            >
              <span className="text-[10px] font-mono text-[#fffdec]/50 uppercase tracking-wide">
                And counting
              </span>
              <span className="text-xs font-space font-extrabold text-[#e1e440]">&hellip;</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
