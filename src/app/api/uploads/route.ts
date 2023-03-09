import { NextApiRequest } from 'next';
import { Fields, Files, IncomingForm } from 'formidable';
import { NextResponse } from 'next/server';
import { ok } from 'assert';
import { is, map, pipe, take, values, when } from 'ramda';
import { nftStorage } from '../../../modules/upload';

export interface FormData {
  fields: Fields;
  files: Files;
}

async function uploadFile(file: File): Promise<string> {
  const metadata = await nftStorage.store({
    name: file.name,
    description: file.name,
    image: file,
  });
  return metadata.url;
}

export async function POST(req: NextApiRequest) {
  console.log('file uploads request', req);
  const formResult = await new Promise<FormData>((resolve, reject) => {
    const form = new IncomingForm({ keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
      console.log('form err', err);
      if (err) reject(err);
      ok({ fields, files });
    });
  });
  console.log('file uploads formresult', formResult);
  const payload = pipe(values, map(when(is(Array), take(0))))(formResult.files) as File[];
  console.log('file uploads payload', payload);
  const uploadPromises = payload.map((file) => uploadFile(file as File));
  const files = await Promise.all(uploadPromises);
  console.log('file uploads files', files);
  return NextResponse.json(files);
}
