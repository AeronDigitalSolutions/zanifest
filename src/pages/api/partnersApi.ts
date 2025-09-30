import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';
import Partner from '@/models/partners';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
    console.log('DB Connected successfully');


  if (req.method === 'GET') {
    try {
      const partners = await Partner.find({});
      return res.status(200).json(partners);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch partners' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { category, heading, images } = req.body;

      if (!category) return res.status(400).json({ error: 'Category required' });

      const updateData: Partial<{ heading: string; images: string[] }> = {};
      if (heading !== undefined) updateData.heading = heading;
      if (images !== undefined) updateData.images = images;

      const updated = await Partner.findOneAndUpdate(
        { category },
        { $set: updateData },
        { new: true, upsert: true } // create if not exists
      );
      console.log('POST Partner updated/created:', updated);


      return res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to update partner', details: err });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
