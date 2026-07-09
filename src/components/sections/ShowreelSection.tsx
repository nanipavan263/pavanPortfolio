"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Smartphone, MonitorPlay, X } from "lucide-react";

interface VideoItem {
  src: string;
  client: string;
  orientation: "landscape" | "portrait";
}

// Orientation was measured directly from each file's actual video track
// dimensions; client name is parsed from the original filename.
const videos: VideoItem[] = [
  { src: "/videos/am-aha-ambiance-reel.mp4", client: "Am Aha", orientation: "landscape" },
  { src: "/videos/am-aha-avakaya-reel.mp4", client: "Am Aha", orientation: "landscape" },
  { src: "/videos/am-aha-teaser.mp4", client: "Am Aha", orientation: "landscape" },
  { src: "/videos/accha-telugu-kitchen-reel.mp4", client: "Accha Telugu", orientation: "portrait" },
  { src: "/videos/am-aha-addiction.mp4", client: "Am Aha", orientation: "portrait" },
  { src: "/videos/am-aha-banquet.mp4", client: "Am Aha", orientation: "portrait" },
  { src: "/videos/am-aha-reel-4.mp4", client: "Am Aha", orientation: "portrait" },
  { src: "/videos/bb-cravings.mp4", client: "Bengaluru Bhavan", orientation: "portrait" },
  { src: "/videos/mars-and-vens-reel-4.mp4", client: "Mars & Vens", orientation: "portrait" },
  { src: "/videos/soma-reel-1.mp4", client: "Soma", orientation: "portrait" },
  { src: "/videos/kosaraju.mp4", client: "KOSARAJU", orientation: "portrait" },
  { src: "/videos/kanuma-avakaya.mp4", client: "KANUMA", orientation: "portrait" },
];

const landscapeVideos = videos.filter((v) => v.orientation === "landscape");
const portraitVideos = videos.filter((v) => v.orientation === "portrait");

function VideoCard({
  video,
  index,
  aspect,
  onOpen,
}: {
  video: VideoItem;
  index: number;
  aspect: "video" | "[9/16]";
  onOpen: (video: VideoItem) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "200px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.08 }}
      onClick={() => onOpen(video)}
      className={`group relative ${
        aspect === "video" ? "aspect-video" : "aspect-[9/16]"
      } rounded-2xl overflow-hidden glass-strong border-[#fffdec]/15 hover:border-[#e1e440]/40 transition-colors duration-300 cursor-pointer`}
    >
      {isInView && (
        <video
          src={video.src}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      )}

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#070d0c] via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute inset-0 ring-0 group-hover:ring-2 ring-[#e1e440]/40 rounded-2xl transition-all duration-300 pointer-events-none"
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 z-10 pointer-events-none">
        <p className="text-xs sm:text-sm font-space font-bold text-[#fffdec] uppercase tracking-wide">
          {video.client}
        </p>
      </div>
    </motion.div>
  );
}

function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070d0c]/90 backdrop-blur-md p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full ${
          video.orientation === "landscape" ? "max-w-4xl aspect-video" : "max-w-sm aspect-[9/16] max-h-[85svh]"
        } rounded-2xl overflow-hidden shadow-2xl bg-black`}
      >
        <video
          src={video.src}
          controls
          autoPlay
          playsInline
          className="w-full h-full object-contain bg-black"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-3 -right-3 sm:top-3 sm:right-3 w-9 h-9 rounded-full bg-[#070d0c] border border-[#fffdec]/20 flex items-center justify-center text-[#fffdec] hover:bg-[#e1e440] hover:text-[#070d0c] hover:border-[#e1e440] transition-colors duration-200 shadow-lg"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="absolute top-3 left-3 z-10">
          <span className="text-[10px] font-mono font-bold text-[#fffdec] uppercase tracking-widest bg-[#070d0c]/70 px-2.5 py-1 rounded-full border border-[#fffdec]/15">
            {video.client}
          </span>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function ShowreelSection() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  return (
    <section id="showreel" className="relative py-28 px-4 sm:px-6 lg:px-12 z-10 overflow-hidden">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute top-1/4 left-[6%] w-72 h-72 rounded-full bg-[#186e4f]/15 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-1/3 right-[6%] w-72 h-72 rounded-full bg-[#e1e440]/8 blur-[120px] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-start text-left mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase mb-3"
          >
            <span className="w-6 h-px bg-[#e1e440]" />
            <span>SHOWREEL</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-4xl sm:text-6xl font-bold tracking-tight text-[#fffdec]"
          >
            Work, <span className="text-gradient-accent">in motion.</span>
          </motion.h2>
        </div>

        {/* Landscape cuts */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase"
          >
            <MonitorPlay className="w-3.5 h-3.5 text-[#e1e440]" />
            <span>Landscape cuts</span>
            <span className="text-[#fffdec]/25">— {landscapeVideos.length}</span>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {landscapeVideos.map((video, idx) => (
              <VideoCard key={video.src} video={video} index={idx} aspect="video" onOpen={setActiveVideo} />
            ))}
          </div>
        </div>

        {/* Portrait cuts */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6 text-xs font-mono tracking-widest text-[#fffdec]/50 uppercase"
          >
            <Smartphone className="w-3.5 h-3.5 text-[#e1e440]" />
            <span>Portrait cuts</span>
            <span className="text-[#fffdec]/25">— {portraitVideos.length}</span>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {portraitVideos.map((video, idx) => (
              <VideoCard key={video.src} video={video} index={idx} aspect="[9/16]" onOpen={setActiveVideo} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
      </AnimatePresence>
    </section>
  );
}
