import dbConnect from '@/lib/dbConnect';
import Manager from '@/models/Manager';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  console.log("Connected to database to fetch district managers");

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const token = req.cookies.managerToken;

    if (!token) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };

    const { id, role } = decoded;

    if (role !== 'state') {
      return res.status(403).json({ success: false, error: 'Only state managers can access this data' });
    }

    const districtManagers = await Manager.find({
      category: 'district',
      assignedTo: id,
    });

    console.log("Fetched district managers:", districtManagers);

    res.status(200).json({ success: true, data: districtManagers });
  } catch (error) {
    console.error("Error fetching district managers:", error);
    res.status(500).json({ success: false, error: 'Server error' });
  }
}
