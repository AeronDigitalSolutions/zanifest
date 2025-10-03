import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Partner from "@/models/partners";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const partners = await Partner.find({});
      return res.status(200).json({
        heading: partners[0]?.heading || "Insurance Partner",
        categories: [
          { category: "Health Insurance", images: partners.find(p => p.category === "Health Insurance")?.images || [] },
          { category: "Motor Insurance", images: partners.find(p => p.category === "Motor Insurance")?.images || [] },
          { category: "Fire Insurance", images: partners.find(p => p.category === "Fire Insurance")?.images || [] },
        ],
      });
    } catch (err) {
      console.error("GET Error", err);
      return res.status(500).json({ error: "Failed to fetch partners" });
    }
  }

  if (req.method === "POST") {
    try {
      const { heading, categories } = req.body;

      // Save/update each category in DB
      for (const cat of categories) {
        await Partner.findOneAndUpdate(
          { category: cat.category },
          { heading, images: cat.images },
          { upsert: true, new: true }
        );
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error("POST Error", err);
      return res.status(500).json({ error: "Failed to save partner data" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
