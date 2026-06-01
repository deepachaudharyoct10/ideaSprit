import mongoose, { Schema, Document } from "mongoose";

export interface IDeveloper extends Document {
  name: string;
  role: string;
  image: string;
  bio: string;
  skills: string[];
  experience: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  education: { degree: string; institution: string; year: string }[];
  achievements: string[];
  projects: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const DeveloperSchema = new Schema<IDeveloper>(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    image: { type: String, required: true },
    bio: { type: String, required: true },
    skills: [{ type: String }],
    experience: { type: String, required: true },
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String },
    education: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        year: { type: String, required: true },
      },
    ],
    achievements: [{ type: String }],
    projects: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<IDeveloper>("Developer", DeveloperSchema);
