import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: "Web App" | "Dashboard" | "Mobile App" | "Website" | "Other";
  demoLink?: string;
  githubLink?: string;
  featured: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    technologies: [{ type: String }],
    category: {
      type: String,
      enum: ["Web App", "Dashboard", "Mobile App", "Website", "Other"],
      required: true,
    },
    demoLink: { type: String },
    githubLink: { type: String },
    featured: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default (mongoose.models.Project as Model<IProject>) ||
  mongoose.model<IProject>("Project", ProjectSchema);
