import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import uploadFile from '../../modules/uploadFile';

export default async function handler(req: NextApiRequest, res: NextApiResponse<object>) {
  const requestMethod = req.method;
  const body = JSON.parse(req.body);
  switch (requestMethod) {
    case 'POST':
      const form = new formidable.IncomingForm();

      const formPromise = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          if (err) reject(err);
          const file = files.uploadedFile;
          const document = await uploadFile(file);
          resolve(document);
        });
      });

      res.json(formPromise);
    default:
      res.status(400).json({ message: 'Invalid request' });
  }
}
