// /pages/api/manager/sales-summary.ts

import dbConnect from "@/lib/dbConnect";
import Sale from "@/models/sales/sale";
import Manager from "@/models/Manager";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

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
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
    const managerId = decoded.managerId || decoded.id;

    const manager = await Manager.findOne({ managerId });
    if (!manager) {
      return res.status(404).json({ success: false, message: "Manager not found" });
    }

    // 🔹 Fetch all sales linked to this DM
    const sales = await Sale.find({ districtManager: manager.managerId });

    const totalSales = sales.reduce((sum, s) => sum + s.amount, 0);

    // Optional: compute per-agent summary
    const agentSalesMap: Record<string, number> = {};
    sales.forEach(sale => {
      const key = sale.agent.toString();
      agentSalesMap[key] = (agentSalesMap[key] || 0) + sale.amount;
    });

    return res.status(200).json({
      success: true,
      totalSales,
      agentSalesMap,
      sales,
    });

  } catch (err: any) {
    console.error("Error fetching manager sales:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
