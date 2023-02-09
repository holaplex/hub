'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../../components/Icon';
import Table from '../../../../../../components/Table';

export enum PurchaseStatus {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

type Purchase = {
  customerId: string;
  wallet: string;
  txnId: string;
  spent: number;
  date: string;
  status: PurchaseStatus;
};

export default function PurchasesPage() {
  const router = useRouter();
  const columnHelper = createColumnHelper<Purchase>();

  return (
    <div className="flex flex-col">
      <Table
        className=""
        columns={[
          columnHelper.accessor('customerId', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">Customer ID</span>
              </div>
            ),
            cell: (info) => {
              return <span className="text-xs text-primary font-medium">{info.getValue()}</span>;
            },
          }),
          columnHelper.accessor('wallet', {
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
          columnHelper.accessor('txnId', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">TxID</span>
              </div>
            ),
            cell: (info) => {
              return <span className="text-xs text-primary font-medium">{info.getValue()}</span>;
            },
          }),
          columnHelper.accessor((row) => row.spent.toString(), {
            id: 'spent',
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">Spent</span>
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
          columnHelper.accessor('date', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">Spent</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2 text-xs font-medium">
                  <span className="text-primary">{info.getValue()}</span>
                  <span className="text-gray-600">9:56 AM</span>
                </div>
              );
            },
          }),
          columnHelper.accessor((row) => row.status.toString(), {
            id: 'inviteStatus',
            header: () => (
              <span className="flex text-xs text-gray-600 font-medium">Invite status</span>
            ),
            cell: (info) => <Table.PurchaseStatusPill status={info.getValue() as PurchaseStatus} />,
          }),
          columnHelper.display({
            id: 'moreOptions',
            header: () => <Icon.TableAction />,
            cell: () => (
              <PopoverBox
                triggerButton={
                  <div className={clsx('px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min')}>
                    <Icon.More />
                  </div>
                }
                elements={[
                  <Link
                    href="https://solscan.io"
                    target="_blank"
                    key="change_email"
                    className="flex gap-2 items-center"
                  >
                    <Icon.ExternalLink /> <span>View on SolScan</span>
                  </Link>,
                ]}
              />
            ),
          }),
        ]}
        data={[
          {
            customerId: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            wallet: '0xA91...a2E9',
            spent: 99999,
            date: '05/27/2023',
            status: PurchaseStatus.PENDING,
          },
          {
            customerId: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            wallet: '0xA91...a2E9',
            spent: 99999,
            date: '05/27/2023',
            status: PurchaseStatus.SUCCESS,
          },
          {
            customerId: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            wallet: '0xA91...a2E9',
            spent: 99999,
            date: '05/27/2023',
            status: PurchaseStatus.SUCCESS,
          },
          {
            customerId: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            wallet: '0xA91...a2E9',
            spent: 99999,
            date: '05/27/2023',
            status: PurchaseStatus.FAILED,
          },
        ]}
      />
    </div>
  );
}
