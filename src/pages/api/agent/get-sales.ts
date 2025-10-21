// // /pages/api/agent/get-sales.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "@/lib/dbConnect";
// import Agent from "@/models/Agent";
// import Manager from "@/models/Manager";
// import Sale from "@/models/sales/sale";
// import ReassignmentHistory from "@/models/ReassignmentHistory";
// import jwt, { JwtPayload } from "jsonwebtoken";

// interface CustomJwtPayload extends JwtPayload {
//   id: string;
//   role: string;
//   email: string;
// }

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ success: false, message: "Method Not Allowed" });
//   }

//   try {
//     await dbConnect();

//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
//     if (!decoded || decoded.role !== "agent") {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     const agent = await Agent.findById(decoded.id);
//     if (!agent) {
//       return res.status(404).json({ success: false, message: "Agent not found" });
//     }

//     // ✅ Get all DMs from reassignment history
//     const reassignments = await ReassignmentHistory.find({ agentId: agent._id });
//     const dmIds = new Set<string>();

//     reassignments.forEach((r) => {
//       if (r.fromManager) dmIds.add(r.fromManager);
//       if (r.toManager) dmIds.add(r.toManager);
//     });

//     // Always include current DM
//     if (agent.assignedTo) dmIds.add(agent.assignedTo);

//     // ✅ Aggregate total sales made under each DM
//     const salesAgg = await Sale.aggregate([
//       { $match: { agent: agent._id } },
//       {
//         $group: {
//           _id: "$districtManager",
//           totalSales: { $sum: "$amount" },
//         },
//       },
//     ]);

//     // Convert to lookup object for easier merge
//     const salesMap = Object.fromEntries(salesAgg.map((s) => [s._id, s.totalSales]));

//     // ✅ Fetch DM details
//     const managers = await Manager.find({ managerId: { $in: Array.from(dmIds) } });

//     const dmHistory = managers.map((dm) => ({
//       dmId: dm.managerId,
//       dmName: dm.name,
//       sales: salesMap[dm.managerId] || 0,
//     }));

//     // ✅ Response structure
//     return res.status(200).json({
//       success: true,
//       sales: {
//         lifetime: agent.lifetimeSales || 0,
//         underCurrentDM: agent.currentDMSales || 0,
//         dmHistory,
//       },
//       assignedTo: agent.assignedTo,
//     });
//   } catch (error: any) {
//     console.error("Error fetching agent sales:", error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal Server Error", error: error.message });
//   }
// }
// /pages/api/agent/get-sales.ts
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import Manager from "@/models/Manager";
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

    // ✅ Correct query field: 'agent', not 'agentId'
    const reassignments = await ReassignmentHistory.find({ agent: agent._id });

    // ✅ Create a DM sales map from reassignment history
    const dmSalesMap: Record<string, number> = {};

    for (const r of reassignments) {
      if (r.fromManager) {
        dmSalesMap[r.fromManager] = (dmSalesMap[r.fromManager] || 0) + (r.salesUnderPrevDM || 0);
      }
    }

    // ✅ Add the agent’s current DM & its ongoing sales
    if (agent.assignedTo) {
      dmSalesMap[agent.assignedTo] = (dmSalesMap[agent.assignedTo] || 0) + (agent.currentDMSales || 0);
    }

    // ✅ Fetch manager names for all DMs
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

    // ✅ Return structured sales summary
    return res.status(200).json({
      success: true,
      sales: {
        lifetime: agent.lifetimeSales || 0,
        underCurrentDM: agent.currentDMSales || 0,
        dmHistory,
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
