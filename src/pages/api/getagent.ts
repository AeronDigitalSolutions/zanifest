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
    console.log("Fetching agents for district manager", token);

    if (!token) {
      console.error('No token found');
      return res.status(401).json({ message: 'Unauthorized: No token found' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
      email: string;
      name: string;
    };

    if (decoded.role !== 'district') {
      return res.status(403).json({ message: 'Only district managers can view agents' });
    }

    // Fetch the manager's managerId from DB
    const Manager = (await import('@/models/Manager')).default;
    console.log("Decoded manager ID:", decoded.id);
    const managerDoc = await Manager.findById(decoded.id);
    // console.log("Manager document:", managerDoc);
    if (!managerDoc) {
      return res.status(404).json({ message: 'Manager not found' });
    }

    // Now fetch only the agents assigned to this district manager
    const agents = await Agent.find({ assignedTo: managerDoc.managerId });
    console.log("Fetched agents:", agents.map(a=> a.firstName));

    return res.status(200).json({ agents });
  } 
  
  catch (error) {
    console.log("eror fetching agents:", error);
    console.error('Error fetching agents:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}



// import { NextApiRequest, NextApiResponse } from 'next';
// import dbConnect from '@/lib/dbConnect'; // adjust path based on your structure
// import Agent from '@/models/Agent' ; // adjust path based on your model location

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   await dbConnect();

//   if (req.method !== 'GET') {
//     return res.status(405).json({ message: 'Method not allowed' });
//   }

//   try {
//     const agents = await Agent.find({});
//     return res.status(200).json({ agents });
//   } catch (error) {
//     console.error("Error fetching agents:", error);
//     return res.status(500).json({ message: 'Server error' });
//   }
// }
