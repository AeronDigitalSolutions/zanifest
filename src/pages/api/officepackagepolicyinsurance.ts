import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import OfficePackagePolicy from "@/models/OfficePackagePolicy";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "POST") {
    let email = req.body.email || null;

    try {
      const token = req.cookies?.userToken;
      if (token) {
        const decoded: any = await verifyToken(token);
        const user = await User.findById(decoded.id);
        if (user) email = user.email;
      }
    } catch (e) {}

    const data = req.body;

    // FIXED: use original strings ("Yes" / "No")
    const created = await OfficePackagePolicy.create({
      companyName: data.companyName,
      mobile: data.mobile,
      email,
      options: data.options,
      pincode: data.pincode,
      firstTimeBuying: data.firstTimeBuying, 
      lossHistory: data.lossHistory,
    });

    return res.status(201).json({ success: true, data: created });
  }

  if (req.method === "GET") {
    const all = await OfficePackagePolicy.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: all });
  }

  return res.status(405).json({ success: false });
}
