'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import MintEdition from '../../../../MintEdition';

interface MintPageProps {
  params: { drop: string; project: string };
}

export default function MintPage({ params: { drop, project } }: MintPageProps) {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <MintEdition drop={drop} project={project} />
    </Modal>
  );
}
