import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import Manager from "@/models/Manager";
import Sale from "@/models/sales/sale";
import ReassignmentHistory from "@/models/ReassignmentHistory";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    await dbConnect();

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
    if (!decoded || decoded.role !== "agent") {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const agent = await Agent.findById(decoded.id);
    if (!agent) {
      return res.status(404).json({ success: false, message: "Agent not found" });
    }

    // ✅ Fetch all individual sales — used for monthly, graph, etc.
    const allSales = await Sale.find({ agent: agent._id })
      .select("amount saleDate")
      .lean();

    // ✅ DM Transfer history
    const reassignments = await ReassignmentHistory.find({ agent: agent._id });

    const dmSalesMap: Record<string, number> = {};

    for (const r of reassignments) {
      if (r.fromManager) {
        dmSalesMap[r.fromManager] =
          (dmSalesMap[r.fromManager] || 0) + (r.salesUnderPrevDM || 0);
      }
    }

    if (agent.assignedTo) {
      dmSalesMap[agent.assignedTo] =
        (dmSalesMap[agent.assignedTo] || 0) + (agent.currentDMSales || 0);
    }

    const managerIds = Object.keys(dmSalesMap);
    const managers = await Manager.find({ managerId: { $in: managerIds } });

    const dmHistory = managerIds.map((dmId) => {
      const dm = managers.find((m) => m.managerId === dmId);
      return {
        dmId,
        dmName: dm ? dm.name : dmId,
        sales: dmSalesMap[dmId],
      };
    });

    return res.status(200).json({
      success: true,
      sales: {
        lifetime: agent.lifetimeSales || 0,
        underCurrentDM: agent.currentDMSales || 0,
        dmHistory,
        allSales,          // ✅ IMPORTANT — used by frontend
      },
      assignedTo: agent.assignedTo,
    });

  } catch (error: any) {
    console.error("Error fetching agent sales:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
