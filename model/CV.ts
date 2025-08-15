import mongoose, { Schema, Document, Model } from "mongoose";

export interface UCV extends Document {
  id: string;
  userId: string;
  profileId: string;
  role: string;
  templateId: string;
  title: string;
  description: string;
  content: {
    personalInfo: {
      fullName: string;
      email: string;
      phone: string;
      address: string;
      jobTitle: string;
      summary: string;
    };
    education: {
      id: string;
      institution: string;
      degree: string;
      field: string;
      startDate: Date;
      endDate: Date;
      gpa?: string;
    }[];
    experience: {
      id: string;
      company: string;
      position: string;
      startDate: Date;
      endDate?: Date;
      description: string;
      current: boolean;
    }[];
    skills: {
      category: string;
      items: string[];
    }[];
    certifications: string[];
    hobbies: string[];
    languages: {
      language: string;
      proficiency: string;
    }[];
  };
  status: "active" | "inactive";
  export: boolean;
  createdAt?: Date;
  updatedAt: Date;
  lastUsedAt?: Date;
}

const CVSchema = new Schema<UCV>(
  {
    id: { type: String, required: true },
    userId: { type: String, required: true },
    profileId: { type: String, required: true },
    role: { type: String, required: true },
    templateId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: {
      personalInfo: {
        fullName: String,
        email: String,
        phone: String,
        address: String,
        jobTitle: String,
        summary: String,
      },
      education: [
        {
          id: String,
          institution: String,
          degree: String,
          field: String,
          startDate: Date,
          endDate: Date,
          gpa: String,
        },
      ],
      experience: [
        {
          id: String,
          company: String,
          position: String,
          startDate: Date,
          endDate: Date,
          description: String,
          current: Boolean,
        },
      ],
      skills: [
        {
          category: String,
          items: [String],
        },
      ],
      certifications: [String],
      hobbies: [String],
      languages: [
        {
          language: String,
          proficiency: String,
        },
      ],
    },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    export: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastUsedAt: { type: Date },
  },
  { timestamps: true, collection: "usercvs" }
);

// Fix OverwriteModelError by using the collection name as the key in mongoose.models
const UserCV: Model<UCV> =
  mongoose.models.usercvs || mongoose.model<UCV>("usercvs", CVSchema);

export default UserCV;
