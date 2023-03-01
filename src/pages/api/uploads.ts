import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import uploadFile from '../../modules/uploadFile';

export default async function handler(req: NextApiRequest, res: NextApiResponse<object>) {
  const requestMethod = req.method;
  const body = JSON.parse(req.body);
  console.log('Request body', body);
  switch (requestMethod) {
    case 'POST':
      const form = new formidable.IncomingForm();

      const formResult = await new Promise((resolve, reject) => {
        form.parse(req, async (err, fields, files) => {
          console.log('form err', err);
          if (err) reject(err);
          const file = files.file;
          const document = await uploadFile(file);
          resolve(document);
        });
      });
      console.log('Form promise', formResult);
      res.json(formResult);
    default:
      res.status(400).json({ message: 'Invalid request' });
  }
}
