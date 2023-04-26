'use client';

import { Button } from '@holaplex/ui-library-react';
import Card from '../components/Card';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full flex justify-center align-middle flex-col h-screen">
      <Card className="flex flex-col gap-4 w-96 mx-auto">
        <Image
          src="/holaplex.png"
          width={212}
          height={20}
          alt="Holaplex logo"
          priority
          className="m-auto"
        />
        <aside className="grid justify-center grid-cols-2 gap-2 mt-6">
          <Link href="/login">
            <Button block>Sign in</Button>
          </Link>
          <Link href="/registration">
            <Button variant="secondary" block>
              Sign up
            </Button>
          </Link>
        </aside>
      </Card>
    </main>
  );
}
