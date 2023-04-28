'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../../../../components/Icon';
import Table from '../../../../../../../../components/Table';
import { TransactionStatus, TransactionType } from '../../../../../../../../types';

type Transaction = {
  txnType: TransactionType;
  txnId: string;
  fromWallet: string;
  toWallet: string;
  coin: string;
  amount: number;
  balance: number;
  status: TransactionStatus;
  date: string;
};

export default function TransactionsPage() {
  const router = useRouter();
  const columnHelper = createColumnHelper<Transaction>();

  return (
    <div className="flex flex-col">
      <Table
        className=""
        columns={[
          columnHelper.accessor((row) => row.txnType.toString(), {
            id: 'txnType',
            header: () => <span className="flex text-xs text-gray-400 font-medium">Type</span>,
            cell: (info) => (
              <div className="flex gap-2 items-center">
                <span
                  className={clsx('w-[6px] h-[6px] rounded-sm', {
                    'bg-positive':
                      (info.getValue() as TransactionType) === TransactionType.RECEIVED,
                    'bg-red-500': (info.getValue() as TransactionType) === TransactionType.SENT,
                  })}
                ></span>
                <span className="text-xs text-white font-medium">{info.getValue()}</span>
              </div>
            ),
          }),
          columnHelper.accessor('txnId', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 font-medium">TxID</span>
              </div>
            ),
            cell: (info) => {
              return <span className="text-xs text-white font-medium">{info.getValue()}</span>;
            },
          }),
          columnHelper.accessor('fromWallet', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 font-medium">From</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2">
                  <Icon.Crypto.Sol />
                  <span className="text-xs text-white font-medium">{info.getValue()}</span>
                </div>
              );
            },
          }),
          columnHelper.accessor('toWallet', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 font-medium">To</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2">
                  <Icon.Crypto.Sol />
                  <span className="text-xs text-white font-medium">{info.getValue()}</span>
                </div>
              );
            },
          }),
          columnHelper.accessor('coin', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 font-medium">Coin</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2">
                  <span className="text-xs text-white font-medium">{info.getValue()}</span>
                </div>
              );
            },
          }),

          columnHelper.accessor((row) => row.amount.toString(), {
            id: 'spent',
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 font-medium">Amount</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2 text-xs font-medium">
                  <span className="text-white">{info.getValue()}</span>
                  <span className="text-gray-400"></span>
                </div>
              );
            },
          }),
          columnHelper.accessor((row) => row.balance.toString(), {
            id: 'spent',
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-400 font-medium">Balance</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2 text-xs font-medium">
                  <span className="text-white">{info.getValue()}</span>
                  <span className="text-gray-400"></span>
                </div>
              );
            },
          }),

          columnHelper.accessor((row) => row.status.toString(), {
            id: 'status',
            header: () => <span>Status</span>,
            cell: (info) => (
              <Table.TransactionStatusPill status={info.getValue() as TransactionStatus} />
            ),
          }),
          columnHelper.accessor('date', {
            header: () => <span>Date</span>,
            cell: (info) => {
              return (
                <div className="flex flex-col gap-1 text-xs">
                  <span className="text-white font-medium">{info.getValue()}</span>
                  <span className="text-gray-400">9:56 AM</span>
                </div>
              );
            },
          }),
          columnHelper.display({
            id: 'moreOptions',
            header: () => <></>,
            cell: () => (
              <PopoverBox
                triggerButton={
                  <div className={clsx('px-2 py-1 hover:rounded-md hover:bg-stone-800 max-w-min')}>
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
            txnType: TransactionType.SENT,
            toWallet: '0xA91...a2E9',
            fromWallet: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            coin: 'SOL',
            amount: 0.823,
            balance: 278.93,
            date: '05/27/2023',
            status: TransactionStatus.IN_PROCESS,
          },
          {
            txnType: TransactionType.RECEIVED,
            toWallet: '0xA91...a2E9',
            fromWallet: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            coin: 'SOL',
            amount: 0.823,
            balance: 278.93,
            date: '05/27/2023',
            status: TransactionStatus.SUCCESS,
          },
          {
            txnType: TransactionType.RECEIVED,
            toWallet: '0xA91...a2E9',
            fromWallet: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            coin: 'SOL',
            amount: 0.823,
            balance: 278.93,
            date: '05/27/2023',
            status: TransactionStatus.SUCCESS,
          },
          {
            txnType: TransactionType.SENT,
            toWallet: '0xA91...a2E9',
            fromWallet: '0xA91...a2E9',
            txnId: '0x2a74b0e...t47k',
            coin: 'SOL',
            amount: 0.823,
            balance: 278.93,
            date: '05/27/2023',
            status: TransactionStatus.FAILED,
          },
        ]}
      />
    </div>
  );
}
