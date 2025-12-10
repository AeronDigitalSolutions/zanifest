// /models/Policy.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IField {
  label?: string;
  value: string;
}

export interface IPolicy extends Document {
  fields: IField[];
  status: "Hot" | "Cold" | "Converted" | "Dead";
  date: string;
  createdAt: Date;
  updatedAt: Date;
}

const FieldSchema = new Schema<IField>({
  label: { type: String },
  value: { type: String, required: true },
});

const PolicySchema = new Schema<IPolicy>(
  {
    fields: [FieldSchema],
    status: {
      type: String,
      enum: ["Hot", "Cold", "Converted", "Dead"],
      default: "Hot",
    },
    date: { type: String },
  },
  { timestamps: true }
);

// Avoid recompilation in dev
const Policy: Model<IPolicy> =
  (mongoose.models.Policy as Model<IPolicy>) ||
  mongoose.model<IPolicy>("Policy", PolicySchema);

export default Policy;
