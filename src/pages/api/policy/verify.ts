import Policy from "@/models/Policy";
import { getAgentFromReq } from "@/utils/getAgentFromReq";
import connectDB from "@/lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const agent = await getAgentFromReq(req);
  if (!agent) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  await connectDB();

  const { policyNo, insuredName, companyName, amount, expiryDate } = req.body;

  // 🔴 DUPLICATE CHECK (SAME AGENT ONLY)
  const alreadyExists = await Policy.findOne({
    policyNo,
    agentId: agent._id,
  });

  if (alreadyExists) {
    return res.status(409).json({
      success: false,
      message: "Policy already exists for this agent",
    });
  }

  // ✅ SAVE NEW POLICY
  const policy = await Policy.create({
    agentId: agent._id,
    policyNo,
    insuredName,
    companyName,
    amount,
    expiryDate,
        assignedAt: new Date(), // ✅ IMPORTANT

    verified: true,
  });

  return res.status(200).json({
    success: true,
    policy,
  });
}
