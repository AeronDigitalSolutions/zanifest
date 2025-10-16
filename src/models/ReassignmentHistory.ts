import mongoose from "mongoose";

const reassignmentHistorySchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  fromManager: { type: mongoose.Schema.Types.ObjectId, ref: "Manager" },
  toManager: { type: mongoose.Schema.Types.ObjectId, ref: "Manager", required: true },
  reassignedAt: { type: Date, default: Date.now },
});

export default mongoose.models.ReassignmentHistory ||
  mongoose.model("ReassignmentHistory", reassignmentHistorySchema);
