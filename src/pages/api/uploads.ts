import { NextApiRequest, NextApiResponse } from 'next';
import { Buffer } from 'node:buffer';
import { Writable } from 'node:stream';

import { IncomingForm, File } from 'formidable';
import { Blob } from 'nft.storage';
import { nftStorage } from '../../modules/nftStorage';
import { appConfig } from '../../app.config';

export const config = {
  api: {
    bodyParser: false,
  },
};

interface Upload {
  name: string;
  url: string;
}

async function uploadBlob([name, blob]: [string, Blob]): Promise<Upload> {
  const cid = await nftStorage.storeBlob(blob);
  const url = `${appConfig.server('ipfsGateway')}/${cid}`;

  return { name, url };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<NextApiResponse<Upload[]>> {
  switch (req.method) {
    case 'POST':
      let blobs: [string, Blob][] = [];

      const form = new IncomingForm({
        //@ts-ignore
        fileWriteStreamHandler: (file: File) => {
          const chunks: any[] = [];

          const writable = new Writable({
            write(chunk, _, next) {
              chunks.push(chunk);
              next();
            },
            async final(cb) {
              const buffer = Buffer.concat(chunks);
              blobs = [...blobs, [file.originalFilename as string, new Blob([buffer])]];

              cb();
            },
          });
          return writable;
        },
      });

      return new Promise((resolve, reject) => {
        form.parse(req, async (err, _a, _b) => {
          if (err) {
            res.status(500);
            reject();
            return;
          }

          const uploads = await Promise.all(blobs.map(uploadBlob));

          res.status(200);
          res.json(uploads);

          resolve(res);
        });
      });

    default:
      return res.status(404);
  }
}
