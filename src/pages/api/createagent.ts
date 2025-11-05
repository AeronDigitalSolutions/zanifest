import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Agent from '@/models/Agent';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { attachments, ...formFields } = req.body;
    console.log('Incoming data:', formFields);

    // 1️⃣ Required fields
    const requiredFields = [
      'firstName', 'lastName', 'email', 'password',
      'phone', 'agentCode', 'city', 'district',
      'state', 'pinCode', 'panNumber', 'adhaarNumber', 'assignedTo'
    ];

    console.log('Checking required fields');


    for (const field of requiredFields) {
      if (!formFields[field]) {
        return res.status(400).json({ error: `Field '${field}' is required` });
      }
    }
    console.log('All required fields are present');

    // 2️⃣ Validate assignedTo is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(formFields.assignedTo)) {
    //   return res.status(400).json({ error: "assignedTo must be a valid manager ObjectId" });
    // }

    // 3️⃣ Create agent
    const agent = new Agent({
      ...formFields,
      attachments: attachments || [],
      lifetimeSales: formFields.lifetimeSales || 0,
      currentDMSales: formFields.currentDMSales || 0,
    });

    console.log('Agent instance created:', agent);

    await agent.save();

    console.log('Agent created successfully:', agent._id);

    return res.status(201).json({ message: 'Agent created', agent });

  } catch (error: any) {
    console.error('Error creating agent:', error);

    // 4️⃣ Handle duplicate key errors
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `${duplicateKey} already exists` });
    }

    return res.status(400).json({ error: error.message || 'Failed to create agent' });
  }
}
