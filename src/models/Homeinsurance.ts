import mongoose, { Schema, Document } from "mongoose";

export interface IHomeInsurance extends Document {
  fullName: string;
  phoneNumber: string;
  email: string | null; 
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
    fullName: { type: String, required: true, trim: true },

    phoneNumber: {
      type: String,
      required: true,
      match: [/^\+91\d{10}$/, "Invalid Indian mobile number format"],
      set: (v: string) => v.replace(/\s+/g, ""),
    },

    email: {
      type: String,
      default: null, // ⭐ EXACT SAME AS TRAVEL
    },

    coverOptions: {
      homeStructure: Boolean,
      householdItems: Boolean,
      homeLoanProtection: Boolean,
      insuranceForLoan: Boolean,
      jewelleryAndValuables: Boolean,
    },

    propertyDetails: {
      houseValue: String,
      householdItemsValue: String,
      cityName: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.HomeInsurance ||
  mongoose.model<IHomeInsurance>("HomeInsurance", HomeInsuranceSchema);
