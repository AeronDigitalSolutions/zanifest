// pages/api/doctorinsurance.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/Doctor";
import mongoose from "mongoose";

type Data =
  | { success: true; data?: any; message?: string }
  | { success: false; error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await dbConnect();

  try {
    const { method } = req;

    if (method === "POST") {
      // Create a new doctor record
      const { name, mobile, whatsapp } = req.body;
      if (!name || !mobile) {
        return res.status(400).json({ success: false, error: "name and mobile are required" });
      }

      const doc = await Doctor.create({
        name,
        mobile,
        whatsapp: typeof whatsapp === "boolean" ? whatsapp : true,
      });

      return res.status(201).json({ success: true, data: doc });
    }

    if (method === "GET") {
      // If id query provided -> return one
      const id = req.query.id as string | undefined;
      if (id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ success: false, error: "Invalid id" });
        }
        const doc = await Doctor.findById(id).lean();
        if (!doc) return res.status(404).json({ success: false, error: "Not found" });
        return res.status(200).json({ success: true, data: doc });
      }

      // otherwise list (with optional pagination query params later)
      const docs = await Doctor.find().sort({ createdAt: -1 }).limit(200).lean();
      return res.status(200).json({ success: true, data: docs });
    }

    if (method === "PUT") {
      // Update record. Accepts body with fields to update and id in either query or body
      const id = (req.query.id as string) || req.body.id;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Valid id is required (query or body)" });
      }

      const allowed = ["name", "mobile", "whatsapp", "specialization", "firstTime", "facility"];
      const updateBody: any = {};
      for (const k of allowed) {
        if (k in req.body) updateBody[k] = req.body[k];
      }

      const updated = await Doctor.findByIdAndUpdate(id, updateBody, { new: true });
      if (!updated) return res.status(404).json({ success: false, error: "Not found" });

      return res.status(200).json({ success: true, data: updated });
    }

    if (method === "DELETE") {
      const id = req.query.id as string;
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, error: "Valid id required" });
      }
      await Doctor.findByIdAndDelete(id);
      return res.status(200).json({ success: true, message: "Deleted" });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err: any) {
    console.error("API error:", err);
    return res.status(500).json({ success: false, error: err.message || "Server error" });
  }
}
