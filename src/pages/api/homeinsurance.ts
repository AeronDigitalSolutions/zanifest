import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import HomeInsurance from "@/models/Homeinsurance";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  let email = null;

  // ⭐ SAME AS TRAVEL: Check login token
  const userToken = req.cookies?.userToken || null;

  if (userToken) {
    const decoded: any = await verifyToken(userToken);
    if (decoded?.id) {
      const user = await User.findById(decoded.id).select("email");
      if (user) email = user.email;
    }
  }

  // ⭐ POST — Save record
  if (req.method === "POST") {
    try {
      const newRecord = new HomeInsurance({
        ...req.body,
        email: email, // ⭐ EXACT SAME AS TRAVEL
      });

      const saved = await newRecord.save();

      return res.status(201).json({ success: true, data: saved });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // ⭐ GET — fetch all records
  if (req.method === "GET") {
    const records = await HomeInsurance.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: records });
  }

  res.status(405).json({ success: false, message: "Method Not Allowed" });
}
