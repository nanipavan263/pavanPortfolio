"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clapperboard, Film, Sparkles } from "lucide-react";

const badges = [
  { label: "4K DELIVERY", icon: Film, className: "top-[16%] left-[8%]", duration: 5, delay: 0 },
  { label: "COLOR GRADED", icon: Sparkles, className: "bottom-[20%] right-[10%]", duration: 6, delay: 1 },
  { label: "CINEMATIC LOOK", icon: Clapperboard, className: "top-[22%] right-[12%]", duration: 5.5, delay: 0.6 },
];

export default function CinematicPinSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: progress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Reveal curtain: shrinks away from the top to uncover the image
  const curtainScaleY = useTransform(progress, [0, 0.35], [1, 0]);

  // Ken Burns style parallax on the image itself
  const imageScale = useTransform(progress, [0, 1], [1.2, 1]);
  const imageY = useTransform(progress, [0, 1], [0, -80]);

  // Overlay intensifies slightly as you scroll deeper
  const overlayOpacity = useTransform(progress, [0, 0.5, 1], [0.55, 0.4, 0.65]);

  // Text block: fades in after the curtain lifts, drifts up, fades out near the end
  const textOpacity = useTransform(progress, [0.15, 0.32, 0.75, 1], [0, 1, 1, 0]);
  const textY = useTransform(progress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="relative h-[160vh] sm:h-[200vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Background image with parallax zoom/drift */}
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1666728451779-85c0bc53d2ef?auto=format&fit=crop&w=1600&q=80"
            alt="Video editing timeline on a computer screen"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Green brand overlay tint */}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-[#070d0c] via-[#186e4f] to-[#070d0c] mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070d0c] via-transparent to-[#070d0c]/60" />

        {/* Floating accent badges */}
        {badges.map((b) => {
          const Icon = b.icon;
          return (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: b.delay * 0.2 }}
              className={`absolute ${b.className} hidden sm:flex`}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-strong border-[#fffdec]/20"
              >
                <Icon className="w-3.5 h-3.5 text-[#e1e440]" />
                <span className="text-[11px] font-space font-bold text-[#fffdec]/90 tracking-wide">
                  {b.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Reveal curtain, wipes upward to uncover the scene */}
        <motion.div
          style={{ scaleY: curtainScaleY, transformOrigin: "top" }}
          className="absolute inset-0 bg-[#070d0c] z-10"
        />

        {/* Center text content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-[#fffdec]/15 text-[10px] sm:text-xs font-mono tracking-widest text-[#fffdec]/80 mb-6">
            BEHIND THE FRAME
          </span>
          <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-[#fffdec] tracking-tight leading-[0.95] max-w-4xl">
            Where raw footage becomes{" "}
            <span className="text-gradient-accent">a story worth watching.</span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-[#fffdec]/70 font-inter max-w-xl">
            Every cut, grade, and transition is shaped with intent — built to hold attention
            and move brands forward.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
