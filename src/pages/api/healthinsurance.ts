import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import HealthInsurance from "@/models/HealthInsurance";

const MONGODB_URI = process.env.MONGODB_URI || "";

// ✅ MongoDB connection helper
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
  console.log("🟢 Connected to MongoDB");
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const { method } = req;

  try {
    switch (method) {
      // --- CREATE ---
      case "POST": {
        const data = req.body;
        if (!data) return res.status(400).json({ success: false, message: "Missing request body" });

        const record = await HealthInsurance.create(data);
        return res.status(201).json({ success: true, data: record });
      }

      // --- READ (All records) ---
      case "GET": {
        const records = await HealthInsurance.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: records });
      }

      // --- UPDATE ---
      case "PUT": {
        const { id, ...updateData } = req.body;
        if (!id) return res.status(400).json({ success: false, message: "ID is required for update" });

        const updated = await HealthInsurance.findByIdAndUpdate(id, updateData, { new: true });
        if (!updated) return res.status(404).json({ success: false, message: "Record not found" });

        return res.status(200).json({ success: true, data: updated });
      }

      // --- DELETE ---
      case "DELETE": {
        const id = Array.isArray(req.query.id) ? req.query.id[0] : (req.query.id as string);
        if (!id) return res.status(400).json({ success: false, message: "ID required for delete" });

        const deleted = await HealthInsurance.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Record not found" });

        return res.status(200).json({ success: true, message: "Record deleted successfully" });
      }

      // --- INVALID METHOD ---
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({ success: false, message: `Method ${method} not allowed` });
    }
  } catch (err: any) {
    console.error("❌ API Error:", err);
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}
