import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import AgentLogin from "@/models/AgentLogin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await dbConnect();
    const data = req.body;

    /* =================================================
       🔍 CHECK IF AGENT ALREADY EXISTS (EDIT MODE)
       ================================================= */
    const existingAgent = await Agent.findOne({
      loginId: data.loginId,
    });

    /* =================================================
       🔁 EDIT MODE (REJECTED AGENT RESUBMIT)
       ================================================= */
    if (existingAgent) {
      // ✅ update ONLY fields sent by frontend
      Object.keys(data).forEach((key) => {
        if (key !== "loginId") {
          existingAgent[key] = data[key];
        }
      });

      // 🔄 reset review state
      existingAgent.status = "pending";
      existingAgent.rejectedFields = [];
      existingAgent.rejectionRemark = "";

      await existingAgent.save();

      return res.status(200).json({
        message: "Application re-submitted successfully",
      });
    }

    /* =================================================
       🆕 FIRST-TIME AGENT CREATION
       ================================================= */
    const requiredFields = [
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

    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({ error: `Missing: ${field}` });
      }
    }

    // validate loginId exists
    const loginRecord = await AgentLogin.findOne({
      loginId: data.loginId,
    });
    if (!loginRecord) {
      return res.status(400).json({ error: "Invalid loginId" });
    }

    // prevent duplicate email
    const emailExists = await Agent.findOne({ email: data.email });
    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newAgent = new Agent({
      ...data,
      status: "pending",
    });

    await newAgent.save();

    return res.status(201).json({
      message: "Agent created successfully",
    });

  } catch (err) {
    console.error("Create Agent Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
