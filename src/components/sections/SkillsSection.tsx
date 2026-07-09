"use client";

import { motion } from "framer-motion";
import { Cpu, Film, Palette, Lightbulb, type LucideIcon } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillGroup {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

const skillGroups: SkillGroup[] = [
  {
    title: "Video Editing",
    icon: Film,
    skills: [
      { name: "Adobe Premiere Pro", level: 96 },
      { name: "Story-driven Editing", level: 94 },
      { name: "Multi-cam Pacing", level: 90 },
      { name: "Sound Design & Audio Mix", level: 92 },
    ],
  },
  {
    title: "Motion Graphics & VFX",
    icon: Palette,
    skills: [
      { name: "Adobe After Effects", level: 95 },
      { name: "Kinetic Typography", level: 92 },
      { name: "Logo Stings & Idents", level: 94 },
      { name: "Lower-Thirds & Assets", level: 90 },
    ],
  },
  {
    title: "AI Tools & Workflows",
    icon: Cpu,
    skills: [
      { name: "AI Video Editing", level: 88 },
      { name: "Runway ML", level: 82 },
      { name: "ElevenLabs Voice Synth", level: 78 },
      { name: "Generative B-Roll & VFX", level: 85 },
    ],
  },
  {
    title: "Creative & Soft Skills",
    icon: Lightbulb,
    skills: [
      { name: "Visual Storytelling", level: 95 },
      { name: "DaVinci Color Grading", level: 92 },
      { name: "Client Collaboration", level: 90 },
      { name: "Concept Development", level: 88 },
    ],
  },
];

const SEGMENTS = 16;

function SkillMeter({ skill, delay }: { skill: Skill; delay: number }) {
  const filled = Math.round((skill.level / 100) * SEGMENTS);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-[#fffdec]/80 font-medium">{skill.name}</span>
        <span className="text-[#e1e440] font-bold">{skill.level}%</span>
      </div>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: SEGMENTS }, (_, i) => {
          const isFilled = i < filled;
          const isPeak = i === filled - 1;
          return (
            <motion.span
              key={i}
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: delay + i * 0.02, ease: "easeOut" }}
              className={`h-3 flex-1 rounded-sm origin-bottom ${
                isFilled ? "bg-[#e1e440]" : "bg-[#fffdec]/10"
              }`}
              style={
                isFilled
                  ? {
                      boxShadow: isPeak
                        ? "0 0 8px rgba(225,228,64,0.9)"
                        : "0 0 4px rgba(225,228,64,0.35)",
                    }
                  : undefined
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-12 z-10 overflow-hidden">
      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute top-1/4 right-[6%] w-72 h-72 rounded-full bg-[#e1e440]/8 blur-[120px] pointer-events-none"
      />
      <div
        aria-hidden
        className="absolute bottom-1/4 left-[4%] w-72 h-72 rounded-full bg-[#186e4f]/15 blur-[120px] pointer-events-none"
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
            <span>SKILLS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-4xl sm:text-6xl font-bold tracking-tight text-[#fffdec]"
          >
            Technical <span className="text-gradient-accent">competencies.</span>
          </motion.h2>
        </div>

        {/* Grid of Grouped Skill Cards — segmented meter style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group, groupIdx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
                className="glass-strong rounded-3xl p-8 border-[#fffdec]/15 space-y-6"
              >
                <div className="flex items-center gap-3 border-b border-[#fffdec]/10 pb-4">
                  <div className="p-2.5 rounded-2xl bg-[#e1e440]/10 text-[#e1e440] border border-[#e1e440]/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-space font-bold text-xl text-[#fffdec]">{group.title}</h3>
                </div>

                <div className="space-y-5">
                  {group.skills.map((skill, skillIdx) => (
                    <SkillMeter key={skill.name} skill={skill} delay={0.1 + skillIdx * 0.08} />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
