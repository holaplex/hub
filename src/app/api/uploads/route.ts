import { NextApiRequest } from 'next';
import formidable, { Fields, Files } from 'formidable';
import uploadFile from '../../../modules/uploadFile';
import { NextResponse } from 'next/server';
import { ok } from 'assert';
import { is, map, pipe, take, values, when } from 'ramda';

export interface FormData {
  fields: Fields;
  files: Files;
}

export async function POST(req: NextApiRequest) {
  const formResult = await new Promise<FormData>((resolve, reject) => {
    const form = new formidable.IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
      console.log('form err', err);
      if (err) reject(err);
      ok({ fields, files });
    });
  });
  const payload = pipe(values, map(when(is(Array), take(0))))(formResult.files) as File[];
  const uploadPromises = payload.map((file) => uploadFile(file as File));
  const files = await Promise.all(uploadPromises);

  return NextResponse.json(files);
}
