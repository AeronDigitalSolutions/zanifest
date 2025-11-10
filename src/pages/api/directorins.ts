import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Director from "@/models/Director"; 

// 🔹 MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/yourdbname";

if (!mongoose.connection.readyState) {
  mongoose.connect(MONGODB_URI, {
    dbName: "yourdbname",
  });
}

// 🔹 Handler Function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  try {
    switch (method) {
      case "POST":
        const newDirector = await Director.create(req.body);
        return res.status(201).json({
          success: true,
          message: "Director created successfully",
          data: newDirector,
        });

      // 🔹 READ (GET all or one)
      case "GET":
        const { id } = req.query;
        if (id) {
          const director = await Director.findById(id);
          if (!director)
            return res.status(404).json({ success: false, message: "Director not found" });
          return res.status(200).json({ success: true, data: director });
        } else {
          const directors = await Director.find().sort({ createdAt: -1 });
          return res.status(200).json({ success: true, data: directors });
        }

      // 🔹 UPDATE a Director
      case "PUT":
        const { id: updateId } = req.query;
        if (!updateId)
          return res.status(400).json({ success: false, message: "ID is required for update" });
        const updatedDirector = await Director.findByIdAndUpdate(updateId, req.body, {
          new: true,
        });
        if (!updatedDirector)
          return res.status(404).json({ success: false, message: "Director not found" });
        return res.status(200).json({
          success: true,
          message: "Director updated successfully",
          data: updatedDirector,
        });

      // 🔹 DELETE a Director
      case "DELETE":
        const { id: deleteId } = req.query;
        if (!deleteId)
          return res.status(400).json({ success: false, message: "ID is required for delete" });
        const deletedDirector = await Director.findByIdAndDelete(deleteId);
        if (!deletedDirector)
          return res.status(404).json({ success: false, message: "Director not found" });
        return res.status(200).json({
          success: true,
          message: "Director deleted successfully",
        });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
