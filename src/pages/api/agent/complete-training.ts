import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import Agent from "@/models/Agent";
import dbConnect from "@/lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const token = req.cookies.agentToken;
  if (!token) return res.status(401).end();

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  const agent = await Agent.findByIdAndUpdate(
    decoded.id,
    { trainingCompleted: true },
    { new: true }
  );

  // 🔥 ISSUE NEW JWT WITH UPDATED trainingCompleted
  const newToken = jwt.sign(
    {
      id: agent._id,
      email: agent.email,
      role: "agent",
      accountStatus: agent.accountStatus,
      trainingCompleted: true,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  res.setHeader(
    "Set-Cookie",
    `agentToken=${newToken}; Path=/; HttpOnly; SameSite=Lax`
  );

  res.status(200).json({ success: true });
}
