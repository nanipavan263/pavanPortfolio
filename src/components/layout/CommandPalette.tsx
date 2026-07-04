"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Film, Briefcase, User, Mail, FileText, Sparkles, X, ChevronRight } from "lucide-react";
import navItems from "@/content/navigation.json";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from parent or window event
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const actions = [
    { id: "about", title: "Go to About", icon: User, action: () => scrollTo("#about") },
    { id: "experience", title: "Go to Experience", icon: Briefcase, action: () => scrollTo("#experience") },
    { id: "services", title: "Go to Services", icon: Sparkles, action: () => scrollTo("#services") },
    { id: "skills", title: "Go to Skills", icon: Film, action: () => scrollTo("#skills") },
    { id: "projects", title: "Go to Projects", icon: Film, action: () => scrollTo("#projects") },
    { id: "resume", title: "Download Resume", icon: FileText, action: () => window.open("/resume.pdf", "_blank") },
    { id: "contact", title: "Send Email", icon: Mail, action: () => window.open("mailto:nanipavan263@gmail.com") },
  ];

  const filteredActions = actions.filter((act) =>
    act.title.toLowerCase().includes(query.toLowerCase())
  );

  const scrollTo = (href: string) => {
    onClose();
    const element = document.getElementById(href.substring(1));
    if (element) {
      if (window.__lenis) window.__lenis.scrollTo(element, { offset: -80 });
      else element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#072e27]/80 backdrop-blur-md"
          />

          {/* Dialog Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl glass-strong rounded-3xl overflow-hidden shadow-2xl border-[#fffdec]/20 z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-6 py-4 border-b border-[#fffdec]/10 gap-3">
              <Search className="w-5 h-5 text-[#e1e440]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="w-full bg-transparent text-[#fffdec] placeholder-[#fffdec]/40 focus:outline-none font-inter text-base"
                autoFocus
              />
              <button onClick={onClose} className="p-1 rounded-lg text-[#fffdec]/50 hover:text-[#fffdec]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Command Action List */}
            <div className="max-h-80 overflow-y-auto p-3 flex flex-col gap-1">
              {filteredActions.length === 0 ? (
                <div className="p-6 text-center text-[#fffdec]/40 text-sm">No commands found.</div>
              ) : (
                filteredActions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-2xl hover:bg-[#fffdec]/10 text-left transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-[#fffdec]/5 group-hover:bg-[#e1e440]/20 text-[#fffdec]/70 group-hover:text-[#e1e440] transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium text-[#fffdec]/90 group-hover:text-[#fffdec]">
                          {item.title}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#fffdec]/30 group-hover:text-[#fffdec]/70 transition-transform group-hover:translate-x-1" />
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer info */}
            <div className="px-6 py-3 bg-[#fffdec]/5 border-t border-[#fffdec]/5 flex justify-between items-center text-xs text-[#fffdec]/40 font-mono">
              <span>Navigation Shortcuts</span>
              <span>ESC to exit</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
