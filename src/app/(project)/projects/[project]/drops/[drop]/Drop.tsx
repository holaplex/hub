'use client';

import { Button } from '@holaplex/ui-library-react';
import { Icon } from '../../../../../../components/Icon';
import Tabs from '../../../../../../layouts/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Drop = {
  name: string;
};

interface DropProps {
  project: string;
  drop: string;
  children: React.ReactNode;
}

export default function Drop({ children, project, drop }: DropProps): JSX.Element {
  const pathname = usePathname();

  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-2xl font-medium items-center">
          <Link href={`/projects/${project}/drops`} className="text-gray-500">
            Manage drops
          </Link>{' '}
          /<span className="text-primary">{drop}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<Icon.Edit />} variant="secondary">
            Edit
          </Button>
          <Button icon={<Icon.Pause />} variant="secondary">
            Pause
          </Button>
          <Button icon={<Icon.Close />} variant="secondary">
            Shut down Minting
          </Button>
        </div>
      </div>
      <div className="mt-5 flex gap-4">
        <div className="basis-1/3 aspect-square">
          <Icon.EmptyAvatar className="w-full h-full" />
        </div>
        <div className="basis-2/3 flex flex-col gap-2">
          <div className="w-full text-xs font-medium">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <span className="text-primary">Scheduled - 0%</span>
                <span className="text-gray-500">0/10,000</span>
              </div>
              <span className="text-gray-500">10 days to start</span>
            </div>
            <div className="w-full rounded-full h-[12px] bg-gray-100 mt-1"></div>
          </div>
          <div className="flex p-4 bg-white rounded-md">
            <div className="basis-1/2 h-full flex flex-col border-r border-r-gray-100 pr-4">
              <span className="text-gray-500 text-xs font-medium mb-2">Name</span>
              <span className="text-primary text-3xl font-medium">Bored Usyk club</span>
              <span className="text-gray-500 mb-6">BUC</span>
              <span className="text-gray-400 text-xs font-medium mb-1">Description</span>
              <span className="text-sm h-[90px] text-primary overflow-hidden">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At incidunt dignissimos.
              </span>
              <div className="flex gap-2 mt-4">
                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                  <span className="text-gray-500 text-xs font-medium">Treasury wallet</span>
                  <span className="text-primary text-sm font-medium">0xA91...a2E9</span>
                </div>
                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                  <span className="text-gray-500 text-xs font-medium">Blockchain</span>
                  <span className="text-primary text-sm font-medium">Solana</span>
                </div>
              </div>
            </div>
            <div className="basis-1/2 h-full flex flex-col px-4">
              <span className="text-gray-500 text-xs font-medium mb-2">Price</span>
              <span className="text-primary text-3xl font-medium">
                472.1 <span className="text-gray-400">SOL</span>
              </span>
              <span className="text-gray-500 mb-6">~ 11,356.99 USD</span>
              <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                <span className="text-gray-500 text-xs font-medium">Estimated total value</span>
                <div className="flex items-center justify-between">
                  <span className="text-primary text-sm font-medium">
                    4,720,097.3 <span className="text-gray-400">SOL</span>
                  </span>
                  <span className="text-sm font-medium text-gray-500">~ 113,32323,2323.87 USD</span>
                </div>
              </div>
              <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50 mt-3">
                <span className="text-gray-500 text-xs font-medium">Royalty wallet address #1</span>
                <span className="text-primary text-sm font-medium">
                  0xA91...a2E9 <span className="text-gray-400">- 90%</span>
                </span>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                  <span className="text-gray-500 text-xs font-medium">Start date</span>
                  <span className="text-primary text-sm font-medium">03/11/2022, 11:30 AM</span>
                </div>
                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                  <span className="text-gray-500 text-xs font-medium">End date</span>
                  <span className="text-primary text-sm font-medium">03/12/2022, 11:30 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tabs.Page className="mt-8">
        <Tabs.Panel>
          <Tabs.Tab
            name="Analytics"
            href={`/projects/${project}/drops/${drop}/analytics`}
            active={pathname === `/projects/${project}/drops/${drop}/analytics`}
          />
          <Tabs.Tab
            name="Purchase history"
            href={`/projects/${project}/drops/${drop}/purchases`}
            active={pathname === `/projects/${project}/drops/${drop}/purchases`}
          />
          <Tabs.Tab
            name="Current holders"
            href={`/projects/${project}/drops/${drop}/holders`}
            active={pathname === `/projects/${project}/drops/${drop}/holders`}
          />
        </Tabs.Panel>
        <Tabs.Content>{children}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
