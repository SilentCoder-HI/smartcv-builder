export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address: string
  jobTitle: string
  summary: string
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

export interface CVData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: string[]
  certifications: string[]
  languages: string[]
  hobbies: string[]
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
  name: string
  previewUrl: string
  category: string
  type: string
  componentPath: string
  description: string
}