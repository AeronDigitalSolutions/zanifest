import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });

  await dbConnect();

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials (email)" });

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) return res.status(401).json({ message: "Invalid credentials(pwd)" });

  return res.status(200).json({ message: "Login successful", user: { email: user.email } });
}
