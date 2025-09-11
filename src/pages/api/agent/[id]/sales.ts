// pages/api/agent/[id]/sales.js
//sales recording api
import dbConnect from "@/lib/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import Agent from "@/models/Agent";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await dbConnect();

  const { id } = req.query; // agent _id

  if (req.method === "POST") {
    try {
      const { amount } = req.body;

      if (!amount || amount <= 0) {
        return res.status(400).json({ success: false, message: "Invalid amount" });
      }

      const agent = await Agent.findById(id);
      if (!agent) {
        return res.status(404).json({ success: false, message: "Agent not found" });
      }

      // update sales
      agent.lifetimeSales += amount;
      agent.currentSales += amount;

      await agent.save();

      res.status(200).json({ success: true, data: agent });
    } 
    catch (error) {
      console.error("Error recording sales:", error);
      res.status(500).json({ success: false, error: "Server error" });
    }
  } 
  else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
