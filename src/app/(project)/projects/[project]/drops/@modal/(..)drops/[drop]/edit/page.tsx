'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import EditDrop from '../../../../EditDrop';

interface EditDropPageProps {
  params: { drop: string; project: string };
}

export default function EditDropPage({ params: { drop, project } }: EditDropPageProps) {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <EditDrop drop={drop} project={project} />
    </Modal>
  );
}
