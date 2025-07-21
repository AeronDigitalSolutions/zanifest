// /pages/api/getagents.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect'; // adjust path based on your structure
import Agent from '@/models/Agent' ; // adjust path based on your model location

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const agents = await Agent.find({});
    return res.status(200).json({ agents });
  } catch (error) {
    console.error("Error fetching agents:", error);
    return res.status(500).json({ message: 'Server error' });
  }
}
