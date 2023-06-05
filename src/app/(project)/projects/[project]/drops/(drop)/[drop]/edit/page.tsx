'use client';

import EditDrop from '../../../EditDrop';

interface EditDropProps {
  params: { drop: string; project: string };
}

export default function EditDropPage({ params: { drop, project } }: EditDropProps) {
  return (
    <div className="w-max mx-auto pt-20">
      <EditDrop drop={drop} project={project} />
    </div>
  );
}
