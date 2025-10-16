// models/AgentAssignment.ts
import mongoose from "mongoose";

const agentAssignmentSchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "Manager", required: true },
  managerId: { type: String }, // optional convenience copy of manager.managerId
  salesDuringAssignment: { type: Number, default: 0 }, // amount agent made under this manager
  active: { type: Boolean, default: true }, // only one active per agent
  startedAt: { type: Date, default: Date.now },
  endedAt: { type: Date, default: null },
}, { timestamps: true });

export default mongoose.models.AgentAssignment || mongoose.model("AgentAssignment", agentAssignmentSchema);
