import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import Sale from "@/models/sales/sale";
import Manager from "@/models/Manager";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST")
    return res.status(405).json({ success: false, message: "Method Not Allowed" });

  try {
    await dbConnect();

    const token = req.cookies.agentToken;
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { amount, clientName } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ success: false, message: "Invalid amount" });

    const agent = await Agent.findById(decoded.id);
    if (!agent) return res.status(404).json({ success: false, message: "Agent not found" });

    const dmId = agent.assignedTo;
    if (!dmId) return res.status(400).json({ success: false, message: "Agent not assigned to any DM" });

    let record = agent.dmSalesHistory.find((d: { dmId: any; }) => d.dmId === dmId);
    if (record) record.sales += amount;
    else agent.dmSalesHistory.push({ dmId, sales: amount });

    agent.lifetimeSales += amount;

    await agent.save();

    await Sale.create({
      amount,
      clientName,
      agent: agent._id,
      districtManager: dmId,
      saleDate: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "Sale added successfully",
      lifetimeSales: agent.lifetimeSales,
    });

  } catch (err: any) {
    console.error("Add Sale ERROR:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}
