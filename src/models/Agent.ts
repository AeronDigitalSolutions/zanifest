// models/Agent.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IAgent extends Document {
  loginId: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  agentCode: string;
  city: string;
  district: string;
  state: string;
  pinCode: string;
  panNumber?: string;
  panAttachment?: string; 
  adhaarNumber?: string;
  adhaarAttachment?: string; 
  nomineeName?: string;
  nomineeRelation?: string;
  nomineePanNumber?: string;
  nomineeAadharNumber?: string;
  nomineePanAttachment?: string;
  nomineeAadhaarAttachment?: string;
  accountHolderName?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  branchLocation?: string;
  cancelledChequeAttachment?: string;
  assignedTo?: string;
  status?: "pending" | "approved" | "rejected";
  accountStatus?: "active" | "inactive";
}

const agentSchema = new Schema<IAgent>(
  {
    loginId: { type: String, required: true, unique: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },

    agentCode: { type: String, required: true, unique: true },

    city: { type: String, required: true },
    district: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },

    panNumber: { type: String },
    panAttachment: { type: String },

    adhaarNumber: { type: String },
    adhaarAttachment: { type: String },

    nomineeName: { type: String },
    nomineeRelation: { type: String },
    nomineePanNumber: { type: String },
    nomineeAadharNumber: { type: String },
    nomineePanAttachment: { type: String },
    nomineeAadhaarAttachment: { type: String },

    accountHolderName: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    branchLocation: { type: String },
    cancelledChequeAttachment: { type: String },

    assignedTo: { type: String },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    accountStatus: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);
