'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ResumeDrop from '../../../../ResumeDrop';

interface ResumePageProps {
  params: { drop: string; project: string };
}

export default function ResumePage({ params: { drop, project } }: ResumePageProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <ResumeDrop drop={drop} project={project} />
    </Modal>
  );
}
