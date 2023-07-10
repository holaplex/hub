'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import RetryMint from '../../../../../../RetryMint';

interface RetryMintPageProps {
  params: { drop: string; project: string; mint: string };
}

export default function RetryMintPage({ params: { drop, project, mint } }: RetryMintPageProps) {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <RetryMint drop={drop} project={project} mint={mint} />
    </Modal>
  );
}
