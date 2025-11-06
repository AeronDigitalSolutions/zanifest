import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import TravelInsurance from "@/models/TravelInsurance";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const {
        countries,
        startDate,
        endDate,
        travellers,
        travellersInfo,
        medicalCondition,
      } = req.body;

      const newRecord = new TravelInsurance({
        countries,
        startDate,
        endDate,
        travellers,
        travellersInfo,
        medicalCondition,
      });

      const saved = await newRecord.save();
      return res.status(201).json({ success: true, data: saved });
    } catch (error: any) {
      console.error("❌ Error saving TravelInsurance:", error);
      return res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const data = await TravelInsurance.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
