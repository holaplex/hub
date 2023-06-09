'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import Help from '../../../../Help';

interface HelpPageProps {
  params: { drop: string; project: string };
}

export default function HelpPage({ params: { drop, project } }: HelpPageProps) {
  const router = useRouter();
  const onClose = () => {
    //router.back();
    router.push(`/projects/${project}/drops/${drop}/holders`);
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <Help drop={drop} project={project} />
    </Modal>
  );
}
