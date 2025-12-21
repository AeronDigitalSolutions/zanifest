import mongoose, { Schema, models } from "mongoose";

const PolicySchema = new Schema(
  {
    insuredName: String,
    policyNo: String,
    companyName: String,
    amount: String,
    expiryDate: String,

    verified: { type: Boolean, default: false },

    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default models.Policy || mongoose.model("Policy", PolicySchema);
