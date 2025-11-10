import mongoose, { Document, Model, Schema } from "mongoose";


export interface IDoctor extends Document {
  name: string;
  mobile: string;
  whatsapp: boolean;
  specialization?: string;
  firstTime?: "yes" | "no" | null;
  facility?: "yes" | "no" | null;
  createdAt: Date;
  updatedAt: Date;
}


const DoctorSchema: Schema = new Schema<IDoctor>(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    whatsapp: { type: Boolean, default: true },
    specialization: { type: String, default: null },
    firstTime: { type: String, enum: ["yes", "no"], default: null },
    facility: { type: String, enum: ["yes", "no"], default: null },
  },
  { timestamps: true }
);


export const Doctor: Model<IDoctor> =
  (mongoose.models.Doctor as Model<IDoctor>) ||
  mongoose.model<IDoctor>("Doctor", DoctorSchema);

export default Doctor;
