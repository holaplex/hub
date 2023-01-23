import { ReactNode } from 'react';
import Image from 'next/image';
import Link from '../components/Link';

export interface SplashProps {
  children: ReactNode;
}
export default function Splash({ children }: SplashProps) {
  return (
    <div className="flex flex-col items-center mt-10">
      <Link href="/">
        <Image src="/holaplex.svg" alt="Holaplex logo" width={212} height={20} className="mb-16" />
      </Link>
      {children}
    </div>
  );
}
