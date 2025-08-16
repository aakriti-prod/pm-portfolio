// Core portfolio data types

export interface Profile {
  id: string;
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  summary: string;
  profileImage?: string;
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Metric[];
  tags: string[];
  images: string[];
  duration: string;
  role: string;
  company?: string;
  featured: boolean;
  order: number;
}

export interface Metric {
  label: string;
  value: string;
  description?: string;
  type: 'percentage' | 'number' | 'currency' | 'time';
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: ProficiencyLevel;
  description?: string;
  yearsOfExperience?: number;
  certifications?: Certification[];
}

export type SkillCategory = 'technical' | 'analytics' | 'leadership' | 'tools';

export type ProficiencyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Certification {
  name: string;
  issuer: string;
  dateObtained: string;
  expiryDate?: string;
  credentialUrl?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // undefined means current position
  location: string;
  description: string;
  achievements: string[];
  skills: string[]; // references to skill IDs
  companyLogo?: string;
  type: 'work' | 'education' | 'volunteer';
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  relevantCoursework?: string[];
}

// Portfolio data structure that contains all the data
export interface PortfolioData {
  profile: Profile;
  caseStudies: CaseStudy[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
}