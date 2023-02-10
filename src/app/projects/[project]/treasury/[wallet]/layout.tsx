'use client';
import { Button } from '@holaplex/ui-library-react';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';
import Tabs from '../../../../../layouts/Tabs';

type Drop = {
  name: string;
};

export default function WalletLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();
  const projectSlug = pathname ? pathname.split('/')[2] : null;
  const walletSlug = pathname ? pathname.split('/')[4] : null;

  return (
    <div className="flex flex-col px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-medium items-center">
          <span className="text-gray-500">Treasury / </span>
          <span className="text-primary">{walletSlug}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button icon={<Icon.Edit />} variant="secondary">
            Edit
          </Button>
        </div>
      </div>
      <div className="mt-5 flex flex-col w-full rounded-md bg-gray-50 border border-gray-100">
        <div className="flex items-center py-3 w-full text-xs font-medium text-gray-600">
          <span className="text-primary px-5 border-r border-r-gray-200">
            Created: 11/28/2022 10:27 AM
          </span>
          <span className="text-gray-500 px-5">Blockchain: Solana</span>
        </div>
        <div className="flex p-4 bg-white rounded-b-md">
          <div className="flex basis-1/2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <Icon.Crypto.Sol className="h-10 w-10" />
              <div className="flex flex-col">
                <span className="text-primary text-xl font-semibold">
                  23.39<span className="text-gray-500"> SOL</span>
                </span>
                <span className="text-xs text-primary">
                  ~ 569.07 <span className="text-gray-500">USD</span>
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-500 text-xs font-medium">Wallet address</span>
              <span className="text-xl flex gap-2 items-center font-semibold text-primary">
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
            href={`/projects/${projectSlug}/treasury/${walletSlug}/transactions`}
            active={pathname === `/projects/${projectSlug}/treasury/${walletSlug}/transactions`}
          />
          <Tabs.Tab
            name="Associated drops"
            href={`/projects/${projectSlug}/treasury/${walletSlug}/drops`}
            active={pathname === `/projects/${projectSlug}/treasury/${walletSlug}/drops`}
          />
        </Tabs.Panel>
        <Tabs.Content>{children}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
