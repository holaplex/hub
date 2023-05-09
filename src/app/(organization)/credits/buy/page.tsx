'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import BuyCredits from './BuyCredits';

export default function BuyCreditsPage() {
  const router = useRouter();

  return (
    <Modal
      open={true}
      setOpen={() => {
        router.push('/credits/costs');
      }}
    >
      <BuyCredits />
    </Modal>
  );
}
