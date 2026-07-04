"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [particles, setParticles] = useState<TrailParticle[]>([]);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let lastSpawn = 0;
    const colors = ["#e1e440", "#186e4f", "#fffdec", "#e1e440"];

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Spawn trailing sparkle particles on move
      const now = Date.now();
      if (now - lastSpawn > 40) {
        lastSpawn = now;
        const newParticle: TrailParticle = {
          id: now + Math.random(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        };

        setParticles((prev) => [...prev.slice(-12), newParticle]);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor-hover]") ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // Clean up particles
  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Trailing Particle Sparkles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-0 left-0 rounded-full blur-[1px] pointer-events-none"
          style={{
            x: p.x,
            y: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            translateX: "-50%",
            translateY: "-50%",
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}

      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[#e1e440]/50 mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 2.2 : 1,
          backgroundColor: isHovered ? "rgba(225, 228, 64, 0.25)" : "rgba(255, 253, 236, 0)",
          borderColor: isHovered ? "rgba(225, 228, 64, 0.9)" : "rgba(24, 110, 79, 0.5)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner Glowing Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[#e1e440] shadow-[0_0_12px_#e1e440]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  );
}
