import mongoose, { Schema, models } from "mongoose";

const PolicySchema = new Schema(
  {
    // 🔥 REQUIRED FOR AGENT ISOLATION
    agentId: {
      type: Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
      index: true,
    },

    insuredName: { type: String },
    policyNo: { type: String, required: true },
    companyName: { type: String },
    amount: { type: String },
    expiryDate: { type: String },

    pdfUrl: { type: String },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// 🔥 VERY IMPORTANT (prevents old schema caching)
delete mongoose.models.Policy;

export default models.Policy || mongoose.model("Policy", PolicySchema);
