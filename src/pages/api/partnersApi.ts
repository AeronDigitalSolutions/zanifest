import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Partner from "@/models/partners";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const partners = await Partner.find({});
      const heading = partners[0]?.heading || ""; // no default heading
      const categories = partners.map(p => ({
        category: p.category,
        images: p.images,
      }));
      return res.status(200).json({ heading, categories });
    }

    if (req.method === "POST") {
      const { heading, categories } = req.body;

      // Update heading for ALL categories and save images
      for (const cat of categories) {
        await Partner.findOneAndUpdate(
          { category: cat.category },
          { heading, images: cat.images },
          { upsert: true, new: true }
        );
      }

      return res.status(200).json({ success: true });
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
