// types.ts
import { CVData } from "@/types/cv-types"
export type CVStatus = "draft" | "published";
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  thumbnail: string;
  structure: object;
  createdAt: string;
}

export interface CVProfile {
  id: number;
  name: string;
}

export interface CV {
  id: string | number;
  userId: string;
  profileId: string;
  role: string; // Added role field
  templateId: string;
  title: string;
  description: string;
  content: CVData;
  status: CVStatus;
  export: boolean;
  createdAt?: string;
  updatedAt: string;
  lastUsedAt?: string;
}