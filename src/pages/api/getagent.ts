// pages/api/getagent.ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Agent from '@/models/Agent';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const token = req.cookies.managerToken;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string; // Manager Mongo _id as string
      role: string;
      email: string;
      name: string;
    };

    if (decoded.role !== 'district') {
      return res.status(403).json({ message: 'Only district managers can view agents' });
    }

    // Try to load Manager to retrieve legacy managerId (like "DM0101")
    let managerDoc: any = null;
    try {
      const Manager = (await import('@/models/Manager')).default;
      managerDoc = await Manager.findById(decoded.id);
    } catch {
      // Manager model might not exist or not needed; continue
    }

    // Build a list of IDs that could be stored in Agent.assignedTo
    const candidates: string[] = [];
    if (decoded.id) candidates.push(decoded.id); // manager _id
    if (managerDoc?._id) candidates.push(managerDoc._id.toString());
    if (managerDoc?.managerId) candidates.push(String(managerDoc.managerId)); // legacy code e.g., "DM0101"

    const possibleIds = Array.from(new Set(candidates.filter(Boolean)));

    // Defensive query supports both new (_id) and legacy ("DM0101") values
    const agents = await Agent.find({ assignedTo: { $in: possibleIds } });

    console.log('[getagent]', {
      possibleIds,
      returnedCount: agents.length,
      sampleAssignedTo: agents[0]?.assignedTo,
    });

    return res.status(200).json({ agents });
  } catch (error: any) {
    console.error('Error fetching agents:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}
