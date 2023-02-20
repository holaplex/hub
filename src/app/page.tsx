'use client';

import { Button } from '@holaplex/ui-library-react';
import Card from '../components/Card';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="w-full flex justify-center align-middle flex-col h-screen">
      <Card className="flex flex-col gap-4 w-96 mx-auto">
        <Image src="/holaplex.svg" width={212} height={20} alt="Holaplex logo" className="m-auto" />
        <aside className="flex justify-center align-middle gap-2 mt-6">
          <Link href="/login">
            <Button className="w-36">Sign in</Button>
          </Link>
          <Link href="/registration">
            <Button variant="secondary" className="w-36">
              Sign up
            </Button>
          </Link>
        </aside>
      </Card>
    </main>
  );
}
