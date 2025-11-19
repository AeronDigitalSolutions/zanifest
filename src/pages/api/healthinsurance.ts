import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import HealthInsurance from "@/models/HealthInsurance";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

const MONGODB_URI = process.env.MONGODB_URI || "";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  let email = null;

  try {
    const token = req.cookies?.userToken || null;

    if (token) {
      const decoded: any = await verifyToken(token);
      if (decoded?.id) {
        const user = await User.findById(decoded.id).select("email");
        if (user) email = user.email;
      }
    }
  } catch (err) {
    console.log("Email fetch failed:", err);
  }

  // ⭐ POST
  if (req.method === "POST") {
    try {
      const record = await HealthInsurance.create({
        ...req.body,
        email, // logged-in email OR null
      });

      return res.status(201).json({ success: true, data: record });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  // ⭐ GET
  if (req.method === "GET") {
    const records = await HealthInsurance.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: records });
  }

  return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
