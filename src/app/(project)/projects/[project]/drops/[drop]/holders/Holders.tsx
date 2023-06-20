'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../../../components/Icon';
import Table from '../../../../../../../components/Table';
import { Holder, Project, Blockchain } from '../../../../../../../graphql.types';
import { GetCollectionHolders } from './../../../../../../../queries/holder.graphql';
import { useQuery } from '@apollo/client';
import Typography, { Size } from '../../../../../../../components/Typography';
import { ExploreLink } from '../../../../../../../modules/exploreLink';
import { useMemo } from 'react';

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
  const blockchain = holdersQuery.data?.project.drop?.collection.blockchain;

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
      {holdersQuery.loading || loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'address',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'owns',
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
              header: () => <span>Wallet</span>,
              cell: (info) => {
                const address = info.getValue();
                return (
                  <div className="flex gap-2">
                    {blockchainIcon}
                    <span className="text-xs text-white font-medium">{address}</span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('owns', {
              id: 'owns',
              header: () => <span>Owned Editions</span>,
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
              meta: {
                align: 'right',
              },
              header: () => <></>,
              cell: (info) => {
                const address = info.row.original.address;
                const options = [];
                const exploreLink = new ExploreLink(
                  holdersQuery.data?.project.drop?.collection.blockchain as Blockchain
                );
                options.push(
                  <Link
                    href={exploreLink.getAccountLink(address) as string}
                    target="_blank"
                    key="explorer"
                    className="flex gap-2 items-center"
                  >
                    <Icon.ExternalLink /> <span>View on explorer</span>
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
          data={holders}
        />
      )}
    </div>
  );
}
