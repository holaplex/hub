'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import NewProject from '../../../NewProject';

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <Modal open={true} setOpen={() => {}}>
      <NewProject />
    </Modal>
  );
}
