import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import TravelInsurance from "@/models/TravelInsurance";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const userToken = req.cookies?.userToken || null;

  let email = null;

  if (userToken) {
    const decoded: any = await verifyToken(userToken);
    if (decoded?.id) {
      const user = await User.findById(decoded.id).select("email");
      if (user) email = user.email;
    }
  }

  if (req.method === "POST") {
    try {
      const newRecord = new TravelInsurance({
        ...req.body,
        email: email, // logged user OR null
      });

      const saved = await newRecord.save();
      return res.status(201).json({ success: true, data: saved });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  if (req.method === "GET") {
    const data = await TravelInsurance.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data });
  }

  res.status(405).end("Method Not Allowed");
}
