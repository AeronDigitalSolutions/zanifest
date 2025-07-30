// pages/api/admin/login.ts
import { NextApiRequest, NextApiResponse } from "next";
import Admin from "@/models/Admin";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;
  console.log("Admin login API called with email:", email);
  // console.log('Received password:', password);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    await dbConnect();
    const admin = await Admin.findOne({ email }).select("userName email role password");
    console.log("Admin found:", admin);

    if (!admin) {
      console.warn("Login failed: Admin not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
  
    console.log("db password", admin.password);

    if (!isMatch) {
      console.warn("Login failed: Password mismatch");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: admin._id,
        name: admin.userName,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    console.log("Token generated for admin:", admin.userName);
    console.log("Role of admin:", admin.role);

    // Set cookie with token
    res.setHeader(
      "Set-Cookie",
      serialize("adminToken", token, {
        httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      })
    );

    console.log("Token set in cookie for admin:", admin.userName);

    // Respond with minimal info
 return res.status(200).json({ token, role: admin.role });

  } catch (err) {
    console.error("Login server error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
