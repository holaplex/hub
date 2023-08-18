'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from './../../../../../../../../../../../components/Icon';
import Table from './../../../../../../../../../../../components/Table';
import {
  Holder,
  Project,
  Blockchain,
  Maybe,
  CollectionMint,
  NftTransfer,
} from './../../../../../../../../../../../graphql.types';
import { formatDateString, DateFormat } from '../../../../../../../../../../../modules/time';
import { GetCollectionMintTransfers } from './../../../../../../../../../../../queries/mint.graphql';
import { useQuery } from '@apollo/client';
import Typography, { Size } from './../../../../../../../../../../../components/Typography';
import { useMemo } from 'react';

interface CollectionNftTransfersProps {
  project: string;
  collection: string;
  mint: string;
  loading?: boolean;
}

interface GetCollectionNftTransfersData {
  mint: Maybe<CollectionMint>;
}

interface GetCollectionNftTransfersVars {
  mint: string;
}

export default function CollectionNftTransfers({
  project,
  collection,
  mint,
  loading,
}: CollectionNftTransfersProps) {
  const columnHelper = createColumnHelper<NftTransfer>();
  const loadingColumnHelper = createColumnHelper<any>();

  const transferQuery = useQuery<GetCollectionNftTransfersData, GetCollectionNftTransfersVars>(
    GetCollectionMintTransfers,
    {
      variables: { mint },
    }
  );

  const transferHistories = transferQuery.data?.mint?.transferHistories || [];
  const noTransferHistories = transferHistories.length === 0;
  const blockchain = transferQuery.data?.mint?.collection?.blockchain;

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
      {transferQuery.loading || loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'sender',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'receiver',
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
                header: () => <div className="rounded-full h-4 w-20 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-col gap-1">
                    <div className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />
                    <div className="rounded-full h-3 w-8 bg-stone-800 animate-pulse" />
                  </div>
                ),
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
      ) : noTransferHistories ? (
        <div className="flex flex-col gap-2 items-center">
          <Typography.Header size={Size.H2}>No transfers yet</Typography.Header>
          <Typography.Paragraph className="text-gray-400">
            This NFT has not been transferred yet.
          </Typography.Paragraph>
        </div>
      ) : (
        <Table
          columns={[
            columnHelper.accessor('shortSender', {
              header: () => <span>Sender</span>,
              cell: (info) => {
                const sender = info.getValue();
                return (
                  <div className="flex gap-2">
                    {blockchainIcon}
                    <span className="text-xs text-white font-medium">{sender}</span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('shortRecipient', {
              header: () => <span>Recipient</span>,
              cell: (info) => {
                const recipient = info.getValue();
                return (
                  <div className="flex gap-2">
                    {blockchainIcon}
                    <span className="text-xs text-white font-medium">{recipient}</span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('createdAt', {
              id: 'when',
              header: () => <span>When</span>,
              cell: (info) => {
                const createdAt = info.getValue();
                return (
                  <div className="flex gap-1 flex-col">
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
          data={transferHistories}
        />
      )}
    </div>
  );
}
