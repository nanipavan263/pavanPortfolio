"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedCounter({ value, duration = 1.8 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const currentCount = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      setCount(currentCount);

      if (frame === totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function StatsSection() {
  const stats = [
    { label: "YEARS EXPERIENCE", value: 2, suffix: "+" },
    { label: "CLIENTS SERVED", value: 50, suffix: "+" },
    { label: "CREATIVES DELIVERED", value: 100, suffix: "+" },
    { label: "BRANDS WORKED WITH", value: 15, suffix: "+" },
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-12 z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-strong rounded-3xl p-8 sm:p-12 border-[#fffdec]/15 shadow-2xl backdrop-blur-3xl"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-[#fffdec]/10">
            {stats.map((stat, idx) => (
              <div key={stat.label} className={`flex flex-col items-center ${idx !== 0 ? "pt-6 lg:pt-0" : ""}`}>
                <div className="font-space font-extrabold text-4xl sm:text-6xl text-[#fffdec] mb-2 tracking-tight">
                  <AnimatedCounter value={stat.value} />
                  <span className="text-[#e1e440] ml-1">{stat.suffix}</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
