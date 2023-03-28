export async function downloadFromUrl(url: string): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  const file = new File([blob], 'image.jpg', { type: blob.type });
  return file;
}
