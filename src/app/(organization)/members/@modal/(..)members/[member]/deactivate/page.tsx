'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import DeactivateMember from '../../../../DeactivateMember';

interface DeactivateMemberPageProps {
  params: { member: string };
}

export default function DeactivateMemberPage({ params: { member } }: DeactivateMemberPageProps) {
  const router = useRouter();
  const onClose = () => {
    router.push('/members');
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <DeactivateMember member={member} />
    </Modal>
  );
}
