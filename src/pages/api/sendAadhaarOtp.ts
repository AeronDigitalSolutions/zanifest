import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { aadhaarNumber } = req.body;

    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      return res.status(400).json({ error: "Invalid Aadhaar number" });
    }

    const response = await fetch("https://sandbox.karza.in/v2/aadhaar-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-karza-key": process.env.KARZA_API_KEY as string,
      },
      body: JSON.stringify({ aadhaar_no: aadhaarNumber }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error sending Aadhaar OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
}
