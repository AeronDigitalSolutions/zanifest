// pages/api/p.ts
import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import PlanRequest from "@/models/Marinemodule";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  console.log("📩 Incoming request:", req.method, req.body);

  try {
    //CREATE (POST)
    if (req.method === "POST") {
      let {
        phoneNumber,
        commodity,
        coverType,
        shipmentType,
        companyName,
        transportMode,
        coverAmount,
      } = req.body;

      if (!phoneNumber) {
        return res.status(400).json({ success: false, message: "Phone number is required" });
      }

      // Normalize phone - remove spaces
      phoneNumber = String(phoneNumber).replace(/\s+/g, "");

      // If it's 10 digits without +91, prefix +91 for consistency
      if (/^\d{10}$/.test(phoneNumber)) {
        phoneNumber = "+91" + phoneNumber;
      }

      // Validate Indian phone number format
      if (!/^(\+91)?[6-9]\d{9}$/.test(phoneNumber)) {
        return res.status(400).json({ success: false, message: "Invalid phone number format" });
      }

      // Optionally normalize coverAmount to string (remove commas) if provided
      if (coverAmount && typeof coverAmount === "string") {
        coverAmount = coverAmount.replace(/,/g, "");
      }

      const record = await PlanRequest.findOneAndUpdate(
        { phoneNumber },
        {
          $set: {
            ...(commodity && { commodity }),
            ...(coverType && { coverType }),
            ...(shipmentType && { shipmentType }),
            ...(companyName && { companyName }),
            ...(transportMode && { transportMode }),
            ...(coverAmount && { coverAmount }),
          },
        },
        { new: true, upsert: true }
      );

      console.log("Saved record:", record);
      return res.status(200).json({ success: true, data: record });
    }

    // READ ALL
    if (req.method === "GET") {
      const allData = await PlanRequest.find().sort({ createdAt: -1 });
      console.log("Fetched records:", allData);
      return res.status(200).json(allData);
    }

    // UPDATE (PUT)
    if (req.method === "PUT") {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ message: "ID is required for update" });

      const updated = await PlanRequest.findByIdAndUpdate(id, updates, { new: true });
      console.log("Updated record:", updated);
      return res.status(200).json(updated);
    }

    // DELETE BY ID
    if (req.method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ message: "ID is required for delete" });

      await PlanRequest.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    }

    //Invalid Method
    return res.status(405).json({ message: "Method not allowed" });
  } catch (err: any) {
    console.error("API Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
