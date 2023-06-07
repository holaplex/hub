'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import InviteMember from '../../InviteMember';

export default function NewProjectPage() {
  const router = useRouter();
  const onClose = () => {
    router.push('/members');
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <InviteMember />
    </Modal>
  );
}
