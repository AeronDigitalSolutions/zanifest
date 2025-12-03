import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 1️⃣ Get JWT token from cookies
    const token = req.cookies.userToken;

    if (!token) {
      return res.status(401).json({ message: "Not logged in" });
    }

    // 2️⃣ Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // 3️⃣ Normalize the user object for frontend consistency
    const userData = {
      name: decoded.userName || decoded.name || "",
      email: decoded.email || "",
    };

    // 4️⃣ Send user data back to frontend
    return res.status(200).json(userData);
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
