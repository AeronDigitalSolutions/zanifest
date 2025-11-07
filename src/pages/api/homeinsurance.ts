import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import HomeInsurance from "@/models/Homeinsurance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { fullName, phoneNumber, coverOptions, propertyDetails } = req.body;

      if (!fullName || !phoneNumber) {
        return res.status(400).json({
          success: false,
          message: "Full name and phone number are required",
        });
      }

      const newRecord = await HomeInsurance.create({
        fullName,
        phoneNumber,
        coverOptions,
        propertyDetails,
      });

      return res.status(201).json({
        success: true,
        message: "Home insurance data saved successfully",
        data: newRecord,
      });
    } catch (error: any) {
      console.error(" Error saving data:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to save data",
      });
    }
  }

  if (req.method === "GET") {
    try {
      const records = await HomeInsurance.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: records });
    } catch (error: any) {
      console.error(" Error fetching data:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch data",
      });
    }
  }

  return res.status(405).json({ success: false, message: "Method not allowed" });
}
