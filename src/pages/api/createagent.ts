// pages/api/createagent.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import AgentLogin from "@/models/AgentLogin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    await dbConnect();
    const data = req.body;

    const required = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phone",
      "agentCode",
      "city",
      "district",
      "state",
      "pinCode",
      "loginId",
    ];

    for (const r of required) {
      if (!data[r]) {
        return res.status(400).json({ error: `Missing: ${r}` });
      }
    }

    // ensure loginId exists in AgentLogin
    const loginRecord = await AgentLogin.findOne({ loginId: data.loginId });
    if (!loginRecord) {
      return res.status(400).json({ error: "Invalid loginId" });
    }

    // ensure unique agentCode & email
    const existingAgent = await Agent.findOne({ $or: [{ agentCode: data.agentCode }, { email: data.email }] });
    if (existingAgent) {
      return res.status(400).json({ error: "Agent code or email already exists" });
    }

    const agent = new Agent({
      ...data,
      status: "pending",
    });

    await agent.save();

    return res.status(201).json({ message: "Agent created", agent });
  } catch (err: any) {
    console.error("Create Agent Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
