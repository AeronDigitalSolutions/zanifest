import type { NextApiRequest, NextApiResponse } from "next";
import Image from "@/models/Home";
import connectDB from "@/lib/dbConnect";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      await connectDB();
      const { id } = req.query;
      const { title, imageUrl } = req.body;

      const updated = await Image.findByIdAndUpdate(
        id,
        { title, imageUrl },
        { new: true }
      );

      res.status(200).json({ success: true, image: updated });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}
