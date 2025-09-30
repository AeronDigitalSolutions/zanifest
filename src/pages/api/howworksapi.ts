// /pages/api/howworksapi.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect"; 
import HowWorks from "@/models/howworks";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  console.log("db connect howworks")

  if (req.method === "GET") {
    try {
      let data = await HowWorks.findOne({});
      if (!data) {
        data = await HowWorks.create({}); 
      }
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } else if (req.method === "POST") {
    try {
      const { mainHeading, servicesHeading, steps, services } = req.body; 
      let data = await HowWorks.findOne({});
      
      // Use $set to update only the fields present in the request body
      const updateFields: any = {};
      if (mainHeading !== undefined) updateFields.mainHeading = mainHeading;
      if (servicesHeading !== undefined) updateFields.servicesHeading = servicesHeading;
      if (steps) updateFields.steps = steps;
      if (services) updateFields.services = services;

      if (!data) {
        // Create a new document if none exists
        data = await HowWorks.create(updateFields);
      } else {
        // Update the existing document
        await HowWorks.updateOne({}, { $set: updateFields });
        data = await HowWorks.findOne({}); 
      }
      
      res.status(200).json(data);
    } catch (err) {
      console.error("Error saving data:", err);
      res.status(500).json({ error: "Failed to save data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}