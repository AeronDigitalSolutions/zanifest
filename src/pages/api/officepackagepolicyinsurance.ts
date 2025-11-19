
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import OfficePackagePolicy from "@/models/OfficePackagePolicy";
import User from "@/models/User";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  let email: string | null = null;

  try {
    const token = req.cookies?.userToken;
    if (token) {
      const decoded: any = await verifyToken(token);
      if (decoded?.id) {
        const user = await User.findById(decoded.id).select("email");
        if (user) email = user.email;
      }
    }
  } catch (err) {
    console.log("Email detection failed:", err);
  }

  const { method } = req;

  try {
    if (method === "POST") {
      const data = req.body;

      const formattedOptions = (data.options || []).map((opt: any) => ({
        name: opt.name,
        checked: !!opt.checked,
        amount:
          opt.amount !== undefined && String(opt.amount).trim() !== ""
            ? Number(String(opt.amount).replace(/,/g, ""))
            : undefined,
      }));

      const created = await OfficePackagePolicy.create({
        companyName: data.companyName,
        mobile: data.mobile,
        email,                
        options: formattedOptions,
        pincode: data.pincode,
        firstTimeBuying: data.firstTimeBuying ? "Yes" : "No",
        lossHistory: data.lossHistory ? "Yes" : "No",
      });

      return res.status(201).json({ success: true, data: created });
    }

    if (method === "GET") {
      const all = await OfficePackagePolicy.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: all });
    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  } catch (err: any) {
    console.error("API error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
}
