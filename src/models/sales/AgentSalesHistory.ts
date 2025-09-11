import mongoose from "mongoose";

const AgentSalesHistorySchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: "Agent", required: true },
  dmId: { type: mongoose.Schema.Types.ObjectId, ref: "Manager", required: true },
  totalSales: { type: Number, default: 0 },
  fromDate: { type: Date, required: true }, // when agent was assigned to this DM
  toDate: { type: Date }, // when agent was moved away
});

export default mongoose.models.AgentSalesHistory ||
  mongoose.model("AgentSalesHistory", AgentSalesHistorySchema);
