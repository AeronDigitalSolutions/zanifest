import mongoose, { Schema, Document } from "mongoose";

export interface IHomeInsurance extends Document {
  fullName: string;
  phoneNumber: string;
  coverOptions: {
    homeStructure: boolean;
    householdItems: boolean;
    homeLoanProtection: boolean;
    insuranceForLoan: boolean;
    jewelleryAndValuables: boolean;
  };
  propertyDetails: {
    houseValue: string;
    householdItemsValue?: string;
    cityName?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const HomeInsuranceSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
   phoneNumber: {
  type: String,
  required: [true, "Phone number is required"],
  match: [/^\+91\d{10}$/, "Invalid Indian mobile number format"],
  set: (v: string) => v.replace(/\s+/g, ""), 
},

    coverOptions: {
      homeStructure: { type: Boolean, default: false },
      householdItems: { type: Boolean, default: false },
      homeLoanProtection: { type: Boolean, default: false },
      insuranceForLoan: { type: Boolean, default: false },
      jewelleryAndValuables: { type: Boolean, default: false },
    },
    propertyDetails: {
      houseValue: { type: String, trim: true },
      householdItemsValue: { type: String, trim: true },
      cityName: { type: String, trim: true },
    },
  },
  { timestamps: true }
);

export default mongoose.models.HomeInsurance ||
  mongoose.model<IHomeInsurance>("HomeInsurance", HomeInsuranceSchema);
