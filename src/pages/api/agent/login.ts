// /pages/api/agent/login.ts
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  try {
    await dbConnect();
    const agent = await Agent.findOne({ email });

    if (!agent) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔐 If passwords are hashed: await bcrypt.compare(password, agent.password)
    const isPasswordValid = password === agent.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: agent._id,
        email: agent.email,
        name: agent.name,
        role: "agent",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, agent: { name: agent.name, email: agent.email, role: "agent" } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
