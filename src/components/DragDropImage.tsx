import clsx from 'clsx';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface IProps {
  onDrop: (file: File) => void;
  className?: string;
}

const DragDropImage = ({ onDrop, className }: IProps) => {
  const [file, setFile] = useState<File | null>(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/svg': ['.svg'],
    },
    maxSize: 2 * 1024 * 1024,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setFile(file);
        onDrop(file);
      }
    },
  });
  return (
    <div className={clsx('relative rounded-lg overflow-hidden', className)} {...getRootProps()}>
      <input {...getInputProps()} />
      <div
        className={clsx(
          'flex items-center justify-center',
          'border border-dashed border-gray-100 cursor-pointer rounded-md',
          { 'bg-gray-100': isDragActive, 'p-6 text-center text-gray-500': !file }
        )}
      >
        {file ? (
          <div className="bg-white rounded-lg p-3">
            <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-48" />
          </div>
        ) : (
          <>
            Drag & drop photo here <br />
            Required jpeg, png or svg. Max 2mb.
          </>
        )}
      </div>
    </div>
  );
};

export default DragDropImage;
