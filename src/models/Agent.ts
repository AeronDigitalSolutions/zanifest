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
  panAttachment: String,
  adhaarNumber: { type: String, required: true },
  adhaarAttachment: String,

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

  /** ✅ SALES SECTION — REQUIRED FOR YOUR UI **/
  totalSales: {
    type: Number,
    default: 0,
  },

  // lifetime total sales
  lifetimeSales: {
    type: Number,
    default: 0,
  },

  monthlySales: {
    type: Number,
    default: 0,
  },

  // number of total clients
  clients: {
    type: Number,
    default: 0,
  },

  // sales history for graph
  salesHistory: [
    {
      month: String,
      price: Number,
      date: Date,
    },
  ],

  // DM History
  dmHistory: [
    {
      dmId: String,
      dmName: String,
      sales: Number,
    },
  ],

  // DM monthly
  currentDMSales: {
    type: Number,
    default: 0,
  },

  // legacy field (optional)
  sales: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);
