import { formidable } from "formidable";
import { Writable } from "stream";
import { extractText } from "unpdf";
import type { NextApiRequest, NextApiResponse } from "next";

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
    const pdf = files?.pdf?.[0];
    if (!pdf) return res.status(400).json({ error: "No PDF" });

    // @ts-ignore
    const buffer: Buffer = pdf._writeStream._buffer;
    const result = await extractText(new Uint8Array(buffer));

    res.json({ text: result.text ?? "" });
  });
}
