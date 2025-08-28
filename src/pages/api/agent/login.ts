// /pages/api/agent/login.ts
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { email, password } = req.body;

  try {
    await dbConnect();
    const agent = await Agent.findOne({ email });

    if (!agent) {
      console.log(`Login attempt failed. Email not found: ${email}`);
      return res.status(401).json({ message: "Invalid credentials. Email not found in DB" });
    }

    // 🔐 If passwords are hashed: await bcrypt.compare(password, agent.password)
    const isPasswordValid = password === agent.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials. Password Mismatched" });
    }

    if(agent.accountStatus !== 'active') {
      console.log(`Login attempt blocked for inactive account: ${email}`);
      return res.status(403).json({ message: "Account is not active. Please contact support." });
    }

    const fullName = `${agent.firstName} ${agent.lastName || ""}`.trim();

    const token = jwt.sign(
      {
        id: agent._id,
        email: agent.email,
        accountStatus: agent.accountStatus,
        fullName,
        role: "agent",
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );


// Inside your try block (after generating the token)
res.setHeader('Set-Cookie', serialize('agentToken', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: '/',
  maxAge: 60 * 60 * 24, // 1 day
}));


    res.status(200).json({ token, agent: { name: fullName, email: agent.email, accountStatus:agent.accountStatus, role: "agent" } });
  } 
  
  catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
}
