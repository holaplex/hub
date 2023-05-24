'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import EditProject from '../../../../EditProject';

interface EditProjectPageProps {
  params: { project: string };
}

export default function EditProjectPage({ params: { project } }: EditProjectPageProps) {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <EditProject project={project} />
    </Modal>
  );
}
