// pages/api/agent/leadDetails.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Marine from "@/models/Marinemodule";
import TravelInsurance from "@/models/TravelInsurance";
import Shop from "@/models/Shop";
import HomeInsurance from "@/models/Homeinsurance";
import { verifyToken } from "@/utils/verifyToken";

const MONGODB_URI = process.env.MONGODB_URI || "";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  // agent must be authenticated
  const token = req.cookies.agentToken;
  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  let agentId = "";
  try {
    const decoded: any = await verifyToken(token);
    agentId = decoded.id;
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  const moduleName = (req.query.module as string) || req.body.module;
  const id = (req.query.id as string) || req.body.id;

  if (!moduleName || !id) {
    return res.status(400).json({ success: false, message: "Missing module or id" });
  }

  try {
    let doc: any = null;

    // normalize module name for matching
    const mod = moduleName.toLowerCase();

    if (mod.startsWith("marine")) {
      doc = await Marine.findById(id).lean();
    } else if (mod.startsWith("travel")) {
      doc = await TravelInsurance.findById(id).lean();
    } else if (mod.includes("shop")) {
      doc = await Shop.findById(id).lean();
    } else if (mod.includes("home")) {
      doc = await HomeInsurance.findById(id).lean();
    } else {
      return res.status(400).json({ success: false, message: "Unsupported module" });
    }

    if (!doc) return res.status(404).json({ success: false, message: "Record not found" });

    if (doc.assignedAgent && String(doc.assignedAgent) !== String(agentId)) {
      return res.status(403).json({ success: false, message: "Forbidden: not assigned to you" });
    }

    return res.status(200).json({ success: true, data: doc });
  } catch (err: any) {
    console.error("leadDetails error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
