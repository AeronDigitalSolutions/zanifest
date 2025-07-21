import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Manager from '@/models/Manager';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

   const { name, email, password, district, state, category } = req.body;
   console.log('Received data:', { name, email, password, district, state, category });

  try {
    console.log('connecting to db for creating manager form');
     await dbConnect();

    if (!name || !email || !password || !district || !state || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const manager = await Manager.create({
      name,
      email,
      password,
      location: { district, state },
      category,
    });

    return res.status(201).json({ message: 'Manager created successfully', manager });
  } 
  catch (error) {
    console.error('Error creating manager:', error);
    
    return res.status(500).json({ message: 'Internal Server Error'});
  }
}
