import Head from 'next/head';
import { ReactElement } from 'react';

export interface SplashProps {
  title: string;
  description: string;
  children: ReactElement;
}
export default function Splash({ title, description, children }: SplashProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="flex flex-col h-screen items-center pt-10">
        <div className="text-2xl font-bold text-primary mb-14">Holaplex</div>
        {children}
      </div>
    </>
  );
}
