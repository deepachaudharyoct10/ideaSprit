import mongoose, { Schema } from "mongoose";

const OTPSchema = new Schema({
  email: { type: String, required: true, lowercase: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 600 }, // auto-delete after 10 min
});

export default mongoose.models.OTP || mongoose.model("OTP", OTPSchema);
