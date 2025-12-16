import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import AgentLogin from "@/models/AgentLogin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const data = req.body;

    // Required fields (agentCode removed)
    const required = [
      "firstName",
      "lastName",
      "email",
      "password",
      "phone",
      "city",
      "district",
      "state",
      "pinCode",
      "loginId",
    ];

    for (const field of required) {
      if (!data[field]) {
        return res.status(400).json({ error: `Missing: ${field}` });
      }
    }

    // Check loginId exists in AgentLogin table
    const loginRecord = await AgentLogin.findOne({ loginId: data.loginId });
    if (!loginRecord) {
      return res.status(400).json({ error: "Invalid loginId" });
    }

    // Check duplicate email only
    const existingAgent = await Agent.findOne({ email: data.email });
    if (existingAgent) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create agent
    const newAgent = new Agent({
      ...data,
      status: "pending",
    });

    await newAgent.save();

    res.status(201).json({ message: "Agent created successfully", newAgent });
  } catch (err: any) {
    console.error("Create Agent Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
