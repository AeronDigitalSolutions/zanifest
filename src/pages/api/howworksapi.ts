// /pages/api/howworksapi.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect"; 
import HowWorks from "@/models/howworks";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb", 
    },
  },
};


// Default initial data
const DEFAULT_STEPS = [
  { name: "", desc: "", image: "" },
  { name: "", desc: "", image: "" },
  { name: "", desc: "", image: "" },
];

const DEFAULT_SERVICES = Array.from({ length: 8 }, () => ({
  name: "",
  desc: "",
  image: "",
}));

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  console.log("DB connected for HowWorks");

  try {
    if (req.method === "GET") {
      console.log("GET /api/howworksapi");

      let data = await HowWorks.findOne({});
      console.log("Fetched data:", data);

      if (!data) {
        // Create default document if none exists
        data = await HowWorks.create({
          mainHeading: "",
          servicesHeading: "",
          steps: DEFAULT_STEPS,
          services: DEFAULT_SERVICES,
        });
        console.log("Created default data:", data);
      }

      return res.status(200).json({ data });
    }

    else if (req.method === "POST") {
      console.log("POST /api/howworksapi");

      const { mainHeading, servicesHeading, steps, services } = req.body;
      console.log("Incoming body:", req.body);

      let data = await HowWorks.findOne({});
      console.log("Existing data:", data);

      const updateFields: any = {};
      if (mainHeading !== undefined) updateFields.mainHeading = mainHeading;
      if (servicesHeading !== undefined) updateFields.servicesHeading = servicesHeading;
      if (steps !== undefined) updateFields.steps = steps;
      if (services !== undefined) updateFields.services = services;

      if (!data) {
        data = await HowWorks.create({
          mainHeading: mainHeading || "",
          servicesHeading: servicesHeading || "",
          steps: steps || DEFAULT_STEPS,
          services: services || DEFAULT_SERVICES,
        });
        console.log("Created new data:", data);
      } else {
        await HowWorks.updateOne({}, { $set: updateFields });
        data = await HowWorks.findOne({});
        console.log("Updated data:", data);
      }

      return res.status(200).json({ data });
    }

    else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (err) {
    console.error("Error in HowWorks API:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
