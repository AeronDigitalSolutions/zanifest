import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Shop from "@/models/Shop";

const MONGODB_URI = process.env.MONGODB_URI || "";

async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  try {
    switch (req.method) {
      case "POST":
        const newShop = await Shop.create(req.body);
        return res.status(201).json(newShop);

      case "GET":
        if (req.query.id) {
          const shop = await Shop.findById(req.query.id);
          if (!shop) return res.status(404).json({ message: "Shop not found" });
          return res.status(200).json(shop);
        }
        const shops = await Shop.find().sort({ createdAt: -1 });
        return res.status(200).json(shops);

      case "PUT":
        if (!req.query.id)
          return res.status(400).json({ message: "ID is required" });
        const updatedShop = await Shop.findByIdAndUpdate(req.query.id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedShop)
          return res.status(404).json({ message: "Shop not found" });
        return res.status(200).json(updatedShop);

      case "DELETE":
        if (!req.query.id)
          return res.status(400).json({ message: "ID is required" });
        const deletedShop = await Shop.findByIdAndDelete(req.query.id);
        if (!deletedShop)
          return res.status(404).json({ message: "Shop not found" });
        return res.status(200).json({ message: "Shop deleted successfully" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
