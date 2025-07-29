import connectDB from "@/lib/dbConnect";
import Manager from "@/models/Manager";
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Manager login API called");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password } = req.body;
  console.log("Received data:", { email, password });
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    await connectDB();
    console.log("Connected to database - for manager login");

    const manager = await Manager.findOne({ email });

    if (!manager) {
      console.log("Manager not found with email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // const isMatch = await bcrypt.compare(password, manager.password);
    if (password!==manager.password) {
      console.log("Password mismatch for manager:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: manager._id,
        role: manager.category, 
        name: manager.name,
    email: manager.email,
    // assuming 'category' is the field for role
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    // After you generate the token:
      res.setHeader("Set-Cookie", serialize("managerToken", token, {
        httpOnly: true, // safer, not accessible via JS
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: 60 * 60 * 24, // 1 day
      }));

    return res.status(200).json({
      token,
      role: manager.category,
      name: manager.name,
      
    });

  } 
  
  catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
