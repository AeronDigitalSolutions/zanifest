import type { NextApiRequest, NextApiResponse } from "next";
import { formidable } from "formidable";
import { Writable } from "stream";
import { extractText } from "unpdf";

export const config = { api: { bodyParser: false } };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({
    fileWriteStreamHandler: () => {
      const chunks: Buffer[] = [];
      return new Writable({
        write(chunk, _e, cb) {
          chunks.push(Buffer.from(chunk));
          cb();
        },
        final(cb) {
          // @ts-ignore
          this._buffer = Buffer.concat(chunks);
          cb();
        },
      });
    },
  });

  form.parse(req, async (_err, _fields, files: any) => {
    const pdfFile = files?.pdf?.[0];
    if (!pdfFile) return res.status(400).json({ error: "No PDF" });

    // @ts-ignore
    const buffer: Buffer = pdfFile._writeStream._buffer;
    const text = (await extractText(new Uint8Array(buffer))).text || "";

    res.json({ text });
  });
}
