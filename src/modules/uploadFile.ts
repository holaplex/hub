import { NFTStorage, File, Token } from 'nft.storage';

const client = new NFTStorage({
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGJjMmIzQjM1NTJDMWZGZTg5MTAzMjZjRTI0MzllRkFBQ2NFM2UxMWIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NzU5MzM5ODM3NiwibmFtZSI6Imh1YnRlc3QifQ.a_o3-pp_ua6ReyoARCWpGJTRrynFGYpZ1LyURNTF2f0',
});

export default async function uploadFile(file: File): Promise<string> {
  const metadata = await client.store({
    name: file.name,
    description: file.name,
    image: file,
  });
  return metadata.url;
}
