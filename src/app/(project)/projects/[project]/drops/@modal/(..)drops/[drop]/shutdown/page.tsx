'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ShutdownDrop from '../../../../ShutdownDrop';

interface ShutdownPageProps {
  params: { drop: string; project: string };
}

export default function ShutdownPage({ params: { drop, project } }: ShutdownPageProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <ShutdownDrop drop={drop} project={project} />
    </Modal>
  );
}
