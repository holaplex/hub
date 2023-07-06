'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import RetryDrop from '../../../../RetryDrop';

interface RetryDropPageProps {
  params: { drop: string; project: string };
}

export default function RetryDropPage({ params: { drop, project } }: RetryDropPageProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <RetryDrop drop={drop} project={project} />
    </Modal>
  );
}
