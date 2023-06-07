'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import NewProject from '../../NewProject';
import React from 'react';

export default function NewProjectPage() {
  const router = useRouter();
  const onClose = () => {
    router.push('/projects');
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <NewProject />
    </Modal>
  );
}
