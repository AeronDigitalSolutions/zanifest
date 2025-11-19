import mongoose, { Schema, Document, models } from "mongoose";

export interface IShop extends Document {
  shopType: "rented" | "owned";
  pincode: string;
  phone: string;
  businessCategory: string;
  businessType?: string;
  ownership: "owned" | "tenant";
  email: string | null; // ⭐ EXACT SAME FIELD AS TRAVEL
  createdAt: Date;
}

const ShopSchema = new Schema<IShop>(
  {
    shopType: {
      type: String,
      enum: ["rented", "owned"],
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    businessCategory: {
      type: String,
      required: true,
    },

    businessType: {
      type: String,
      default: null,
    },

    ownership: {
      type: String,
      enum: ["owned", "tenant"],
      required: true,
    },

    email: {
      type: String,
      default: null,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);


// Prevent model overwrite during hot-reload (Next.js fix)
delete mongoose.models.Shop;

const Shop = models.Shop || mongoose.model<IShop>("Shop", ShopSchema);

export default Shop;
