// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "@/lib/dbConnect";
// import Agent from "@/models/Agent";
// import Manager from "@/models/Manager";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   const { id } = req.query;

//   if (req.method === "PUT") {
//     try {
//       const { assignedTo } = req.body;
//       console.log("Received assignedTo:", assignedTo);

//       if (!assignedTo) {
//         return res.status(400).json({ success: false, message: "Manager ID is required" });
//       }

//       const updatedManager = await Manager.findByIdAndUpdate(
//       id,
//       { assignedTo }, // this is managerId string
//       { new: true }
//     );

//     if (!updatedManager) {
//       return res.status(404).json({ success: false, message: "Manager not found" });
//     }

//     res.status(200).json({ success: true, agent: updatedManager });

//     } 
//     catch (error) {
//       console.error("Error updating assignedTo:", error);
//       res.status(500).json({ success: false, message: "Failed to update manager assignment" });
//     }
//   } else {
//     res.setHeader("Allow", ["PUT"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


// pages/api/manager/[id]/assign.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import Manager from "@/models/Manager";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { id } = req.query; // smaller manager's _id

  if (req.method === "PUT") {
    try {
      const { assignedTo } = req.body; // managerId string of higher manager
      if (!assignedTo) return res.status(400).json({ success: false, message: "Manager ID is required" });

      // Find smaller manager
      const smallerManager = await Manager.findById(id);
      if (!smallerManager) return res.status(404).json({ success: false, message: "Manager not found" });

      // Find higher manager by managerId
      const higherManager = await Manager.findOne({ managerId: assignedTo });
      if (!higherManager) return res.status(404).json({ success: false, message: "Higher manager not found" });

      // Validate hierarchy
      if (smallerManager.category === "state" && higherManager.category !== "national")
        return res.status(400).json({ success: false, message: "State manager can only be assigned to a National manager" });

      if (smallerManager.category === "district" && higherManager.category !== "state")
        return res.status(400).json({ success: false, message: "District manager can only be assigned to a State manager" });

      // Update assignedTo
      smallerManager.assignedTo = higherManager._id;
      await smallerManager.save();

      // Populate assignedTo for frontend display
      await smallerManager.populate("assignedTo", "managerId firstName lastName");

      return res.status(200).json({ success: true, manager: smallerManager });

    } catch (error) {
      console.error("Error updating assignedTo:", error);
      return res.status(500).json({ success: false, message: "Failed to update manager assignment" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

