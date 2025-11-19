import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  let email = null;

  const userToken = req.cookies?.userToken || null;

  if (userToken) {
    const decoded: any = await verifyToken(userToken);
    if (decoded?.id) {
      const user = await User.findById(decoded.id).select("email");
      if (user) email = user.email;
    }
  }

  try {
    if (req.method === "POST") {
      const { name, mobile, whatsapp = true } = req.body;

      if (!name || !mobile) {
        return res.status(400).json({ success: false, error: "name & mobile required" });
      }

      // ⭐ Save ONE clean entry
      const newRecord = await Doctor.create({
        name,
        mobile,
        whatsapp,
        email, // logged-in OR null
      });

      return res.status(201).json({ success: true, data: newRecord });
    }

    if (req.method === "PUT") {
      const id = req.query.id as string;

      const updateFields = ["specialization", "firstTime", "facility", "name", "mobile", "whatsapp"];
      const updateData: any = {};

      for (const key of updateFields) {
        if (key in req.body) updateData[key] = req.body[key];
      }

      const updated = await Doctor.findByIdAndUpdate(id, updateData, { new: true });
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === "GET") {
      const docs = await Doctor.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: docs });
    }

    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  } catch (err: any) {
    console.error("Doctor API Error:", err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
