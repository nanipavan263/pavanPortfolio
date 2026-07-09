"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkles } from "lucide-react";

interface Client {
  name: string;
  featured?: boolean;
}

const clients: Client[] = [
  { name: "Shadab" },
  { name: "Telusa" },
  { name: "AAA", featured: true },
  { name: "Accha Telugu" },
  { name: "Advaya" },
  { name: "Aenugu" },
  { name: "Aiwan E Khan" },
  { name: "Am Aha" },
  { name: "Bengaluru Bhavan" },
  { name: "Brunit" },
  { name: "Dusk", featured: true },
  { name: "Cravery", featured: true },
  { name: "Flavours of Andhra" },
  { name: "Hanok" },
  { name: "Inframyte" },
  { name: "Ishtaa", featured: true },
  { name: "Itihaas", featured: true },
  { name: "Kanuma", featured: true },
  { name: "Kosaraju" },
  { name: "Makau" },
  { name: "Mordern Muse" },
  { name: "Nebesa" },
  { name: "Sanctury" },
  { name: "Soma", featured: true },
  { name: "TCT", featured: true },
  { name: "Vaikuntapuram" },
  { name: "Zen", featured: true },
];

// A hand-picked span pattern so the grid reads as a bento mosaic rather than
// a flat uniform grid — featured clients get more room, others stay compact.
const spanPattern = ["col-span-2", "", "", "", "col-span-2", "", "", ""];

const tiltPattern = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5];

export default function ClientsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const badgeOffsetX = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const badgeOffsetY = useTransform(smoothMouseY, [-0.5, 0.5], [-14, 14]);

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
        <div className="relative flex flex-col items-center text-center mb-14 sm:mb-16">
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
            className="mt-4 text-xs sm:text-sm font-mono text-[#fffdec]/40 uppercase tracking-wide"
          >
            {clients.length}+ brands, one signature style
          </motion.p>

          {/* Floating parallax suffix badge */}
          <motion.div
            style={{ x: badgeOffsetX, y: badgeOffsetY }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute -top-2 right-0 z-30 pointer-events-none hidden sm:block"
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
        </div>

        {/* Bento mosaic of client cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-fr">
          {clients.map((client, idx) => {
            const span = spanPattern[idx % spanPattern.length];
            const tilt = tiltPattern[idx % tiltPattern.length];

            return (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 24, rotate: tilt * 2, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, rotate: tilt, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 9) * 0.05, ease: "easeOut" }}
                whileHover={{ rotate: 0, scale: 1.04, y: -4 }}
                className={`group relative flex items-center justify-center text-center px-4 py-6 sm:py-7 rounded-2xl border transition-colors duration-300 cursor-default ${span} ${
                  client.featured
                    ? "glass-strong border-[#e1e440]/30 hover:border-[#e1e440]/60"
                    : "glass border-[#fffdec]/10 hover:border-[#fffdec]/25"
                }`}
              >
                <span
                  aria-hidden
                  className="absolute top-2.5 left-3 text-[9px] font-mono text-[#fffdec]/25 tracking-widest"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {client.featured && (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-2xl bg-[#e1e440]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                )}

                <span
                  className={`relative font-space font-bold tracking-tight leading-snug ${
                    client.featured
                      ? "text-lg sm:text-2xl text-[#e1e440] group-hover:text-[#fffdec]"
                      : "text-sm sm:text-base text-[#fffdec]/80 group-hover:text-[#fffdec]"
                  } transition-colors duration-300`}
                >
                  {client.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
