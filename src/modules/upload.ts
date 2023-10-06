export interface UploadFileResponse {
  uri: string;
  cid: string;
}

export async function uploadFile(file: File): Promise<UploadFileResponse> {
  const body = new FormData();
  body.append(file.name, file, file.name);

  try {
    const response = await fetch('/uploads', {
      method: 'POST',
      body,
    });

    const json = await response.json();

    return json as UploadFileResponse;
  } catch (e: any) {
    console.error('Could not upload file', e);
    throw new Error(e);
  }
}
