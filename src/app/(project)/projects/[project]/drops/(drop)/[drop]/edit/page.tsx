'use client';

import EditDrop from '../../../EditDrop';

interface EditDropProps {
  params: { drop: string; project: string };
}

export default function EditDropPage({ params: { drop, project } }: EditDropProps) {
  return (
    <div className="h-screen flex items-center justify-center">
      <EditDrop drop={drop} project={project} />
    </div>
  );
}
