// pages/api/directorins.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Director from "@/models/Director";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  // Get token from cookie
  const userToken = req.cookies?.userToken || null;
  let email: string | null = null;

  if (userToken) {
    try {
      const decoded: any = await verifyToken(userToken);
      if (decoded?.id) {
        const user = await User.findById(decoded.id).select("email");
        if (user) email = user.email;
      }
    } catch (err) {
      console.warn("directorins: token verify failed", err);
    }
  }

  try {
    if (req.method === "POST") {
      const payload = {
        ...req.body,
        email, // logged in user's email OR null
      };

      const saved = await Director.create(payload);
      return res.status(201).json({ success: true, data: saved });
    }

    if (req.method === "GET") {
      const docs = await Director.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: docs });
    }

    if (req.method === "PUT") {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ success: false, message: "id required" });
      const updated = await Director.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({ success: true, data: updated });
    }

    if (req.method === "DELETE") {
      const id = req.query.id as string;
      if (!id) return res.status(400).json({ success: false, message: "id required" });
      await Director.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "deleted" });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (err: any) {
    console.error("directorins error:", err);
    return res.status(500).json({ success: false, message: err.message || "Server error" });
  }
}
