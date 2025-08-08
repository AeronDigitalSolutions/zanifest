import { createRouter } from 'next-connect';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer to save to disk
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiRoute = createRouter<NextApiRequest, NextApiResponse>();

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

apiRoute.use(async (req: any, res: any, next: any) => {
  await runMiddleware(req, res, upload.single('image')); // field name = "image"
  next();
});

apiRoute.post((req: any, res: NextApiResponse) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = `/uploads/${file.filename}`; // accessible via /public/uploads

  return res.status(200).json({
    message: 'File uploaded successfully',
    filename: file.originalname,
    url: fileUrl,
  });
});

export default apiRoute;
