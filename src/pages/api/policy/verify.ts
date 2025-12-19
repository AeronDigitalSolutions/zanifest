import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import Policy from "@/models/Policy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    await connectDB();

    const {
      insuredName,
      policyNo,
      companyName,
      amount,
      expiryDate,
    } = req.body;

    if (!policyNo) {
      return res.status(400).json({
        success: false,
        message: "Policy number is required",
      });
    }

    // ✅ CREATE OR UPDATE (NO DUPLICATES)
    const policy = await Policy.findOneAndUpdate(
      { policyNo },
      {
        insuredName,
        companyName,
        amount,
        expiryDate,
        verified: true, // ✅ only schema fields
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      policy,
    });
  } catch (error) {
    console.error("VERIFY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
