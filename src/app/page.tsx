"use client";

import { useState } from "react";
import FloatingNav from "@/components/layout/FloatingNav";
import LoadingScreen from "@/components/layout/LoadingScreen";
import CommandPalette from "@/components/layout/CommandPalette";
import Footer from "@/components/sections/Footer";
import HeroSection from "@/components/sections/HeroSection";
import SectionTransition from "@/components/sections/SectionTransition";
import AboutSection from "@/components/sections/AboutSection";
import CinematicPinSection from "@/components/sections/CinematicPinSection";
import ClientsSection from "@/components/sections/ClientsSection";
import StatsSection from "@/components/sections/StatsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ShowreelSection from "@/components/sections/ShowreelSection";
import ResumeSection from "@/components/sections/ResumeSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <main className="relative z-10 flex flex-col min-h-screen">
      <LoadingScreen />
      <FloatingNav onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <HeroSection />
      <SectionTransition />
      <AboutSection />
      <CinematicPinSection />
      <ClientsSection />
      <StatsSection />
      <ExperienceSection />
      <ServicesSection />
      <SkillsSection />
      <ShowreelSection />
      <ResumeSection />
      <TestimonialsSection />
      <ContactSection />

      <Footer />
    </main>
  );
}
