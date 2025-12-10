// /pages/api/policy/upload.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { formidable } from "formidable";
import { Writable } from "stream";
import { extractText } from "unpdf";

export const config = {
  api: { bodyParser: false },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    multiples: false,

    // Capture uploaded PDF fully in memory
    fileWriteStreamHandler: () => {
      const chunks: Buffer[] = [];

      return new Writable({
        write(chunk, _enc, cb) {
          chunks.push(Buffer.from(chunk));  
          cb();
        },
        final(cb) {
          // Attach merged buffer to stream
          // @ts-ignore
          this._buffer = Buffer.concat(chunks);
          cb();
        },
      });
    },
  });

  form.parse(req, async (err, fields, files: any) => {
    if (err) {
      console.error("FORM ERROR:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    const pdfFile = files?.pdf?.[0];
    if (!pdfFile) {
      console.error("NO PDF UPLOADED");
      return res.status(400).json({ error: "No PDF uploaded" });
    }

    try {
      // retrieve buffer
      // @ts-ignore
      const buffer: Buffer = pdfFile._writeStream._buffer;

      if (!buffer) {
        console.error("MISSING BUFFER", { pdfFile });
        return res.status(500).json({ error: "Failed to read PDF buffer" });
      }

      // Convert Buffer → Uint8Array for unpdf
      const uint8 = new Uint8Array(buffer);

      // Extract text
      const result = await extractText(uint8);

      return res.status(200).json({
        text: result.text ?? "",
      });
    } catch (error) {
      console.error("PDF EXTRACT ERROR:", error);
      return res.status(500).json({ error: "Failed to extract PDF text" });
    }
  });
}
