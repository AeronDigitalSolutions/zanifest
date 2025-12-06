import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import DoctorInsurance from "@/models/Doctor";
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

  // Check logged-in user email
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

  /* -------------------- CREATE RECORD -------------------- */
  if (req.method === "POST") {
    try {
      const newRecord = await DoctorInsurance.create({
        ...req.body,
        email, // store logged-in user's email
      });

      return res.status(201).json({ success: true, data: newRecord });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  }

  /* -------------------- UPDATE RECORD (PUT) -------------------- */
  if (req.method === "PUT") {
    try {
      const { id } = req.query;
      if (!id) {
        return res.status(400).json({
          success: false,
          message: "Missing doctor insurance ID",
        });
      }

      const updated = await DoctorInsurance.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({
          success: false,
          message: "Record not found",
        });
      }

      return res.status(200).json({ success: true, data: updated });
    } catch (error: any) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  /* -------------------- GET ALL RECORDS -------------------- */
  if (req.method === "GET") {
    const list = await DoctorInsurance.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: list });
  }

  /* -------------------- OTHER METHODS NOT ALLOWED -------------------- */
  return res.status(405).json({
    success: false,
    message: `Method ${req.method} not allowed`,
  });
}
