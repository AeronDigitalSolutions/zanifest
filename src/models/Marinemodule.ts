import mongoose, { Schema, Document } from "mongoose";
export interface MarineModuleRequest extends Document {
  phoneNumber: string;
  commodity?: string;
  coverType?: string;
  shipmentType?: string;
  companyName?: string;
  transportMode?: string;
  coverAmount?: string;
  email: string | null;
  createdAt: Date;
}

const MarineModuleSchema = new Schema<MarineModuleRequest>(
  {
    phoneNumber: { type: String, required: true },

    commodity: String,
    coverType: String,
    shipmentType: String,
    companyName: String,
    transportMode: String,
    coverAmount: String,

    // ⭐ SAME AS TRAVEL
    email: {
      type: String,
      default: null,
    },

    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.MarineModuleRequest ||
  mongoose.model<MarineModuleRequest>(
    "MarineModuleRequest",
    MarineModuleSchema
  );
