import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Marine from "@/models/Marinemodule";
import TravelInsurance from "@/models/TravelInsurance";
import { verifyToken } from "@/utils/verifyToken";
import Shop from "@/models/Shop";
import HomeInsurance from "@/models/Homeinsurance";

const MONGODB_URI = process.env.MONGODB_URI!;

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  const token = req.cookies.agentToken;
  let agentId = "";

  try {
    const decoded: any = await verifyToken(token);
    agentId = decoded.id;
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    // ------------------- MARINE LEADS -------------------
    const marineLeads = await Marine.find({ assignedAgent: agentId }).sort({ assignedAt: -1 });

    const mappedMarine = marineLeads.map((m) => ({
      id: m._id,
      email: m.email,
      phone: m.phoneNumber,
      module: "Marine",
      assignedAt: m.assignedAt,
    }));

    // ------------------- TRAVEL LEADS -------------------
    const travelLeads = await TravelInsurance.find({ assignedAgent: agentId }).sort({ assignedAt: -1 });

    const mappedTravel = travelLeads.map((t) => ({
      id: t._id,
      email: t.email,
      phone: t.phoneNumber,
      module: "Travel",
      assignedAt: t.assignedAt,
    }));



    const shopLeads = await Shop.find({ assignedAgent: agentId }).sort({ assignedAt: -1 });

const mappedShop = shopLeads.map(s => ({
  id: s._id,
  email: s.email,
  phone: s.phone,
  module: "Shop Insurance",
  assignedAt: s.assignedAt
}));

const home = await HomeInsurance.find({ assignedAgent: agentId }).sort({ assignedAt: -1 });

const mappedHome = home.map(h => ({
  id: h._id,
  email: h.email,
  phone: h.phoneNumber,
  module: "Home Insurance",
  assignedAt: h.assignedAt
}));



    // ------------------- MERGE ALL -------------------
    const allLeads = [...mappedMarine, ...mappedTravel, ...mappedShop,...mappedHome].sort(
      (a, b) => new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime()
    );

    return res.status(200).json({ success: true, data: allLeads });

  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
