'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../../../components/Icon';
import { useQuery } from '@apollo/client';
import Table from '../../../../../../../components/Table';
import Typography, { Size } from '../../../../../../../components/Typography';
import { formatDateString, DateFormat } from '../../../../../../../modules/time';
import { Blockchain, Project, Purchase } from '../../../../../../../graphql.types';
import { GetCollectionPurchases } from './../../../../../../../queries/purchase.graphql';
import { useMemo } from 'react';

interface MintsProps {
  loading?: boolean;
  project: string;
  drop: string;
}

interface GetPurchasesData {
  project: Pick<Project, 'drop'>;
}

interface GetPurchasesVars {
  project: string;
  drop: string;
}

export default function Mints({ loading, project, drop }: MintsProps) {
  const columnHelper = createColumnHelper<Purchase>();
  const loadingColumnHelper = createColumnHelper<any>();

  const purchasesQuery = useQuery<GetPurchasesData, GetPurchasesVars>(GetCollectionPurchases, {
    variables: { project, drop },
  });

  const purchases = purchasesQuery.data?.project.drop?.collection.purchases || [];
  const blockchain = purchasesQuery.data?.project.drop?.collection.blockchain;
  const noPurchases = purchases.length === 0;

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
      {loading || purchasesQuery.loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'shortWallet',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'shortTx',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <span className="rounded-full h-3 w-24 inline-block bg-stone-800 animate-pulse" />
                ),
              }),
              loadingColumnHelper.display({
                id: 'createdAt',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'creationStatus',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full h-6 w-20 bg-stone-800 animate-pulse" />
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
      ) : noPurchases ? (
        <div className="flex flex-col gap-2 items-center">
          <Typography.Header size={Size.H2}>
            You&apos;ve created a drop! Ok, what&apos;s next?
          </Typography.Header>
          <p className="text-gray-400 text-sm mt-6">
            You can mint an edition from your drop directly to a wallet address by clicking the{' '}
            <Link href={`/projects/${project}/drops/${drop}/mint`} className="text-yellow-300">
              Mint edition
            </Link>{' '}
            button in the upper right hand corner.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            Or you can learn more about building a custom claim/buy page for your drop from our
            <Link
              href="https://docs.holaplex.com/hub/Guides/mint-page-deploy"
              target="_blank"
              className="text-yellow-300"
            >
              {' '}
              documentation
            </Link>{' '}
            or by{' '}
            <Link href="mailto:support@holaplex.com" className="text-yellow-300">
              scheduling a call
            </Link>{' '}
            with our customer success team.
          </p>
        </div>
      ) : (
        <Table
          columns={[
            columnHelper.accessor('shortWallet', {
              header: () => <span>Wallet</span>,
              cell: (info) => {
                return (
                  <div className="flex gap-2">
                    {blockchainIcon}
                    <span className="text-xs text-white font-medium">{info.getValue()}</span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('shortTx', {
              header: () => <span>Transaction</span>,
              cell: (info) => {
                return <span className="text-xs text-white font-medium">{info.getValue()}</span>;
              },
            }),
            columnHelper.accessor('createdAt', {
              header: () => <span>Date</span>,
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
            columnHelper.accessor('status', {
              header: () => <span>Status</span>,
              cell: (info) => <Table.PurchaseStatusPill status={info.getValue()} />,
            }),
            columnHelper.display({
              id: 'moreOptions',
              header: () => <></>,
              cell: (info) => {
                const transactionLink = info.row.original.transactionLink;
                const options = [];

                if (transactionLink) {
                  options.push(
                    <Link
                      href={transactionLink as string}
                      target="_blank"
                      key="explorer"
                      className="flex gap-2 items-center"
                    >
                      <Icon.ExternalLink /> <span>View on explorer</span>
                    </Link>
                  );
                }
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
          data={purchases}
        />
      )}
    </div>
  );
}
