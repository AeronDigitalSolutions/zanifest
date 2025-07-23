import dbConnect from '@/lib/dbConnect';
import Manager from '@/models/Manager';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
    console.log("Connected to database to fetch district managers");
  if (req.method === 'GET') {
    try {
      const districtManagers = await Manager.find({ category: 'district' });
      console.log("Fetched district managers:", districtManagers);
      res.status(200).json({ success: true, data: districtManagers });
    } catch (error) {
        console.error("Error fetching district managers:", error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
