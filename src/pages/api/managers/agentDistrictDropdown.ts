import dbConnect from '@/lib/dbConnect';
import Manager from '@/models/Manager';

export default async function handler(req: { method: string; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { managers?: any[]; error?: string; message?: string; }): void; new(): any; }; }; }) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const managers = await Manager.find({ category: 'district' }).select('id name');
      res.status(200).json({ managers });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch district managers' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
