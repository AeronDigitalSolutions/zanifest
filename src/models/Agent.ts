import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  assignedTo: {
    type: String, // Assuming you're using custom integer IDs for managers
    required: true,
  },
});

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema);
