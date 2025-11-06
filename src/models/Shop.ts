import mongoose, { Schema, Document, models } from "mongoose";

export interface IShop extends Document {
  // Step 1
  shopType: "rented" | "owned";
  pincode: string;
  phone: string;

  // Step 2
  businessCategory:
    | "offices"
    | "shops"
    | "hospitals_and_clinics"
    | "restaurants"
    | "godown_storage"
    | "other";
  businessType?: string; // only if "other" is selected

  ownership: "owned" | "tenant";
  createdAt: Date;
}

const ShopSchema = new Schema<IShop>(
  {
    shopType: {
      type: String,
      enum: ["rented", "owned"],
      required: [true, "Please select shop type"],
    },

    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^\d{6}$/, "Please enter a valid 6-digit pincode"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },

    businessCategory: {
      type: String,
      enum: [
        "offices",
        "shops",
        "hospitals_and_clinics",
        "restaurants",
        "godown_storage",
        "other",
      ],
      required: [true, "Please select your business category"],
    },

    businessType: {
      type: String,
      trim: true,
      required: function (this: IShop) {
        return this.businessCategory === "other";
      },
    },

    ownership: {
      type: String,
      enum: ["owned", "tenant"],
      required: [true, "Please select ownership type"],
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite during hot-reload (Next.js fix)
delete mongoose.models.Shop;

const Shop = models.Shop || mongoose.model<IShop>("Shop", ShopSchema);

export default Shop;
