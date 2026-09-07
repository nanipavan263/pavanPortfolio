export interface HeroData {
  greeting: string;
  name: string;
  titles: string[];
  headline: string;
  location: string;
  resumeUrl: string;
}

export interface PortfolioData {
  hero: HeroData;
  bio: string;
  missionStatement: string;
  languages: string[];
  socials: {
    instagram: string;
    email: string;
    phone: string;
    location: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  subtitle: string;
  location: string;
  duration: string;
  isCurrent: boolean;
  role: string;
  description: string;
  bullets: string[];
  achievements: string[];
}

export interface SkillEntry {
  name: string;
  level: number; // percentage 1-100
}

export interface SkillGroup {
  title: string;
  icon: string;
  skills: SkillEntry[];
}

export interface ClientItem {
  name: string;
  featured?: boolean;
}

export interface VideoItem {
  src: string;
  client: string;
  orientation: "landscape" | "portrait";
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  highlights: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
  focus: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface NavItem {
  label: string;
  href: string;
}
