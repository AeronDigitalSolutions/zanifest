// /pages/api/policy/get.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Policy from "@/models/Policy";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const policies = await Policy.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, policies });
  } catch (err) {
    console.error("Get policies error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
