'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import ReactivateMember from '../../../../ReactivateMember';

interface ReactivateMemberPageProps {
  params: { member: string };
}

export default function ReactivateMemberPage({ params: { member } }: ReactivateMemberPageProps) {
  const router = useRouter();
  const onClose = () => {
    router.push('/members');
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <ReactivateMember member={member} />
    </Modal>
  );
}
