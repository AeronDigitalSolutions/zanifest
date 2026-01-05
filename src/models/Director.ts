import mongoose, { Schema, Document } from "mongoose";

export interface IDirector extends Document {
  mobileNumber: string;
  companyName: string;
  industryCategory: string;
  subCategory?: string;
  territory: string;
  jurisdiction: string;
  companyTurnover: string;
  limitOfLiability: string;
  whatsappOptIn: boolean;

  email?: string | null;
  isGuest?: boolean;

  createdAt: Date;
}

const DirectorSchema = new Schema<IDirector>(
  {
    mobileNumber: { type: String, required: true },
    companyName: { type: String, required: true },
    industryCategory: { type: String, required: true },
    subCategory: String,
    territory: { type: String, required: true },
    jurisdiction: { type: String, required: true },
    companyTurnover: { type: String, required: true },
    limitOfLiability: { type: String, required: true },
    whatsappOptIn: { type: Boolean, default: true },

    email: { type: String, default: null },
    isGuest: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.Director ||
  mongoose.model<IDirector>("Director", DirectorSchema);
