// models/OfficePackagePolicy.ts

import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOption {
  name: "Building" | "Content" | "Stock";
  checked: boolean;
  amount?: number;
}

export interface IOfficePackagePolicy extends Document {
  companyName: string;
  mobile: string;
  email?: string | null;   // ⭐ ADDED
  options: IOption[];
  firstTimeBuying?: "Yes" | "No" | null;
  lossHistory?: "Yes" | "No" | null;
  pincode?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OptionSchema = new Schema(
  {
    name: { type: String, required: true },
    checked: { type: Boolean, required: true },
    amount: { type: Number },
  },
  { _id: false }
);

const OfficePackagePolicySchema = new Schema(
  {
    companyName: String,
    mobile: String,
    email: { type: String, default: null }, // ⭐ ADDED
    options: [OptionSchema],
    pincode: String,
    firstTimeBuying: { type: String, enum: ["Yes", "No", null], default: null },
    lossHistory: { type: String, enum: ["Yes", "No", null], default: null },
  },
  { timestamps: true }
);

export default mongoose.models.OfficePackagePolicy ||
  mongoose.model("OfficePackagePolicy", OfficePackagePolicySchema);
