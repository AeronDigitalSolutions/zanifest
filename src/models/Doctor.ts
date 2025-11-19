import mongoose, { Document, Model, Schema } from "mongoose";

export interface IDoctor extends Document {
  name: string;
  email: string | null;    
  mobile: string;
  whatsapp: boolean;
  specialization?: string;
  firstTime?: "yes" | "no" | null;
  facility?: "yes" | "no" | null;
}

const DoctorSchema: Schema = new Schema<IDoctor>(
  {
    name: { type: String, required: true, trim: true },

    // This is optional, input from form
 email: {
      type: String,
      default: null,
    },
    // ⭐ This tracks actual logged-in user

    mobile: { type: String, required: true },
    whatsapp: { type: Boolean, default: true },
    specialization: { type: String, default: null },
    firstTime: { type: String, enum: ["yes", "no"], default: null },
    facility: { type: String, enum: ["yes", "no"], default: null },
  },
  { timestamps: true }
);

export const Doctor =
  (mongoose.models.Doctor as Model<IDoctor>) ||
  mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
