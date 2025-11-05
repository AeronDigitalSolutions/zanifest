import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  // Basic info
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  agentCode: { type: String, required: true, unique: true },

  // Address info
  city: { type: String, required: true },
  district: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },

  // PAN / Aadhaar
  panNumber: { type: String, required: true },
  panAttachment: { type: String },
  adhaarNumber: { type: String, required: true },
  adhaarAttachment: { type: String },

  // Nominee details
  nomineeName: String,
  nomineeRelation: String,
  nomineePanNumber: String,
  nomineeAadharNumber: String,
  nomineePanAttachment: String,
  nomineeAadhaarAttachment: String,

  // Bank details
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

  // 🔗 Current assigned manager
  assignedTo: {
    type: String,
    ref: "Manager",
    required: true,
  },

  // 💰 Sales tracking
  lifetimeSales: { type: Number, default: 0 }, // cumulative across all DMs
  currentDMSales: { type: Number, default: 0 }, // sales under current DM

  reassignmentHistory: [
    {
      fromManager: { type: String, ref: "Manager" },
      toManager: { type: String, ref: "Manager" },
      salesUnderPrevManager: { type: Number, default: 0 }, // sales made under old DM before reassignment
      reassignedAt: { type: Date, default: Date.now },
    },
  ],

  accountStatus: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

// Safety defaults
agentSchema.pre("save", function (next) {
  if (this.lifetimeSales == null) this.lifetimeSales = 0;
  if (this.currentDMSales == null) this.currentDMSales = 0;
  next();
});

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);
