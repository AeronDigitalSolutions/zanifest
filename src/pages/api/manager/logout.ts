import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  localStorage.removeItem("managerToken"); // or whatever key you use
  localStorage.removeItem("token"); // or whatever key you use
  res.setHeader(
    'Set-Cookie',
    serialize('managerToken', '', {
      httpOnly: true,
secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: '/',
      expires: new Date(0),
    })
  );
    console.log("Manager logged out successfully");
  res.status(200).json({ message: 'Logged out successfully' });
}
