import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import cookie, { serialize } from "cookie";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect"; // your DB logic
import User from "@/models/User"; // your User model

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { email, password } = req.body;
  await dbConnect();
  const user = await User.findOne({ email });

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, userName: user.userName },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  res.setHeader("Set-Cookie", serialize("userToken", token, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
  }));

res.status(200).json({
  name: user.userName || user.name || "",
  email: user.email || ""
});}