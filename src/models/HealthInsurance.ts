import mongoose, { Schema, Document } from "mongoose";

// --- Member Interface ---
export interface IMember {
  name:
    | "Self"
    | "Wife"
    | "Husband"
    | "Son"
    | "Daughter"
    | "Father"
    | "Mother"
    | "Grandfather"
    | "Grandmother"
    | "Father-in-law"
    | "Mother-in-law";
  image?: string;
  age: number;
}

// --- Main Interface ---
export interface IHealthInsurance extends Document {
  gender: "male" | "female";
  members: IMember[];
  city: string;
  fullName: string;
  mobile: string;
  medicalHistory: string[];
  createdAt: Date;
}

// ---------------- Member Schema ----------------
const MemberSchema = new Schema<IMember>({
  name: {
    type: String,
    enum: [
      "Self",
      "Wife",
      "Husband",
      "Son",
      "Daughter",
      "Father",
      "Mother",
      "Grandfather",
      "Grandmother",
      "Father-in-law",
      "Mother-in-law",
    ],
    required: true,
  },
  image: { type: String },
  age: { type: Number, min: 0, max: 120, required: true },
});

// ---------------- Main Schema ----------------
const HealthInsuranceSchema = new Schema<IHealthInsurance>({
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  members: {
    type: [MemberSchema],
    required: true,
    validate: {
      validator: (members: IMember[]) => {
        const totalChildren = members.filter(
          (m) => m.name === "Son" || m.name === "Daughter"
        ).length;
        return totalChildren <= 4;
      },
      message: "You can select up to 4 children (sons + daughters combined).",
    },
  },
  city: { type: String, required: true, trim: true },
  fullName: { type: String, required: true, trim: true, minlength: 2 },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
  },
  medicalHistory: {
    type: [String],
    enum: [
      "Diabetes",
      "Blood Pressure",
      "Heart disease",
      "Any Surgery",
      "Thyroid",
      "Asthma",
      "Other disease",
      "None of these",
    ],
    default: [],
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.HealthInsurance ||
  mongoose.model<IHealthInsurance>("HealthInsurance", HealthInsuranceSchema);
