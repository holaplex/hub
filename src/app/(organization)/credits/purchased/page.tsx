'use client';

import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { Button } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';

export default function BuyCreditsPage() {
  const router = useRouter();

  return (
    <Modal
      open={true}
      setOpen={() => {
        router.push('/credits/costs');
      }}
    >
      <Card className="w-[420px]">
        <Typography.Header size={Size.H2} className="self-start">
          Credits purchased
        </Typography.Header>
        <span className="mt-5 text-left text-gray-400">
          Thank you for your purchase. It will take up to 24 hours after payment to see credits
          added to your account. Please reach out to support with any questions.
        </span>
        <a href="mailto:support@holaplex.com">
          <Button className="w-full mt-5">Contact Us</Button>
        </a>
      </Card>
    </Modal>
  );
}
