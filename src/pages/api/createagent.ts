import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import upload from '@/utils/multer';
import dbConnect from '@/lib/dbConnect';
import Agent from '@/models/Agent';
import { IncomingFormFields, MulterFile } from '@/types/agent'; // custom types

// Extend the types for req.files from multer
interface ExtendedRequest extends NextApiRequest {
  files: MulterFile[];
  body: IncomingFormFields;
}

const handler = createRouter<ExtendedRequest, NextApiResponse>();

// Helper to convert multer middleware to a promise for Next.js
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// Middleware for handling multipart/form-data
handler.use(async (req, res, next) => {
  await runMiddleware(req, res, upload.any());
  next();
});

handler.post(async (req, res) => {
  await dbConnect();

  const formFields = req.body;
  const files = req.files;
  

  try {
    const agent = new Agent({
      ...formFields,
      attachments: files.map((file) => {
  const filePath = `/uploads/${file.originalname}`; // public path where the file is served

  return {
    filename: file.originalname,
    data: file.buffer,
    mimetype: file.mimetype,
    url: filePath, // ✅ Add this field to store URL
  };
}),
    });

    await agent.save();
    return res.status(201).json({ message: 'Agent created', agent });
  } 
  
  catch (error: any) {
    console.error('Error creating agent:', error);
    return res.status(400).json({ error: error.message || 'Failed to create agent' });
  }
});

// Required for multer to work with Next.js API routes
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ This is the correct way to export next-connect handler
export default handler.handler();





// import dbConnect from "@/lib/dbConnect";
// import Agent from "@/models/Agent";

// export default async function handler(req: { method: string; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message?: string; agent?: any; error?: any; }): void; new(): any; }; }; }) {
//   await dbConnect();

//   if (req.method === "POST") {
//     try {
//       const agent = new Agent(req.body);
//       console.log("Creating agent with data:", agent);
//       await agent.save();
//       return res.status(201).json({ message: "Agent created", agent });
//     } 
    
//     catch (error) {
//       if (error instanceof Error) {
//          console.log('error creating agent - error instanceof Error');
//         console.error("Error creating agent:", error.message);
//         return res.status(400).json({ error: error.message });
       
//       } 
//       else {
//          console.log('unknown error creating agent');
//         return res.status(400).json({ error: "An unknown error occurred" });
//       }
//     }
//   } else {
//     res.status(405).json({ message: "Method not allowed" });
//   }
// }
