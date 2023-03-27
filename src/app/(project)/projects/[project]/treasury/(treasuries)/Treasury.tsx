'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../../components/Icon';
import Table from '../../../../../../components/Table';

type Treasury = {
  id: string;
  name: string;
  blockchain: string;
  address: string;
  totalBalance: number;
  createDate: string;
};

interface TreasuryLayoutProps {
  children: React.ReactNode;
  wallet: string;
  project: string;
}

export default function Treasury({ children, wallet, project }: TreasuryLayoutProps) {
  const router = useRouter();
  // TODO: Replace this with actual treasury data.
  const noTreasury = true;
  const columnHelper = createColumnHelper<Treasury>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Treasury</div>
        {noTreasury ? (
          <div className="h-full flex-1 flex flex-col items-center justify-center">
            <Icon.Large.Treasury />
            <span className="mt-6 text-xl font-semibold">Project treasury coming soon</span>
            {/* <span className="mt-2 text-gray-500 text-sm">Click button below to add wallet</span>
            <Link href={`/projects/${project}/treasuries/new`} className="mt-8">
              <Button icon={<Icon.AddWallet stroke="#ffffff" />}>Add wallet</Button>
            </Link> */}
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Link href={`/projects/${project}/treasuries/new`} className="self-end">
              <Button icon={<Icon.AddWallet stroke="#ffffff" />}>Add wallet</Button>
            </Link>
            <Table
              className="mt-4"
              columns={[
                columnHelper.accessor('id', {
                  header: () => (
                    <span className="text-xs text-gray-600 font-medium">Blockchain</span>
                  ),
                  cell: (info) => (
                    <Link
                      href={`/projects/${project}/treasuries/${info.getValue()}`}
                      className="flex flex-row gap-2 items-center"
                    >
                      <Icon.Crypto.Sol /> Solana
                    </Link>
                  ),
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
                          href={`/projects/${project}/treasuries/${info.row.original.id}/transfer`}
                        >
                          <Icon.TransferTokens /> <span>Transfer tokens</span>
                        </Link>,
                        <Link
                          key="edit_project"
                          className="flex gap-2 items-center"
                          href={`/projects/${project}/treasuries/${info.row.original.id}/receive`}
                        >
                          <Icon.ReceiveTokens /> <span>Receive tokens</span>
                        </Link>,
                        <Link
                          key="edit_treasury"
                          className="flex gap-2 items-center"
                          href={`/projects/${project}/treasuries/${info.row.original.id}/edit`}
                        >
                          <Icon.Edit />
                          <span>Edit treasury</span>
                        </Link>,
                      ]}
                    />
                  ),
                }),
              ]}
              data={[]}
            />
          </div>
        )}
        {children}
      </div>
    </>
  );
}
