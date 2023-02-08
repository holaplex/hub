'use client';
import { Button } from '@holaplex/ui-library-react';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';
import Tabs from '../../../../../layouts/Tabs';

type Drop = {
  name: string;
};

export default function DropViewLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[4] : null;
  console.log(slug);
  console.log(pathname);

  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-medium items-center">
          <span className="text-gray-500">Manage drops / </span>
          <span className="text-primary">{slug}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<Icon.Edit />} variant="secondary">
            Edit
          </Button>
          <Button icon={<Icon.Pause />} variant="secondary">
            Pause
          </Button>
          <Button variant="secondary">Shut down Minting</Button>
        </div>
      </div>
      <div className="mt-5 flex gap-4">
        <div className="basis-1/3 aspect-square">
          <Icon.EmptyAvatar className="w-full h-full" />
        </div>
        <div className="basis-2/3 flex flex-col rounded-md border border-gray-100 bg-gray-50">
          <div className="w-full h-[35px]"></div>
          <div className="flex p-4 bg-white">
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
      <Tabs.Page>
        <Tabs.Panel>
          <Tabs.Tab
            name="Analytics"
            active={pathname === `/projects/${slug}/drops/create/details`}
          />
          <Tabs.Tab
            name="Purchase history"
            active={pathname === `/projects/${slug}/drops/create/royalties`}
          />
          <Tabs.Tab
            name="Current holders"
            active={pathname === `/projects/${slug}/drops/create/timing`}
          />
        </Tabs.Panel>
        <Tabs.Content>{children}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
