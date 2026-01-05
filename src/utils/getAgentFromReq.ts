import jwt from "jsonwebtoken";
import connectDB from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import { NextApiRequest } from "next";

export async function getAgentFromReq(req: NextApiRequest) {
  await connectDB();

  const token = req.cookies.agentToken;
  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // 🔥 USE Agent MODEL (MATCH LOGIN)
    const agent = await Agent.findById(decoded.id).select(
      "_id firstName lastName email role status"
    );

    return agent;
  } catch (err) {
    console.error("Token verify failed:", err);
    return null;
  }
}
