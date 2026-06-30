import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  description: string;
  status: "new" | "in_progress" | "done";
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },
    phone: { type: String },
    company: { type: String },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "in_progress", "done"],
      default: "new",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

export default (mongoose.models.Contact as Model<IContact>) ||
  mongoose.model<IContact>("Contact", ContactSchema);
