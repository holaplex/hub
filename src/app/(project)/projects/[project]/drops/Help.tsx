'use client';
import { Button } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Typography, { Size } from '../../../../../components/Typography';
import Link from 'next/link';
import Card from '../../../../../components/Card';

interface HelpProps {
  drop: string;
  project: string;
}

export default function Help({ drop, project }: HelpProps) {
  return (
    <Card className="w-[530px]">
      <Typography.Header size={Size.H2}>
        You&apos;ve created a drop! Ok, what&apos;s next?
      </Typography.Header>

      <div className="mt-5">
        <p className="text-gray-400 text-sm text-left">
          You can mint an edition from your drop directly to a wallet address by clicking the Mint
          edition button in the upper right hand corner.
        </p>
        <p className="text-gray-400 text-sm text-left mt-4">
          Or you can learn more about building a custom claim/buy page for your drop from our
          documentation or by scheduling a call with our customer success team.
        </p>

        <div className="flex gap-2 mt-14 items-center justify-end">
          <Link href="">
            <Button variant="secondary">View documentation</Button>
          </Link>
          <Link href="">
            <Button variant="secondary">Schedule call</Button>
          </Link>
          <Link href="">
            <Button>Mint editions</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
