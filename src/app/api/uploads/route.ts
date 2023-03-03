import { NextApiRequest } from 'next';
import formidable, { Fields, Files } from 'formidable';
import { NextResponse } from 'next/server';
import { ok } from 'assert';
import { is, map, pipe, take, values, when } from 'ramda';
import { NFTStorage } from 'nft.storage';
import { appConfig } from '../../../app.config';

export interface FormData {
  fields: Fields;
  files: Files;
}

async function uploadFile(file: File): Promise<string> {
  const client = new NFTStorage({
    token: appConfig.server('nftStorage'),
  });
  const metadata = await client.store({
    name: file.name,
    description: file.name,
    image: file,
  });
  return metadata.url;
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
