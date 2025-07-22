import { NextApiRequest, NextApiResponse } from "next";
import Admin from "@/models/Admin"; // adjust path
import dbConnect from "@/lib/dbConnect"; // your db connection
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecret';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    console.log("Admin found:", admin);

    if (!admin) {
        console.log("Admin not found for email:", email);
      return res.status(401).json({ message: "Not Authorized" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
        console.log("Password mismatch for admin:", email);
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
        email: admin.email,
        name: admin.name,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, role: admin.role });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err });
  }
}
