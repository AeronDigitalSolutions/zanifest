import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import Sale from "@/models/sales/sale";
import Manager from "@/models/Manager";
import jwt from "jsonwebtoken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET")
    return res.status(405).json({ success: false, message: "Method Not Allowed" });

  try {
    await dbConnect();

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const agent = await Agent.findById(decoded.id);
    if (!agent) return res.status(404).json({ success: false, message: "Agent not found" });

    const allSales = await Sale.find({ agent: agent._id }).select("amount saleDate").lean();

    // ⭐ Join DM Name for modal breakdown
    const dmIds = agent.dmSalesHistory.map((d: { dmId: any; }) => d.dmId);
    const managers = await Manager.find({ managerId: { $in: dmIds } });

    const dmHistory = agent.dmSalesHistory.map((item: { dmId: any; sales: any; }) => {
      const dm = managers.find((m) => m.managerId === item.dmId);
      return {
        dmId: item.dmId,
        dmName: dm ? `${dm.firstName} ${dm.lastName}` : item.dmId,
        sales: item.sales,
      };
    });

    return res.status(200).json({
      success: true,
      sales: {
        lifetime: agent.lifetimeSales || 0,
        dmHistory,
        allSales,
      },
      assignedTo: agent.assignedTo,
    });

  } catch (err: any) {
    console.error("Get Sales Error:", err);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
}
