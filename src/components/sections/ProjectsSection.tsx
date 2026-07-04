"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, ExternalLink, X, Sparkles } from "lucide-react";
import projectsData from "@/content/projects.json";
import { ProjectItem } from "@/types";

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Commercial Ads", "Motion Graphics", "Social Media", "Color Grading"];

  const filteredProjects = projectsData.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-3 py-1 rounded-full glass border-[#fffdec]/10 text-xs font-mono text-[#e1e440] mb-3"
          >
            <Film className="w-3.5 h-3.5" />
            <span>PORTFOLIO SHOWCASE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-3xl sm:text-5xl font-bold tracking-tight text-[#fffdec] mb-8"
          >
            Featured <span className="text-gradient-accent">Work & Projects</span>
          </motion.h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-space font-medium transition-all ${
                  filter === cat
                    ? "bg-gradient-to-r from-[#e1e440] to-[#186e4f] text-[#072e27] shadow-md shadow-[#e1e440]/20"
                    : "glass text-[#fffdec]/70 hover:text-[#fffdec] hover:bg-[#fffdec]/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: ProjectItem) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="glass-strong rounded-3xl overflow-hidden border-[#fffdec]/15 group relative flex flex-col justify-between"
              >
                {/* Thumbnail Header with Play Button */}
                <div className="relative aspect-video w-full overflow-hidden bg-[#fffdec]/5">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#072e27] via-[#072e27]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Play Button Overlay */}
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-[#e1e440]/90 text-[#072e27] flex items-center justify-center shadow-2xl shadow-[#e1e440]/50 scale-90 group-hover:scale-100 transition-all duration-300"
                    aria-label="Preview Project"
                  >
                    <Play className="w-7 h-7 fill-[#072e27] translate-x-0.5" />
                  </button>

                  {/* Client Tag */}
                  {project.client && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass border-[#fffdec]/20 text-[11px] font-mono text-[#fffdec]/90">
                      {project.client}
                    </span>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-space text-2xl font-bold text-[#fffdec] mb-3 group-hover:text-[#e1e440] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[#fffdec]/70 text-sm font-inter leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#fffdec]/10">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-lg bg-[#fffdec]/5 border border-[#fffdec]/10 text-[11px] font-mono text-[#e1e440]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs font-space font-semibold text-[#fffdec]/80 hover:text-[#e1e440] transition-colors"
                    >
                      <span>View Reel</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Video Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-[#072e27]/90 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl glass-strong rounded-3xl overflow-hidden border-[#fffdec]/20 z-10 shadow-2xl"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#fffdec]/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e1e440]" />
                  <h4 className="font-space font-bold text-lg text-[#fffdec]">
                    {selectedProject.title}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full bg-[#fffdec]/10 hover:bg-[#fffdec]/20 text-[#fffdec]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="aspect-video w-full bg-[#072e27] flex items-center justify-center relative">
                {/* Simulated High-Res Video Player Frame */}
                <img
                  src={selectedProject.thumbnail}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#072e27]/60 p-6 text-center">
                  <Play className="w-16 h-16 text-[#e1e440] mb-4 animate-pulse" />
                  <h5 className="font-space font-bold text-xl text-[#fffdec] mb-2">
                    Commercial Video Preview Showcase
                  </h5>
                  <p className="text-[#fffdec]/60 text-xs font-mono max-w-md">
                    High-definition media playback initialized for {selectedProject.client}. Contact Pavan for full uncompressed broadcast files.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
