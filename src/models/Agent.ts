import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  agentCode: { type: String, required: true, unique: true },

  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },

  panNumber: { type: String, required: true },
  panAttachment: { type: String },
  adhaarNumber: { type: String, required: true },
  adhaarAttachment: { type: String },

  nomineeName: String,
  nomineeRelation: String,
  nomineePanNumber: String,
  nomineeAadharNumber: String,
  nomineePanAttachment: String,
  nomineeAadhaarAttachment: String,

  accountHolderName: String,
  bankName: String,
  accountNumber: String,
  ifscCode: String,
  branchLocation: String,
  cancelledChequeAttachment: String,
  attachments: [
    {
      filename: String,
      data: Buffer,
      url: String,
      mimetype: String,
    },
  ],

  assignedTo: {
    type: String,
    ref: "Manager",
    required: true,
  },

  // ⭐ NEW REQUIRED FIELD ⭐
  dmSalesHistory: [
    {
      dmId: { type: String, ref: "Manager" },
      sales: { type: Number, default: 0 },
    }
  ],

  lifetimeSales: { type: Number, default: 0 },

  reassignmentHistory: [
    {
      fromManager: { type: String, ref: "Manager" },
      toManager: { type: String, ref: "Manager" },
      salesUnderPrevManager: { type: Number, default: 0 },
      reassignedAt: { type: Date, default: Date.now },
    },
  ],

  accountStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);
