"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-[#072e27] flex flex-col items-center justify-center pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1.05, 1], opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center"
      >
        {/* Monogram Badge */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-[#186e4f] via-[#e1e440] to-[#fffdec] p-[2px] shadow-2xl shadow-[#186e4f]/30">
          <div className="w-full h-full bg-[#072e27] rounded-[22px] flex items-center justify-center">
            <span className="font-space font-extrabold text-3xl bg-gradient-to-r from-[#fffdec] via-[#e1e440] to-[#186e4f] bg-clip-text text-transparent tracking-tighter">
              PK
            </span>
          </div>
        </div>

        {/* Shimmer Progress Line */}
        <div className="w-48 h-1 bg-[#fffdec]/10 rounded-full mt-8 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="w-full h-full bg-gradient-to-r from-[#186e4f] via-[#e1e440] to-[#fffdec]"
          />
        </div>

        <p className="font-space text-xs tracking-[0.3em] uppercase text-[#fffdec]/40 mt-4">
          Loading Portfolio
        </p>
      </motion.div>
    </motion.div>
  );
}
