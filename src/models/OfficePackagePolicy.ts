import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOption {
  name: "Building" | "Content" | "Stock";
  checked: boolean;
  amount?: number; // raw number stored
}

export interface IOfficePackagePolicy extends Document {
  companyName: string;
  mobile: string;
  options: IOption[];
  // modal-related fields
  firstTimeBuying?: "Yes" | "No" | null; 
  lossHistory?: "Yes" | "No" | null;     
  createdAt: Date;
  updatedAt: Date;
}

const OptionSchema: Schema = new Schema(
  {
    name: { type: String, required: true, enum: ["Building", "Content", "Stock"] },
    checked: { type: Boolean, required: true, default: false },
    amount: { type: Number }, 
  },
  { _id: false }
);

const OfficePackagePolicySchema: Schema = new Schema(
  {
    companyName: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    options: { type: [OptionSchema], default: [] },
    pincode: { type: String, maxlength: 6 },
    firstTimeBuying: { type: String, enum: ["Yes", "No", null], default: null },
    lossHistory: { type: String, enum: ["Yes", "No", null], default: null },
  },
  { timestamps: true }
);

const modelName = "OfficePackagePolicy";
const OfficePackagePolicy: Model<IOfficePackagePolicy> =
  (mongoose.models[modelName] as Model<IOfficePackagePolicy>) ||
  mongoose.model<IOfficePackagePolicy>(modelName, OfficePackagePolicySchema);

export default OfficePackagePolicy;
