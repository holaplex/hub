import Head from 'next/head';
import { ReactElement } from 'react';

interface HubEntryLayoutProps {
  title: string;
  description: string;
  children: ReactElement;
}

const HubEntryLayout = ({ title, description, children }: HubEntryLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex flex-col h-screen items-center mt-10">
        <div className="text-2xl font-bold text-primary">Holaplex</div>
        <div className="w-[400px] flex flex-col rounded-md bg-white border border-gray-100 mt-14 p-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default HubEntryLayout;
