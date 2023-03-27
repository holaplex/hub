export async function uploadFile(file: File): Promise<{ url: string; name: string }> {
  const body = new FormData();
  body.append(file.name, file, file.name);

  try {
    const response = await fetch('/api/uploads', {
      method: 'POST',
      body,
    });
    const json = await response.json();
    return json[0];
  } catch (e: any) {
    console.error('Could not upload file', e);
    throw new Error(e);
  }
}
