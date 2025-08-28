// // pages/api/users/me.ts
// import type { NextApiRequest, NextApiResponse } from "next";
// import dbConnect from "@/lib/dbConnect";
// import Manager from "@/models/Manager";
// import jwt from "jsonwebtoken";
// import { verifyToken } from '../../../utils/verifyToken';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   if (req.method !== "GET") {
//     console.log("Invalid method:", req.method);
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     console.log("GET /api/managers/me called");
//     const authHeader = req.headers.authorization;
//     console.log("Authorization header:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       console.log("No authorization header or invalid format");
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decoded = verifyToken(token, process.env.JWT_SECRET!) as { id: string };
//     console.log("Decoded token:", decoded);

//     const manager = await Manager.findById(decoded.id).select("-password");
//     console.log("Manager found:", manager);

//     if (!manager) {
//       console.log("Manager not found with ID:", decoded.id);
//       return res.status(404).json({ message: "Manager not found" });
//     }

//     return res.status(200).json(manager);
//   } 
//   catch (err) {

//     console.log("error caught in /api/managers/me:");
//     console.error("Error in /api/managers/me:", err);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// }
