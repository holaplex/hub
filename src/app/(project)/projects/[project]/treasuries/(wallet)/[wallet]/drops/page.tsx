'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from './../../../../../../../../components/Icon';
import Table from './../../../../../../../../components/Table';
import { DropStatus } from './../../../../../../../../graphql.types';

type Drop = {
  dropName: string;
  dropSymbol: string;
  dropImage: string;
  price: number;
  createDate: string;
  startMintDate: string;
  endMintDate: string;
  minted: number;
  supply: number;
  status: DropStatus;
};

export default function DropsPage() {
  const router = useRouter();
  const columnHelper = createColumnHelper<Drop>();

  return (
    <div className="flex flex-col">
      <Table
        className=""
        columns={[
          columnHelper.accessor('dropName', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">TxID</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2 items-center">
                  <Icon.EmptyAvatar />
                  <div className="flex flex-col">
                    <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                    <span className="text-xs text-gray-500">{info.row.original.dropSymbol}</span>
                  </div>
                </div>
              );
            },
          }),

          columnHelper.accessor((row) => row.price.toString(), {
            id: 'price',
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">Price</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2 text-xs font-medium">
                  <span className="text-primary">{info.getValue()}</span>
                  <span className="text-gray-600"> SOL</span>
                </div>
              );
            },
          }),
          columnHelper.accessor('createDate', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">Create date</span>
              </div>
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
          columnHelper.accessor('startMintDate', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">Start mint date</span>
              </div>
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
          columnHelper.accessor('endMintDate', {
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">End mint date</span>
              </div>
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
          columnHelper.accessor((row) => row.minted.toString(), {
            id: 'mintedAndSupply',
            header: () => (
              <div className="flex gap-2">
                <span className="text-xs text-gray-600 font-medium">Minted out & supply</span>
              </div>
            ),
            cell: (info) => {
              return (
                <div className="flex gap-2 text-xs font-medium text-primary">
                  {info.getValue()} / {info.row.original.supply} minted
                </div>
              );
            },
          }),

          columnHelper.accessor((row) => row.status.toString(), {
            id: 'status',
            header: () => <span className="flex text-xs text-gray-600 font-medium">Status</span>,
            cell: (info) => <Table.DropStatusPill status={info.row.original.status} />,
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
            dropName: 'Bored Usyk club',
            dropSymbol: 'BUC',
            price: 30.9383,
            createDate: '05/27/2023',
            startMintDate: '05/28/2023',
            endMintDate: '06/27/2023',
            minted: 0,
            supply: 10000,
            status: DropStatus.Scheduled,
            dropImage: '',
          },
          {
            dropName: 'Usyk kozak club',
            dropSymbol: 'UKC',
            price: 30.9383,
            createDate: '05/27/2023',
            startMintDate: '05/28/2023',
            endMintDate: '06/27/2023',
            minted: 393,
            supply: 1000,
            status: DropStatus.Minting,
            dropImage: '',
          },
          {
            dropName: 'Hola club',
            dropSymbol: 'HC',
            price: 30.9383,
            createDate: '05/27/2023',
            startMintDate: '05/28/2023',
            endMintDate: '06/27/2023',
            minted: 10,
            supply: 1000,
            status: DropStatus.Minted,
            dropImage: '',
          },
        ]}
      />
    </div>
  );
}
