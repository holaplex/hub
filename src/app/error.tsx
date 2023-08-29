'use client';

import Card from '../components/Card';
import Image from 'next/image';
import { Icon } from '../components/Icon';
import { Button } from '@holaplex/ui-library-react';
import Typography from '../components/Typography';
import Bugsnag from '@bugsnag/js';

export default function AppError({ error, reset }: { error: Error; reset: () => void }) {
  Bugsnag.notify(error, (event) => {});
  return (
    <main className="w-full flex justify-center align-middle flex-col h-screen">
      <Card className="flex flex-col gap-6 w-96 mx-auto justify-center items-center text-center">
        <Image src="/holaplex.svg" width={199} height={18} alt="Holaplex logo" className="m-auto" />
        <aside className="w-20 aspect-square bg-red-500 text-white text-2xl rounded-full flex justify-center items-center">
          <Icon.Close width={50} height={50} stroke="stroke-white" />
        </aside>
        <Typography.Paragraph>
          Sorry, something went wrong. An error report was automatically sent to our team.
        </Typography.Paragraph>
        <Button onClick={reset} block>
          Retry
        </Button>
      </Card>
    </main>
  );
}
