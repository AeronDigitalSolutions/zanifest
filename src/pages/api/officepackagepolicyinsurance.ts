// pages/api/officepackagepolicyinsurance.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/dbConnect";
import OfficePackagePolicy from "@/models/OfficePackagePolicy";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { method } = req;

  try {
    if (method === "GET") {
      const { id } = req.query;
      if (id) {
        const doc = await OfficePackagePolicy.findById(id);
        if (!doc) return res.status(404).json({ error: "Not found" });
        return res.status(200).json(doc);
      }
      const docs = await OfficePackagePolicy.find().sort({ createdAt: -1 }).limit(200);
      return res.status(200).json(docs);
    }

    if (method === "POST") {
      const data = req.body;

      // Basic validation
      if (!data.companyName || !data.mobile) {
        return res.status(400).json({ error: "companyName and mobile are required" });
      }

      const options = (data.options || []).map((opt: any) => ({
        name: opt.name,
        checked: !!opt.checked,
        amount:
          opt.amount !== undefined && opt.amount !== null && String(opt.amount).trim() !== ""
            ? Number(String(opt.amount).replace(/,/g, "").replace(/\s/g, ""))
            : undefined,
      }));

      const created = await OfficePackagePolicy.create({
        companyName: data.companyName,
        mobile: data.mobile,
        options,
        pincode: data.pincode || undefined,
        firstTimeBuying: data.firstTimeBuying || null,
        lossHistory: data.lossHistory || null,
      });

      return res.status(201).json(created);
    }

    if (method === "PUT") {
      const data = req.body;
      const id = data._id || req.query.id;
      if (!id) return res.status(400).json({ error: "id required for update" });

      const update: any = {};
      if (data.companyName) update.companyName = data.companyName;
      if (data.mobile) update.mobile = data.mobile;
      if (data.options) {
        update.options = data.options.map((opt: any) => ({
          name: opt.name,
          checked: !!opt.checked,
          amount:
            opt.amount !== undefined && String(opt.amount).trim() !== ""
              ? Number(String(opt.amount).replace(/,/g, "").replace(/\s/g, ""))
              : undefined,
        }));
      }
      if (data.pincode !== undefined) update.pincode = data.pincode;
      if (data.firstTimeBuying !== undefined) update.firstTimeBuying = data.firstTimeBuying;
      if (data.lossHistory !== undefined) update.lossHistory = data.lossHistory;

      const updated = await OfficePackagePolicy.findByIdAndUpdate(id, update, { new: true });
      if (!updated) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(updated);
    }

    if (method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "id query param required" });
      const deleted = await OfficePackagePolicy.findByIdAndDelete(id as string);
      if (!deleted) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ ok: true });
    }
    
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err: any) {
    console.error("API error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
