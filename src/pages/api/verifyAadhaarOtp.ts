import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { client_id, otp } = req.body;

    if (!client_id || !otp) {
      return res.status(400).json({ error: "Missing client_id or OTP" });
    }

    const response = await fetch("https://sandbox.karza.in/v2/aadhaar-otp-verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-karza-key": process.env.KARZA_API_KEY as string,
      },
      body: JSON.stringify({ client_id, otp }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error verifying Aadhaar OTP:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
}
