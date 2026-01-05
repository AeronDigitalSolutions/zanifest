import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Director from "@/models/Director";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  let email: string | null = null;
  let isGuest = true;

  const token = req.cookies?.userToken;

  if (token) {
    try {
      const decoded: any = await verifyToken(token);
      if (decoded?.id) {
        const user = await User.findById(decoded.id).select("email");
        if (user) {
          email = user.email;
          isGuest = false;
        }
      }
    } catch (e) {
      console.log("Director token verify failed");
    }
  }

  try {
    // ---------------- POST (SAVE) ----------------
    if (req.method === "POST") {
      const payload = {
        ...req.body,
        email,
        isGuest
      };

      const saved = await Director.create(payload);
      return res.status(201).json({ success: true, data: saved });
    }

    // ---------------- PUT (UPDATE AFTER LOGIN) ----------------
    if (req.method === "PUT") {
      const { id, email } = req.body;

      const updated = await Director.findByIdAndUpdate(
        id,
        {
          email,
          isGuest: false
        },
        { new: true }
      );

      return res.status(200).json({ success: true, data: updated });
    }

    // ---------------- GET ----------------
    if (req.method === "GET") {
      const list = await Director.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: list });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    return res.status(405).end("Method Not Allowed");
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

