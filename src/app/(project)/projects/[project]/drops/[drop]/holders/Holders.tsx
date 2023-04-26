'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../../../components/Icon';
import Table from '../../../../../../../components/Table';
import { Holder, Project } from '../../../../../../../graphql.types';
import { GetCollectionHolders } from './../../../../../../../queries/holder.graphql';
import { useQuery } from '@apollo/client';
import Typography, { Size } from '../../../../../../../components/Typography';

interface HoldersProps {
  project: string;
  drop: string;
  loading?: boolean;
}

interface GetCollectionHoldersData {
  project: Pick<Project, 'drop'>;
}

interface GetCollectionHoldersVars {
  project: string;
  drop: string;
}

export default function Holders({ project, drop, loading }: HoldersProps) {
  const columnHelper = createColumnHelper<Holder>();
  const loadingColumnHelper = createColumnHelper<any>();

  const holdersQuery = useQuery<GetCollectionHoldersData, GetCollectionHoldersVars>(
    GetCollectionHolders,
    {
      variables: { project, drop },
    }
  );

  const holders = holdersQuery.data?.project.drop?.collection.holders || [];
  const noHolders = holders.length === 0;

  return (
    <div className="flex flex-col">
      {holdersQuery.loading || loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'address',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-950 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-gray-50 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-gray-50 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'owns',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-950 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-gray-50 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-gray-50 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'spent',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-950 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-gray-50 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-gray-50 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'options',
                header: () => <div className="rounded-full h-4 w-4 bg-stone-950 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-4 bg-gray-50 animate-pulse" />,
              }),
            ]}
            data={new Array(4)}
          />
        </>
      ) : noHolders ? (
        <div className="flex flex-col gap-2 items-center">
          <Icon.Large.CreateCustomers />
          <Typography.Header size={Size.H2}>No holders yet</Typography.Header>
          <Typography.Paragraph className="text-gray-400">
            The current holder holders information will appear after the first mint
          </Typography.Paragraph>
        </div>
      ) : (
        <Table
          columns={[
            columnHelper.accessor('shortAddress', {
              header: () => (
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400 font-medium">Wallet</span>
                </div>
              ),
              cell: (info) => {
                const address = info.getValue();
                return (
                  <div className="flex gap-2">
                    <Icon.Crypto.Sol />
                    <span className="text-xs text-white font-medium">{address}</span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('owns', {
              id: 'spent',
              header: () => (
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400 font-medium">Spent</span>
                </div>
              ),
              cell: (info) => {
                const owns = info.getValue();
                return (
                  <div className="flex gap-1 items-center">
                    {(owns * (holdersQuery.data?.project.drop?.price || 0)) as number}
                    <span className="text-xs text-gray-400">SOL</span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('owns', {
              id: 'owns',
              header: () => (
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400 font-medium">Owned Editions</span>
                </div>
              ),
              cell: (info) => {
                const owns = info.getValue();
                const share = Math.ceil(
                  (owns / (holdersQuery.data?.project.drop?.collection.totalMints || 0)) * 100
                );
                return (
                  <div className="flex gap-1 items-center">
                    {owns} / <span className="text-xs text-gray-400">{share}%</span>
                  </div>
                );
              },
            }),
            columnHelper.display({
              id: 'options',
              header: () => <Icon.TableAction />,
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
          data={holders}
        />
      )}
    </div>
  );
}
