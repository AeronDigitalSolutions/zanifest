import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Marine from "@/models/Marinemodule";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

const MONGODB_URI = process.env.MONGODB_URI || "";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  let email: string | null = null;

  // ⭐ SAME AS TRAVEL
  const token = req.cookies?.userToken;
  if (token) {
    try {
      const decoded: any = await verifyToken(token);
      if (decoded?.id) {
        const user = await User.findById(decoded.id).select("email");
        if (user) email = user.email;
      }
    } catch (err) {
      console.log("Token verification failed");
    }
  }

  try {
    switch (req.method) {
      case "POST": {
        const record = await Marine.create({
          ...req.body,
          email, // ⭐ TRAVEL LOGIC
        });

        return res.status(201).json({ success: true, data: record });
      }

      case "GET": {
        const all = await Marine.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: all });
      }

      default:
        return res.status(405).json({ success: false, message: "Method not allowed" });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
