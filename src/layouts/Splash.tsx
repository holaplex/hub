import { ReactNode } from 'react';
import Image from 'next/image';
import Link from '../components/Link';

export interface SplashProps {
  children: ReactNode;
}
export default function Splash({ children }: SplashProps) {
  return (
    <div className="flex flex-col items-center mt-10 mb-20">
      <Link href="/">
        <Image
          src="/img/holaplex.svg"
          alt="Holaplex logo"
          width={199}
          height={18}
          className="mb-16"
        />
      </Link>
      {children}
    </div>
  );
}
