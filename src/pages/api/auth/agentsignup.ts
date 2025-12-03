// pages/api/auth/agentsignup.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import AgentLogin from "@/models/AgentLogin";
import crypto from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    await dbConnect();

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // generate loginId
    const loginId = crypto.randomBytes(12).toString("hex");

    // Check duplicate email
    const exists = await AgentLogin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const newUser = new AgentLogin({
      name: userName, // FULL NAME
      email,
      password,
      loginId,
    });

    await newUser.save();

    return res.status(200).json({ loginId });

  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
}
