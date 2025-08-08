// pages/api/manager/create.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Manager from '@/models/Manager';
import upload from '@/utils/multer';
import { runMiddleware } from '@/utils/runMiddleware';

export const config = {
  api: {
    bodyParser: false, // important for multer to work
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const contentType = req.headers['content-type'] || '';
if (contentType.includes('multipart/form-data')) {
  await runMiddleware(req, res, upload.fields([
    { name: 'managerPanAttachment', maxCount: 1 },
    { name: 'managerAadharAttachment', maxCount: 1 },
    { name: 'nomineePanAttachment', maxCount: 1 },
    { name: 'nomineeAadharAttachment', maxCount: 1 },
    { name: 'cancelledChequeAttachment', maxCount: 1 },
  ]));
}


    await dbConnect();

    console.log("connected to db");

    const {
      firstName,
      lastName,
      email,
      phone,
      managerId,
      dateOfJoining,
      password,
      pinCode,
      city,
      district,
      state,
      managerPanNumber,
      managerAadharNumber,
      nomineeName,
      nomineeRelation,
      nomineePanNumber,
      nomineeAadharNumber,
      accountHoldername,
      bankName,
      accountNumber,
      ifscCode,
      branchLoaction,
      category,
      assignedTo,
    } = req.body;

    console.log("the data in form ", req.body)

    // Validate required fields
    if (
      !firstName || !lastName || !email || !phone || !managerId || !password ||
      !pinCode || !city || !district || !state || !category
    ) {
      console.log("some field is missing");
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let assignedToId = null;

    // Hierarchy logic for non-national managers
    if (category !== 'national') {
      if (!assignedTo) {
        return res.status(400).json({
          message: 'assignedTo is required for state and district managers',
        });
      }

      if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
        return res.status(400).json({ message: 'Invalid assignedTo ID format' });
      }

      const assignedManager = await Manager.findById(assignedTo);


      if (!assignedManager) {
        return res.status(400).json({ message: `Assigned manager not found: ${assignedTo}` });
      }

      console.log("maanger assigned");

      if (
        (category === 'state' && assignedManager.category !== 'national') ||
        (category === 'district' && assignedManager.category !== 'state')
      ) {
        return res.status(400).json({
          message: `Invalid assignment. A ${category} manager must be assigned to a ${category === 'state' ? 'national' : 'state'} manager.`,
        });
      }

      assignedToId = assignedManager._id;
    }

    const files = (req as any).files;

    console.log("creating new manager");

    const newManager = new Manager({
      firstName,
      lastName,
      email,
      phone,
      managerId,
      dateOfJoining: dateOfJoining || new Date(),
      password,
      pinCode,
      city,
      district,
      state,

      managerPanNumber,
      managerAadharNumber,

      nomineeName,
      nomineeRelation,
      nomineePanNumber,
      nomineeAadharNumber,

      accountHoldername,
      bankName,
      accountNumber,
      ifscCode,
      branchLoaction,

      managerPanAttachment: files?.managerPanAttachment?.[0]?.originalname || null,
      managerAadharAttachment: files?.managerAadharAttachment?.[0]?.originalname || null,
      nomineePanAttachment: files?.nomineePanAttachment?.[0]?.originalname || null,
      nomineeAadharAttachment: files?.nomineeAadharAttachment?.[0]?.originalname || null,
      cancelledChequeAttachment: files?.cancelledChequeAttachment?.[0]?.originalname || null,

      category,
      assignedTo: assignedToId,
    });

    await newManager.save();

    return res.status(201).json({
      message: 'Manager created successfully',
      manager: newManager,
    });

  } catch (error: any) {
    console.error('❌ Error creating manager:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// import type { NextApiRequest, NextApiResponse } from 'next';
// import mongoose from 'mongoose';
// import dbConnect from '@/lib/dbConnect';
// import Manager from '@/models/Manager';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ message: 'Method Not Allowed' });
//   }

//   try {
//     await dbConnect();

//     const {
//       managerId,
//       name,
//       email,
//       password,
//       state,
//       district,
//       category,
//       assignedTo, // this is _id of the superior manager from dropdown
//     } = req.body;

//     console.log("Creating manager with data:", req.body);

//     // Step 1: Validation
//     if (!managerId || !name || !email || !password || !category) {
//       console.error('Missing required fields:', req.body);
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     let assignedToId = null;

//     // Step 2: If not national, validate assignedTo
//     if (category !== 'national') {
//       if (!assignedTo) {
//         return res.status(400).json({
//           message: 'assignedTo is required for state and district managers',
//         });
//       }

//       // Validate ObjectId
//       if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
//         return res.status(400).json({ message: 'Invalid assignedTo ID format' });
//       }

//       // Step 3: Fetch assigned manager by _id
//       const assignedManager = await Manager.findById(new mongoose.Types.ObjectId(assignedTo));
//       console.log("Assigned manager found:", assignedManager);

//       if (!assignedManager) {
//         console.error('Assigned manager not found:', assignedTo);
//         return res.status(400).json({ message: `Assigned manager not found: ${assignedTo}` });
//       }

//       // Step 4: Validate hierarchy logic
//       if (
//         (category === 'state' && assignedManager.category !== 'national') ||
//         (category === 'district' && assignedManager.category !== 'state')
//       ) {
//         return res.status(400).json({
//           message: `Invalid assignment. A ${category} manager must be assigned to a ${category === 'state' ? 'national' : 'state'} manager.`,
//         });
//       }

//       assignedToId = assignedManager._id;
//       console.log("Resolved assignedTo ID:", assignedToId);
//     }

//     // Step 5: Create and Save Manager
//     const newManager = new Manager({
//       managerId,
//       name,
//       email,
//       password,
//       location: {
//         state,
//         district,
//       },
//       category,
//       assignedTo: assignedToId,
//     });

//     console.log("New manager object ready to save:", newManager);

//     await newManager.save();

//     console.log('✅ Manager created successfully:', newManager);
//     return res.status(201).json({ message: 'Manager created successfully', manager: newManager });

//   } catch (error) {
//     console.error('❌ Error creating manager:', error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// }




// // import { NextApiRequest, NextApiResponse } from 'next';
// // import dbConnect from '@/lib/dbConnect';
// // import Manager from '@/models/Manager';

// // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// //   if (req.method !== 'POST') {
// //     return res.status(405).json({ message: 'Method Not Allowed' });
// //   }

// //   const { managerId, name, email, password, district, state, category, assignedTo } = req.body;
// //   console.log("Creating manager with data:", req.body);

// //   try {
// //     await dbConnect();

// //     if (!managerId || !name || !email || !password || !district || !state || !category) {
// //       console.error('Missing required fields:', req.body);
// //       console.log("Required fields are missing for manager creation");
// //       return res.status(400).json({ message: 'Missing required fields' });
// //     }

// //     const existing = await Manager.findOne({ managerId });
// //     if (existing) {
// //       console.error('Manager ID already exists:', managerId);
// //       return res.status(400).json({ message: 'Manager ID already exists' });
// //     }

// //     // 🛠 Convert managerId string (like SM1) to MongoDB ObjectId
// //     let assignedToObjectId = null;
// //     if (category !== 'national') {
// //       const assignedManager = await Manager.findOne({ managerId: assignedTo });

// //       if (!assignedManager) {
// //         console.error('Assigned manager not found:', assignedTo);
// //         return res.status(400).json({ message: 'Assigned manager not found' });
// //       }
// //       assignedToObjectId = assignedManager._id;
// //       console.log('Assigned manager found:', assignedManager);
// //     }

// //     const manager = await Manager.create({
// //       managerId,
// //       name,
// //       email,
// //       password,
// //       location: { district, state },
// //       category,
// //       assignedTo: assignedToObjectId,
// //     });



// //     console.log('Manager created successfully:', manager);
// //     return res.status(201).json({ message: 'Manager created successfully', manager });
// //   } 
  
// //   catch (error) {
// //     console.error('Error creating manager:', error);
// //     return res.status(500).json({ message: 'Internal Server Error' });
// //   }
// // }
