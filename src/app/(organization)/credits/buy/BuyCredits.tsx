import { Button } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';

export default function BuyCredits() {
  return (
    <Card className="w-[300px]">
      <Typography.Header size={Size.H2} className="self-start">
        Buy more credits
      </Typography.Header>
      <span className="mt-5 text-gray-400">We will get back to you very soon</span>
      <Button className="w-full mt-5">Contact Us</Button>
    </Card>
  );
}
