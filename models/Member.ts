// models/Member.ts
import mongoose, { Schema, models } from "mongoose";

const MemberSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    whatsapp: { type: String, required: true },
    occupation: { type: String },
    invited: { type: Boolean, default: false }, // admin usage
  },
  { timestamps: true }
);

export const Member =
  models.Member || mongoose.model("Member", MemberSchema);
