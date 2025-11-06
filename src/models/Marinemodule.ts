import mongoose, { Schema, Document } from "mongoose";

export interface MarineModuleRequest extends Document {
  phoneNumber: string;
  commodity?: string;
  coverType?: string;
  shipmentType?: string;
  companyName?: string;
  transportMode?: string;
  coverAmount?: string;
  createdAt: Date;
}

const MarineModuleSchema = new Schema<MarineModuleRequest>(
  {
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^(\+91)?[6-9]\d{9}$/, "Invalid Indian phone number format"],
    },
    commodity: { type: String },
    coverType: { type: String },
    shipmentType: { type: String },
    companyName: { type: String },
    transportMode: { type: String },
    coverAmount: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: "MarineModuleRequests" }
);

export default mongoose.models.MarineModuleRequest ||
  mongoose.model<MarineModuleRequest>("MarineModuleRequest", MarineModuleSchema);
