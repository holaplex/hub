'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../../../components/Icon';
import { useQuery } from '@apollo/client';
import Table from '../../../../../../../components/Table';
import Typography, { Size } from '../../../../../../../components/Typography';
import { formatDateString, DateFormat } from './../../../../../../../modules/time';
import { CollectionMint, Project } from '../../../../../../../graphql.types';
import { GetCollectionMints } from './../../../../../../../queries/mint.graphql';

interface PurchaseProps {
  loading?: boolean;
  project: string;
  drop: string;
}

interface GetMintsData {
  project: Pick<Project, 'drop'>;
}

interface GetMintsVars {
  project: string;
  drop: string;
}

export default function Purchases({ loading, project, drop }: PurchaseProps) {
  const columnHelper = createColumnHelper<CollectionMint>();
  const loadingColumnHelper = createColumnHelper<any>();

  const mintsQuery = useQuery<GetMintsData, GetMintsVars>(GetCollectionMints, {
    variables: { project, drop },
  });

  const mints = mintsQuery.data?.project.drop?.collection.mints || [];
  const noMints = mints.length === 0;

  return (
    <div className="flex flex-col">
      {mintsQuery.loading || loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'ownerShortAddress',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'createdAt',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'creationStatus',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'options',
                header: () => <div className="rounded-full h-4 w-4 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-4 bg-stone-800 animate-pulse" />,
              }),
            ]}
            data={new Array(4)}
          />
        </>
      ) : noMints ? (
        <div className="flex flex-col gap-2 items-center">
          <Icon.Large.Clipboard />
          <Typography.Header size={Size.H2}>No purchase history yet</Typography.Header>
          <Typography.Paragraph className="text-gray-400">
            Purchase history will appear after the first mint
          </Typography.Paragraph>
        </div>
      ) : (
        <Table
          columns={[
            columnHelper.accessor('ownerShortAddress', {
              header: () => (
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400 font-medium">Wallet</span>
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
            columnHelper.accessor('createdAt', {
              header: () => (
                <div className="flex gap-2">
                  <span className="text-xs text-gray-400 font-medium">Date</span>
                </div>
              ),
              cell: (info) => {
                return (
                  <div className="flex flex-col gap-1 text-xs">
                    <span className="text-white font-medium">
                      {formatDateString(info.getValue(), DateFormat.DATE_1)}
                    </span>
                    <span className="text-gray-400">
                      {formatDateString(info.getValue(), DateFormat.TIME_1)}
                    </span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('creationStatus', {
              header: () => <span className="flex text-xs text-gray-400 font-medium">Status</span>,
              cell: (info) => <Table.PurchaseStatusPill status={info.getValue()} />,
            }),
            columnHelper.display({
              id: 'moreOptions',
              header: () => <Icon.TableAction />,
              cell: () => (
                <PopoverBox
                  triggerButton={
                    <div
                      className={clsx('px-2 py-1 hover:rounded-md hover:bg-stone-800 max-w-min')}
                    >
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
          data={mints}
        />
      )}
    </div>
  );
}
