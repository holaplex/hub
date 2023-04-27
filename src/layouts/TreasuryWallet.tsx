'use client';
import { Button } from '@holaplex/ui-library-react';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Icon } from './../components/Icon';
import Tabs from './../layouts/Tabs';

export type Wallet = {
  name: string;
  projectId: string;
};

export default function TreasuryWallet({
  children,
  wallet,
}: {
  children: React.ReactNode;
  wallet: Wallet;
}): JSX.Element {
  const segments = useSelectedLayoutSegments();

  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-medium items-center">
          <span className="text-gray-400">Treasury / </span>
          <span className="text-white">{wallet.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<Icon.Edit stroke="stroke-yellow-300" />} variant="secondary">
            Edit
          </Button>
        </div>
      </div>
      <div className="mt-5 flex flex-col w-full rounded-md bg-stone-800 border border-gray-100">
        <div className="flex items-center py-3 w-full text-xs font-medium text-gray-400">
          <span className="text-white px-5 border-r border-r-gray-200">
            Created: 11/28/2022 10:27 AM
          </span>
          <span className="text-gray-400 px-5">Blockchain: Solana</span>
        </div>
        <div className="flex p-4 bg-white rounded-b-md">
          <div className="flex basis-1/2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <Icon.Crypto.Sol className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-white text-xl font-semibold">
                  23.39<span className="text-gray-400"> SOL</span>
                </span>
                <span className="text-xs text-white">
                  ~ 569.07 <span className="text-gray-400">USD</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400 text-xs font-medium">Wallet address</span>
              <span className="text-xl flex gap-2 items-center font-semibold text-white">
                0xA91...a2E9 <Icon.Copy />
              </span>
            </div>
          </div>
          <div className="flex gap-2 basis-1/2 items-center justify-end">
            <Button variant="secondary">Receive</Button>
            <Button>Transfer</Button>
          </div>
        </div>
      </div>
      <Tabs.Page className="mt-8">
        <Tabs.Panel>
          <Tabs.Tab
            name="Transactions"
            href={`/projects/${wallet.projectId}/treasury/${wallet.name}/transactions`}
            active={segments[0] === 'transactions'}
          />
          <Tabs.Tab
            name="Associated drops"
            href={`/projects/${wallet.projectId}/treasury/${wallet.name}/drops`}
            active={segments[0] === 'drops'}
          />
        </Tabs.Panel>
        <Tabs.Content>{children}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
