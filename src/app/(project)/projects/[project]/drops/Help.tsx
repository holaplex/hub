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
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <Card className="w-[530px]">
      <Typography.Header size={Size.H2}>
        You&apos;ve created a drop! Ok, what&apos;s next?
      </Typography.Header>

      <div className="mt-5">
        <p className="text-gray-400 text-sm text-left">
          You can mint an edition from your drop directly to a wallet address by clicking the{' '}
          <Link href={`/projects/${project}/drops/${drop}/mint`} className="text-yellow-300">
            Mint edition
          </Link>{' '}
          button in the upper right hand corner.
        </p>
        <p className="text-gray-400 text-sm text-left mt-4">
          Or you can learn more about building a custom claim/buy page for your drop from our
          <Link href="" className="text-yellow-300">
            {' '}
            documentation
          </Link>{' '}
          or by{' '}
          <Link href="" className="text-yellow-300">
            scheduling a call
          </Link>{' '}
          with our customer success team.
        </p>
        <hr className="w-full bg-stone-800 border-0 h-px my-6" />
        <div className="flex w-full justify-end">
          <Button onClick={onClose} className="flex justify-end">
            Done
          </Button>
        </div>
      </div>
    </Card>
  );
}
