import mongoose, { Schema, Document } from "mongoose";

export interface IAgentLogin extends Document {
  name: string;        // full name
  email: string;
  password: string;
  loginId: string;
  accountStatus: string;
}

const AgentLoginSchema = new Schema<IAgentLogin>(
  {
    name: { type: String, required: true },     // full name only
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loginId: { type: String, required: true, unique: true },
    accountStatus: { type: String, required: true },
  },
  { timestamps: true }
);

delete mongoose.models.AgentLogin;

export default mongoose.model<IAgentLogin>("AgentLogin", AgentLoginSchema);
