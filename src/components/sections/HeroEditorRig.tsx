"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Play,
  Film,
  Sparkles,
  Palette,
  Cpu,
  Scissors,
  Wand2,
  Layers,
  Clapperboard,
} from "lucide-react";

interface BadgeSpec {
  label: string;
  icon: typeof Film;
  top: number;
  left: number;
  depth: number;
  duration: number;
  delay: number;
}

const badges: BadgeSpec[] = [
  { label: "Premiere Pro", icon: Film, top: 4, left: 6, depth: 0.5, duration: 4.2, delay: 0 },
  { label: "After Effects", icon: Sparkles, top: 8, left: 78, depth: 0.9, duration: 5, delay: 0.6 },
  { label: "DaVinci Resolve", icon: Palette, top: 92, left: 82, depth: 0.7, duration: 4.6, delay: 1.2 },
  { label: "AI Workflows", icon: Cpu, top: 88, left: 2, depth: 1.0, duration: 4.8, delay: 0.9 },
];

const timelineClips = [
  { track: 0, left: 4, width: 22, color: "#e1e440" },
  { track: 0, left: 30, width: 34, color: "#186e4f" },
  { track: 0, left: 68, width: 26, color: "#e1e440" },
  { track: 1, left: 10, width: 40, color: "#fffdec" },
  { track: 1, left: 54, width: 30, color: "#186e4f" },
];

const waveformBars = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  base: 20 + Math.abs(Math.sin(i * 0.7)) * 70,
  duration: 0.9 + (i % 5) * 0.15,
}));

function FloatingBadge({
  badge,
  progress,
  mouseX,
  mouseY,
}: {
  badge: BadgeSpec;
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const Icon = badge.icon;
  const parallaxY = useTransform(progress, [0, 1], [0, -120 * badge.depth]);
  const mouseOffsetX = useTransform(mouseX, [-0.5, 0.5], [-18 * badge.depth, 18 * badge.depth]);
  const mouseOffsetY = useTransform(mouseY, [-0.5, 0.5], [-18 * badge.depth, 18 * badge.depth]);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 hidden sm:block z-20"
      style={{ top: `${badge.top}%`, left: `${badge.left}%` }}
    >
      <motion.div style={{ y: parallaxY, x: mouseOffsetX }}>
        <motion.div style={{ y: mouseOffsetY }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: badge.delay * 0.25 }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              animate={{ y: [0, -10, 0], rotate: [-3, 3, -3] }}
              transition={{ duration: badge.duration, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-strong border-[#fffdec]/20 cursor-default"
            >
              <div className="p-1.5 rounded-xl bg-[#e1e440]/20 text-[#e1e440]">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-space font-bold text-[#fffdec]/90 whitespace-nowrap">
                {badge.label}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroEditorRig() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const { scrollYProgress: progress } = useScroll({
    target: canvasRef,
    offset: ["start end", "end start"],
  });

  const cardTiltX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const cardTiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);
  const playheadX = useTransform(progress, [0, 1], ["4%", "88%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto mt-8 sm:mt-14 lg:mt-20 h-[440px] sm:h-[540px] lg:h-[600px]"
      style={{ perspective: 1200 }}
    >
      {/* Ambient pulsing glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 m-auto w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#e1e440]/20 via-[#186e4f]/20 to-transparent blur-3xl -z-10"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Central editor window mock */}
      <motion.div
        style={{ rotateX: cardTiltX, rotateY: cardTiltY }}
        className="absolute inset-x-[6%] sm:inset-x-[10%] top-1/2 -translate-y-1/2 rounded-2xl glass-strong border-[#fffdec]/15 overflow-hidden shadow-2xl"
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#fffdec]/10">
          <span className="w-2.5 h-2.5 rounded-full bg-[#e1e440]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#186e4f]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#fffdec]/30" />
          <span className="ml-2 text-[10px] font-mono text-[#fffdec]/40 tracking-wide">
            final_cut_v3.prproj
          </span>
          <span className="ml-auto flex items-center gap-1 text-[9px] font-mono text-[#e1e440]/80">
            <Clapperboard className="w-3 h-3" /> 4K &bull; 60FPS
          </span>
        </div>

        {/* Preview viewport */}
        <div className="relative aspect-video bg-gradient-to-br from-[#0d1a15] via-[#111f16] to-[#070d0c] overflow-hidden">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-tr from-[#186e4f]/30 via-transparent to-[#e1e440]/10"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.button
            aria-hidden
            whileHover={{ scale: 1.1 }}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 m-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#fffdec]/95 flex items-center justify-center text-[#070d0c] shadow-lg"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          </motion.button>
          <span className="absolute bottom-2 right-3 text-[10px] font-mono text-[#fffdec]/70 bg-[#070d0c]/60 px-1.5 py-0.5 rounded">
            02:34 / 04:12
          </span>
          <span className="absolute top-2 left-3 flex items-center gap-1 text-[9px] font-mono text-[#fffdec]/50">
            <Wand2 className="w-3 h-3 text-[#e1e440]" /> Color graded
          </span>
        </div>

        {/* Waveform strip */}
        <div className="flex items-center gap-[3px] px-4 py-3 h-10 border-t border-[#fffdec]/10">
          {waveformBars.map((bar) => (
            <motion.span
              key={bar.id}
              className="w-[3px] rounded-full bg-gradient-to-t from-[#186e4f] to-[#e1e440]/80"
              style={{ height: `${bar.base}%` }}
              animate={{ scaleY: [0.4, 1, 0.4] }}
              transition={{ duration: bar.duration, repeat: Infinity, ease: "easeInOut", delay: bar.id * 0.03 }}
            />
          ))}
        </div>

        {/* Timeline tracks */}
        <div className="relative px-4 pb-4 pt-2 space-y-2">
          {[0, 1].map((track) => (
            <div key={track} className="relative h-6 rounded-md bg-[#fffdec]/5 overflow-hidden">
              {timelineClips
                .filter((c) => c.track === track)
                .map((clip, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: "easeOut" }}
                    style={{
                      left: `${clip.left}%`,
                      width: `${clip.width}%`,
                      backgroundColor: clip.color,
                      transformOrigin: "left",
                    }}
                    className="absolute top-0.5 bottom-0.5 rounded opacity-80"
                  />
                ))}
            </div>
          ))}

          {/* Playhead sweeping across the timeline, synced to page scroll */}
          <motion.div
            aria-hidden
            style={{ left: playheadX }}
            className="absolute top-1 bottom-1 w-[2px] bg-[#fffdec] shadow-[0_0_8px_rgba(255,253,236,0.8)]"
          />
        </div>

        {/* Bottom status row */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#fffdec]/10 text-[9px] font-mono text-[#fffdec]/40 uppercase tracking-wide">
          <span className="flex items-center gap-1">
            <Scissors className="w-3 h-3 text-[#e1e440]" /> 12 cuts
          </span>
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#e1e440]" /> 6 layers
          </span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-1 text-[#e1e440]"
          >
            Rendering 98%
          </motion.span>
        </div>
      </motion.div>

      {badges.map((badge) => (
        <FloatingBadge key={badge.label} badge={badge} progress={progress} mouseX={smoothMouseX} mouseY={smoothMouseY} />
      ))}
    </div>
  );
}
