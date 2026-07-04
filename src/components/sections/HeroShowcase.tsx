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
import { LucideIcon, Film, Sparkles, Palette, ImageIcon, PenTool, Cpu } from "lucide-react";
import statsData from "@/content/stats.json";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

interface ToolSpec {
  label: string;
  icon: LucideIcon;
  top: number;
  left: number;
  depth: number;
  duration: number;
  delay: number;
}

const tools: ToolSpec[] = [
  { label: "Premiere Pro", icon: Film, top: 20, left: 12, depth: 0.5, duration: 4.2, delay: 0 },
  { label: "After Effects", icon: Sparkles, top: 16, left: 68, depth: 0.9, duration: 5, delay: 0.6 },
  { label: "DaVinci Resolve", icon: Palette, top: 44, left: 84, depth: 0.7, duration: 4.6, delay: 1.2 },
  { label: "Photoshop", icon: ImageIcon, top: 54, left: 4, depth: 1.1, duration: 5.4, delay: 0.3 },
  { label: "Illustrator", icon: PenTool, top: 76, left: 76, depth: 0.6, duration: 3.8, delay: 1.8 },
  { label: "AI Workflows", icon: Cpu, top: 96, left: 32, depth: 1.0, duration: 4.8, delay: 0.9 },
];

interface StatSpec {
  id: string;
  label: string;
  value: number;
  suffix: string;
  top: number;
  left: number;
  depth: number;
}

const statPositions: Omit<StatSpec, "id" | "label" | "value" | "suffix">[] = [
  { top: 30, left: 42, depth: 0.8 },
  { top: 60, left: 48, depth: 1.3 },
  { top: 88, left: 10, depth: 0.5 },
  { top: 68, left: 90, depth: 1.1 },
];

const stats: StatSpec[] = statsData.map((s, idx) => ({ ...s, ...statPositions[idx] }));

function FloatingTool({
  tool,
  progress,
  mouseX,
  mouseY,
}: {
  tool: ToolSpec;
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const Icon = tool.icon;
  const parallaxY = useTransform(progress, [0, 1], [0, -160 * tool.depth]);
  const mouseOffsetX = useTransform(mouseX, [-0.5, 0.5], [-16 * tool.depth, 16 * tool.depth]);
  const mouseOffsetY = useTransform(mouseY, [-0.5, 0.5], [-16 * tool.depth, 16 * tool.depth]);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 hidden sm:block"
      style={{ top: `${tool.top}%`, left: `${tool.left}%` }}
    >
      <motion.div style={{ y: parallaxY, x: mouseOffsetX }}>
        <motion.div style={{ y: mouseOffsetY }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: tool.delay * 0.25 }}
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
              transition={{
                duration: tool.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: tool.delay,
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-2xl glass-strong border-[#fffdec]/20 cursor-default"
            >
              <div className="p-1.5 rounded-xl bg-[#e1e440]/20 text-[#e1e440]">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-space font-bold text-[#fffdec]/90 whitespace-nowrap">
                {tool.label}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FloatingStat({
  stat,
  progress,
  mouseX,
  mouseY,
}: {
  stat: StatSpec;
  progress: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  const parallaxY = useTransform(progress, [0, 1], [0, -200 * stat.depth]);
  const mouseOffsetX = useTransform(mouseX, [-0.5, 0.5], [-10 * stat.depth, 10 * stat.depth]);
  // Scroll-linked reveal: numbers fade/scale in as the hero scrolls, distinct from the tools' constant float
  const revealOpacity = useTransform(progress, [0, 0.18, 0.4], [0, 1, 1]);
  const revealScale = useTransform(progress, [0, 0.18], [0.6, 1]);

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
      style={{ top: `${stat.top}%`, left: `${stat.left}%` }}
    >
      <motion.div style={{ y: parallaxY, x: mouseOffsetX, opacity: revealOpacity, scale: revealScale }}>
        <span className="block font-space font-extrabold text-3xl sm:text-4xl text-[#fffdec] tracking-tight">
          <AnimatedCounter value={stat.value} />
          <span className="text-[#e1e440]">{stat.suffix}</span>
        </span>
        <span className="block text-[9px] sm:text-[10px] font-mono tracking-wide text-[#fffdec]/50 uppercase whitespace-nowrap">
          {stat.label}
        </span>
      </motion.div>
    </div>
  );
}

export default function HeroShowcase() {
  const canvasRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const { scrollYProgress: progress } = useScroll({
    target: canvasRef,
    offset: ["start end", "end start"],
  });

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
      className="relative w-full max-w-xl mx-auto mt-8 sm:mt-14 lg:mt-20 h-[420px] sm:h-[520px] lg:h-[600px]"
    >
      {/* Ambient pulsing glow */}
      <motion.div
        aria-hidden
        className="absolute inset-0 m-auto w-2/3 h-2/3 rounded-full bg-gradient-to-br from-[#e1e440]/20 via-[#186e4f]/20 to-transparent blur-3xl -z-10"
        animate={{ opacity: [0.5, 0.85, 0.5], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {tools.map((tool) => (
        <FloatingTool key={tool.label} tool={tool} progress={progress} mouseX={smoothMouseX} mouseY={smoothMouseY} />
      ))}

      {stats.map((stat) => (
        <FloatingStat key={stat.id} stat={stat} progress={progress} mouseX={smoothMouseX} mouseY={smoothMouseY} />
      ))}
    </div>
  );
}
