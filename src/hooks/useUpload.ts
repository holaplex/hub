import {
  DropzoneInputProps,
  DropzoneRootProps,
  useDropzone,
  FileRejection,
  DropEvent
} from 'react-dropzone';

interface UploadContext {
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
  isDragActive: boolean;
}

type OnDropFn = <T extends File>(
  acceptedFiles: T[],
  fileRejections: FileRejection[],
  event: DropEvent
) => void;
export default function useUpload(onDrop: OnDropFn): UploadContext {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/svg': ['.svg']
    },
    maxSize: 2 * 1024 * 1024,
    onDrop

  });

  return {
    getInputProps,
    getRootProps,
    isDragActive
  };
}
