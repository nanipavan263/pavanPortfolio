"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Tight spring for the core marker
  const coreX = useSpring(cursorX, { damping: 30, stiffness: 500 });
  const coreY = useSpring(cursorY, { damping: 30, stiffness: 500 });

  // Looser spring for the trailing rings
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 220 });
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 220 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Ambient sonar ping, pulses outward continuously */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-[#e1e440]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{ scale: [1, 2.2], opacity: [0.45, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Slow rotating dashed ring, like a render/loading indicator */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full border border-dashed border-[#fffdec]/40"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          rotate: 360,
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.5 : 1,
        }}
        transition={{
          rotate: { duration: 7, repeat: Infinity, ease: "linear" },
          opacity: { duration: 0.25 },
          scale: { duration: 0.25 },
        }}
      />

      {/* Core marker: a dot that morphs into a play glyph on hover */}
      <motion.div
        className="fixed top-0 left-0 flex items-center justify-center"
        style={{ x: coreX, y: coreY, translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence mode="wait">
          {isHovered ? (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
            >
              <Play className="w-3.5 h-3.5 fill-[#e1e440] text-[#e1e440]" />
            </motion.div>
          ) : (
            <motion.div
              key="dot"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 22 }}
              className="w-1.5 h-1.5 rounded-full bg-[#e1e440]"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
