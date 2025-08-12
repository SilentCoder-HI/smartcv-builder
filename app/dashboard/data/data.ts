// types.ts
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
  userId?: string;
  profileId: string;
  role: string; // Added role field
  templateId?: string;
  title: string;
  description: string;
  content?: object;
  status: CVStatus;
  createdAt?: string;
  updatedAt: string;
  lastUsedAt?: string;
}