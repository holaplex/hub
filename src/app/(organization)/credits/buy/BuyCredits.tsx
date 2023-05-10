import { Button } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';

export default function BuyCredits() {
  return (
    <Card className="w-[300px]">
      <Typography.Header size={Size.H2} className="self-start">
        Buy more credits
      </Typography.Header>
      <span className="mt-5 text-gray-400">
        Please reach out to buy more credits. Note that it may take up to 24 hours after payment to
        see credits added to your account.
      </span>
      <a href="mailto:support@holaplex.com">
        <Button className="w-full mt-5">Contact Us</Button>
      </a>
    </Card>
  );
}
