'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
<<<<<<< HEAD:src/app/(project)/projects/[project]/treasuries/(treasuries)/page.tsx
import { useRouter } from 'next/router';
import { Icon } from '../../../../../../components/Icon';
import Table from '../../../../../../components/Table';
=======
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';
import Table from '../../../../../components/Table';
>>>>>>> c656d56 (some more routes fixed):src/app/projects/[project]/treasuries/(treasuries)/page.tsx

type Treasury = {
  name: string;
  walletId: string;
  blockchain: string;
  address: string;
  totalBalance: number;
  createDate: string;
};

export default function TreasuryPage() {
  const router = useRouter();
  // TODO: Replace this with actual treasury data.
  const hasTreasury = true;
  // TODO:
  const projectId = '';
  const columnHelper = createColumnHelper<Treasury>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Treasury</div>
        {!hasTreasury ? (
          <div className="h-full flex-1 flex flex-col items-center justify-center">
            <Icon.Large.Treasury />
            <span className="mt-6 text-xl font-semibold">No wallets created yet</span>
            <span className="mt-2 text-gray-500 text-sm">Click button below to add wallet</span>
            <Button
              icon={<Icon.AddWallet stroke="#ffffff" />}
              className="mt-8"
              onClick={() => router}
            >
              Add wallet
            </Button>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Button
              icon={<Icon.AddWallet stroke="#ffffff" />}
              className="self-end"
              onClick={() => router.push(`/projects/${projectId}/treasuries/new`)}
            >
              Add wallet
            </Button>
            <Table
              className="mt-4"
              columns={[
                columnHelper.accessor('name', {
                  header: () => <span className="text-xs text-gray-600 font-medium">Name</span>,
                  cell: (info) => (
                    <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                  ),
                }),
                columnHelper.accessor('blockchain', {
                  header: () => (
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-600 font-medium">Wallet</span>
                    </div>
                  ),
                  cell: (info) => {
                    return (
                      <div className="flex gap-2">
                        <Icon.Crypto.Sol />
                        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      </div>
                    );
                  },
                }),
                columnHelper.accessor((row) => row.totalBalance.toString(), {
                  id: 'totalBalance',
                  header: () => (
                    <div className="flex gap-2">
                      <span className="text-xs text-gray-600 font-medium">Total balance</span>
                    </div>
                  ),
                  cell: (info) => {
                    return (
                      <div className="flex gap-2 text-xs font-medium">
                        <span className="text-primary">{info.getValue()}</span>
                        <span className="text-gray-600">SOL</span>
                      </div>
                    );
                  },
                }),
                columnHelper.accessor('createDate', {
                  header: () => (
                    <span className="text-xs text-gray-600 font-medium">Create date</span>
                  ),
                  cell: (info) => {
                    return (
                      <div className="flex flex-col gap-1 text-xs">
                        <span className="text-primary font-medium">{info.getValue()}</span>
                        <span className="text-gray-500">9:56 AM</span>
                      </div>
                    );
                  },
                }),
                columnHelper.accessor('address', {
                  header: () => (
                    <span className="flex text-xs text-gray-600 font-medium">Address</span>
                  ),
                  cell: (info) => (
                    <div className="flex flex-col">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                    </div>
                  ),
                }),
                columnHelper.display({
                  id: 'moreOptions',
                  header: () => <Icon.TableAction />,
                  cell: (info) => (
                    <PopoverBox
                      triggerButton={
                        <div
                          className={clsx('px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min')}
                        >
                          <Icon.More />
                        </div>
                      }
                      elements={[
                        <Link
                          key="transfer_tokens"
                          className="flex gap-2 items-center"
                          href={`/projects/${projectId}/treasuries/${info.row.original.walletId}/transfer`}
                        >
                          <Icon.TransferTokens /> <span>Transfer tokens</span>
                        </Link>,
                        <Link
                          key="edit_project"
                          className="flex gap-2 items-center"
                          href={`/projects/${projectId}/treasuries/${info.row.original.walletId}/receive`}
                        >
                          <Icon.ReceiveTokens /> <span>Receive tokens</span>
                        </Link>,
                        <Link
                          key="edit_treasury"
                          className="flex gap-2 items-center"
                          href={`/projects/${projectId}/treasuries/${info.row.original.walletId}/edit`}
                        >
                          <Icon.Edit />
                          <span>Edit treasury</span>
                        </Link>,
                      ]}
                    />
                  ),
                }),
              ]}
              data={[
                {
                  name: 'Main wallet',
                  walletId: '1234',
                  blockchain: 'Solana',
                  address: '0xA91...a2E9',
                  createDate: '11/28/2022',
                  totalBalance: 23.39,
                },
                {
                  name: 'Test wallet',
                  walletId: '5678',
                  blockchain: 'Solana',
                  address: '0xA91...a2E9',
                  createDate: '11/28/2022',
                  totalBalance: 23.39,
                },
              ]}
            />
          </div>
        )}
      </div>
    </>
  );
}
