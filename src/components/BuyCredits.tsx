import { Button } from '@holaplex/ui-library-react';
import React, { ReactElement } from 'react';

interface BuyCreditsProps {
  text: string;
  icon?: ReactElement;
}

export default function BuyCredits({ text, icon }: BuyCreditsProps) {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed!');
    }

    if (query.get('canceled')) {
      console.log('Order canceled.');
    }
  }, []);
  return (
    <form action="/api/checkout_credits" method="POST">
      <section>
        <Button htmlType="submit" icon={icon}>
          {text}
        </Button>
      </section>
    </form>
  );
}
