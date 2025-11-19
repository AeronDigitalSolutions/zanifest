import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Shop from "@/models/Shop";
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

  const token = req.cookies?.userToken;

  if (token) {
    const decoded: any = await verifyToken(token);
    if (decoded?.id) {
      const user = await User.findById(decoded.id).select("email");
      if (user) email = user.email;
    }
  }

  try {
    switch (req.method) {
      case "POST": {
        const newRecord = await Shop.create({
          ...req.body,
          email, 
        });

        return res.status(201).json({ success: true, data: newRecord });
      }

      case "GET": {
        const shops = await Shop.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: shops });
      }

      default:
        return res.status(405).json({
          success: false,
          message: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
