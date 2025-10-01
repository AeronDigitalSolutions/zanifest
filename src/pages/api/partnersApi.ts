import { NextApiRequest, NextApiResponse } from "next";

// 🔹 Temporary in-memory storage (replace with DB later)
let partnersData = {
  heading: "Insurance Partner",
  categories: [
    { category: "Health Insurance", images: [] },
    { category: "Motor Insurance", images: [] },
    { category: "Fire Insurance", images: [] },
  ],
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(partnersData);
  }

  if (req.method === "POST") {
    const { heading, categories } = req.body;
    partnersData = {
      heading: heading || "Insurance Partner",
      categories: categories || partnersData.categories,
    };
    return res.status(200).json({ success: true, data: partnersData });
  }

  res.status(405).json({ error: "Method not allowed" });
}
