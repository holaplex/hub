'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import PauseDrop from '../../../../PauseDrop';

interface PausePageProps {
  params: { drop: string; project: string };
}

export default function PausePage({ params: { drop, project } }: PausePageProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <PauseDrop drop={drop} project={project} />
    </Modal>
  );
}
