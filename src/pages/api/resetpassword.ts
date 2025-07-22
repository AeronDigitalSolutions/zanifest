import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import Admin from "@/models/Admin";
import type { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest,
  res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  console.log("Reset Password API called");

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    console.log("No session found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  await dbConnect();

  if(!session.user){
    console.log("No user in session");
    return res.status(401).json({ message: "Unauthorized - no user in session" });
  }

  const user = await Admin.findOne({ email: session.user?.email });

  if (!user || user.role !== "superadmin") {
    console.log("User not found or not a superadmin");
    return res.status(403).json({ message: "Only Superadmin can reset password" });
  }

  const { newPassword } = req.body;

  //just to check if password is really changing
  console.log("New Password:", newPassword);


  if (!newPassword || newPassword.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  console.log("Password reset successfully for user:", user.email);
  return res.status(200).json({ message: "Password reset successfully" });
}
