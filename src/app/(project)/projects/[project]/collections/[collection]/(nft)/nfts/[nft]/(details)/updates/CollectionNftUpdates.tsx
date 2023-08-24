'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from './../../../../../../../../../../../components/Icon';
import Table from './../../../../../../../../../../../components/Table';
import {
  Blockchain,
  Maybe,
  CollectionMint,
  UpdateHistory,
  CreationStatus,
} from './../../../../../../../../../../../graphql.types';
import { formatDateString, DateFormat } from './../../../../../../../../../../../modules/time';
import { GetCollectionMintUpdates } from './../../../../../../../../../../../queries/mint.graphql';
import { useQuery } from '@apollo/client';
import Typography, { Size } from './../../../../../../../../../../../components/Typography';
import { useMemo } from 'react';

interface CollectionNftTransfersProps {
  project: string;
  collection: string;
  mint: string;
  loading?: boolean;
}

interface GetCollectionNftUpdatesData {
  mint: Maybe<CollectionMint>;
}

interface GetCollectionNftUpdatesVars {
  mint: string;
}

export default function CollectionNftTransfers({ mint, loading }: CollectionNftTransfersProps) {
  const columnHelper = createColumnHelper<UpdateHistory>();
  const loadingColumnHelper = createColumnHelper<any>();

  const updatesQuery = useQuery<GetCollectionNftUpdatesData, GetCollectionNftUpdatesVars>(
    GetCollectionMintUpdates,
    {
      variables: { mint },
    }
  );

  const updateHistories = updatesQuery.data?.mint?.updateHistories || [];
  const noUpdateHistories = updateHistories.length === 0;
  const blockchain = updatesQuery.data?.mint?.collection?.blockchain;

  let blockchainIcon = useMemo(() => {
    switch (blockchain) {
      case Blockchain.Solana:
        return <Icon.Crypto.Sol />;
      case Blockchain.Polygon:
        return <Icon.Crypto.Polygon />;
      default:
        return <></>;
    }
  }, [blockchain]);

  return (
    <div className="flex flex-col">
      {updatesQuery.loading || loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'signature',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'when',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-col gap-1">
                    <span className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-8 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'status',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />,
              }),
              loadingColumnHelper.display({
                id: 'options',
                meta: {
                  align: 'right',
                },
                header: () => <div className="rounded-full h-4 w-4 bg-stone-800 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-4 bg-stone-800 animate-pulse" />,
              }),
            ]}
            data={new Array(4)}
          />
        </>
      ) : noUpdateHistories ? (
        <div className="flex flex-col gap-2 items-center">
          <Typography.Header size={Size.H2}>No updates yet</Typography.Header>
          <Typography.Paragraph className="text-gray-400">
            This NFT has not been updated yet.
          </Typography.Paragraph>
        </div>
      ) : (
        <Table
          columns={[
            columnHelper.accessor('shortTx', {
              header: () => <span>Signature</span>,
              cell: (info) => {
                const signature = info.getValue();
                return (
                  <div className="flex gap-2">
                    {blockchainIcon}
                    <span className="text-xs text-white font-medium">{signature}</span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('createdAt', {
              id: 'owns',
              header: () => <span>When</span>,
              cell: (info) => {
                const createdAt = info.getValue();
                return (
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-xs font-medium">
                      {formatDateString(createdAt, DateFormat.DATE_1)}
                    </span>
                    <span className="text-white text-xs">
                      {formatDateString(createdAt, DateFormat.TIME_1)}
                    </span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('status', {
              header: () => <span>Status</span>,
              cell: (info) => (
                <Table.CreationStatusPill status={info.getValue() as CreationStatus} />
              ),
            }),
            columnHelper.display({
              id: 'options',
              meta: {
                align: 'right',
              },
              header: () => <></>,
              cell: (info) => {
                const exploreLink = info.row.original.transactionLink;
                const options = [];

                options.push(
                  <Link
                    href={exploreLink as string}
                    target="_blank"
                    key="explorer"
                    className="flex gap-2 items-center"
                  >
                    <Icon.ExternalLink width={20} height={20} /> <span>View on explorer</span>
                  </Link>
                );

                return (
                  <PopoverBox
                    triggerButton={
                      <div
                        className={clsx('px-2 py-1 hover:rounded-md hover:bg-stone-800 max-w-min')}
                      >
                        <Icon.More />
                      </div>
                    }
                    elements={options}
                  />
                );
              },
            }),
          ]}
          data={updateHistories}
        />
      )}
    </div>
  );
}
