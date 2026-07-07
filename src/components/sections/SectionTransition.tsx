"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Zero-height marker: adds no scroll space of its own. The SVG is absolutely
// positioned (not fixed), so it scrolls with the page like a background layer
// behind the section content, drawing in and fading as it passes through view.
export default function SectionTransition() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: progress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(progress, [0.15, 0.75], [0, 1]);
  const linesOpacity = useTransform(progress, [0.1, 0.35, 0.75, 0.95], [0, 0.55, 0.55, 0]);
  const dotsOpacity = useTransform(progress, [0.55, 0.75], [0, 0.55]);

  return (
    <div className="relative h-0">
      <div ref={wrapperRef} className="absolute left-0 right-0 -top-[40vh] h-[80vh] z-0 pointer-events-none overflow-hidden">
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          style={{ opacity: linesOpacity }}
        >
          <defs>
            <linearGradient id="transitionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffdec" />
              <stop offset="50%" stopColor="#e1e440" />
              <stop offset="100%" stopColor="#fffdec" />
            </linearGradient>
            <linearGradient id="transitionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e1e440" />
              <stop offset="100%" stopColor="#fffdec" />
            </linearGradient>
            <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <motion.path
            d="M 60 120 Q 420 360 720 180 T 1380 480"
            fill="none"
            stroke="url(#transitionGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 10"
            filter="url(#lineGlow)"
            style={{ pathLength }}
          />
          <motion.path
            d="M 120 600 C 480 240 960 720 1560 300"
            fill="none"
            stroke="url(#transitionGradient2)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#lineGlow)"
            style={{ pathLength }}
          />

          <motion.g style={{ opacity: dotsOpacity }}>
            <circle cx="60" cy="120" r="4" fill="#fffdec" filter="url(#lineGlow)" />
            <circle cx="720" cy="180" r="4" fill="#e1e440" filter="url(#lineGlow)" />
            <circle cx="1380" cy="480" r="4" fill="#fffdec" filter="url(#lineGlow)" />
            <circle cx="120" cy="600" r="4" fill="#e1e440" filter="url(#lineGlow)" />
            <circle cx="1560" cy="300" r="4" fill="#fffdec" filter="url(#lineGlow)" />
          </motion.g>
        </motion.svg>
      </div>
    </div>
  );
}
