import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/dbConnect";
import Policy from "@/models/Policy";
import { getAgentFromReq } from "@/utils/getAgentFromReq";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const agent = await getAgentFromReq(req);
  if (!agent) {
    return res.status(401).json({
      success: false,
      message: "Agent not authenticated",
    });
  }

  const {
    insuredName,
    policyNo,
    companyName,
    amount,
    expiryDate,
    pdfUrl,
  } = req.body;

  if (!policyNo) {
    return res.status(400).json({
      success: false,
      message: "Policy number missing",
    });
  }

  await connectDB();

  const policy = await Policy.findOneAndUpdate(
    { policyNo, agentId: agent._id },
    {
      agentId: agent._id, // ✅ NOW EXISTS IN SCHEMA
      insuredName,
      companyName,
      amount,
      expiryDate,
      pdfUrl,
      verified: true,
    },
    { upsert: true, new: true }
  );

  return res.status(200).json({
    success: true,
    policy,
  });
}
