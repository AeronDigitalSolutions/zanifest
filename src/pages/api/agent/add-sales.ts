import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import Manager from "@/models/Manager";
import Sale from "@/models/sales/sale";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    await dbConnect();

    const token = req.cookies.agentToken;
    console.log("Received token:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized: Missing token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
    console.log("Decoded token:", decoded);


    if (!decoded || decoded.role !== "agent") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const { amount } = req.body;
    console.log("Received amount:", amount);

    if (typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid sales amount" });
    }

    const agent = await Agent.findById(decoded.id);
    console.log("Found agent:", agent);

    if (!agent) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }

    // ✅ Ensure agent has a DM assigned

    if (!agent.assignedTo) {
      return res.status(400).json({ success: false, message: "Agent not assigned to any DM" });
    }

    console.log("Agent assigned to DM:", agent.assignedTo);

    // ✅ Since assignedTo is string, use findOne
const manager = await Manager.findOne({ managerId: agent.assignedTo });

if (!manager) {
  console.error(
    `Manager lookup failed. agent.assignedTo: ${agent.assignedTo}, query: { managerId: "${agent.assignedTo}" }`
  );
  return res.status(404).json({
    success: false,
    message: `Manager not found for agent.assignedTo: ${agent.assignedTo}`,
  });
}


    console.log("Found manager:", manager);

    // ✅ Update lifetime sales
    agent.lifetimeSales = (agent.lifetimeSales || 0) + amount;
    console.log("Updated lifetime sales:", agent.lifetimeSales);


    // ✅ Update sales under current DM
    agent.currentDMSales = (agent.currentDMSales || 0) + amount;
    console.log("Updated sales under current DM:", agent.currentDMSales);

    // ✅ Save agent

    await agent.save();

    // ✅ Update manager's total sales
    manager.totalSales = (manager.totalSales || 0) + amount;
      console.log("Updated manager's total sales:", manager.totalSales);
    await manager.save();

    // ✅ Log sale
    await Sale.create({
      amount,
      agent: agent._id,
      districtManager: agent.assignedTo,
      saleDate: new Date(),
      saleStatus: "active",
    });
    console.log("Sale logged successfully");

    return res.status(200).json({
      success: true,
      message: "Sales updated successfully",
      newSales: {
        lifetime: agent.lifetimeSales,
        underCurrentDM: agent.currentDMSales,
      },
      managerSales: manager.totalSales,
    });

  } catch (error: any) {
    console.error("Error adding sales:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
