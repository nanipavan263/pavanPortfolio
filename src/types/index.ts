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
  role: string;
  duration: string;
  isCurrent?: boolean;
  responsibilities: string[];
}

export interface SkillItem {
  name: string;
  level: number; // percentage 1-100
  category: string;
  icon?: string;
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
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
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
