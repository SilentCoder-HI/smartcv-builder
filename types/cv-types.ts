import { FC } from "react"

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address?: string
  jobTitle: string
  summary?: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  current: boolean
}
export interface Skill {
  category: string
  items: string[]
}
export interface CVData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  certifications: string[]
  hobbies: string[]
  languages?: {
    language: string;
    proficiency: string;
  }[];
}
export interface JobAnalysisResults {
  matchScore: number;
  missingSkills: string[];
  keywordSuggestions: string[];
  improvementSuggestions: string[];
  optimizedSummary: string;
  experienceOptimization: string[];
  industryInsights: string[];
  atsOptimization: string[];
}

export interface Template {
  templateId: string;
  templateType: string
  description: string
  id: string
  component: FC<any>; // or FC<Props> if defined
  type: string
  aiPrompt:string
}