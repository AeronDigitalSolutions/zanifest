import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Agent from "@/models/Agent";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
  email: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect();
    console.log("Connected to MongoDB for adding sales")

    const token = req.cookies.adminToken;
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No admin token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;

    if (decoded.role !== "admin" && decoded.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { agentId, amount } = req.body;
    console.log("Received data:", { agentId, amount });

    if (!agentId || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid input" });
    }

    console.log("agent id exists")

    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    console.log("agent exists")

    console.log("adding current amount in sales" + agent?.sales)
    agent.sales = (agent.sales || 0) + amount;
    console.log("sales updated to " + agent.sales)
    await agent.save();

    return res.status(200).json({ message: "Sales updated successfully", newSales: agent.sales });
  } 
  
  catch (error) {
    console.error("Error adding sales:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
