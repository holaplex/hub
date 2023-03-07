'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../../../components/Icon';
import Table from '../../../../../../../components/Table';
import { CollectionMint, Project } from '../../../../../../../graphql.types';
import { GetCollectionMints } from './../../../../../../../queries/mint.graphql';
import { useQuery } from '@apollo/client';

interface HoldersProps {
  project: string;
  drop: string;
  loading?: boolean;
}

interface GetCollectionMintsData {
  project: Pick<Project, 'drop'>;
}

interface GetCollectionMintsVars {
  project: string;
  drop: string;
}

export default function Holders({ project, drop, loading }: HoldersProps) {
  const columnHelper = createColumnHelper<CollectionMint>();
  const loadingColumnHelper = createColumnHelper<any>();

  const mintsQuery = useQuery<GetCollectionMintsData, GetCollectionMintsVars>(GetCollectionMints, {
    variables: { project, drop },
  });

  const mints = mintsQuery.data?.project.drop?.collection.mints || [];

  return (
    <div className="flex flex-col">
      {mintsQuery.loading || loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'member',
                header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
                    <span className="rounded-full w-2 aspect-square  bg-gray-50 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-gray-50 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'options',
                header: () => <div className="rounded-full h-4 w-4 bg-gray-100 animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-4 bg-gray-50 animate-pulse" />,
              }),
            ]}
            data={new Array(4)}
          />
        </>
      ) : (
        <Table
          columns={[
            columnHelper.accessor('owner', {
              header: () => (
                <div className="flex gap-2">
                  <span className="text-xs text-gray-600 font-medium">Wallet</span>
                </div>
              ),
              cell: (info) => {
                const address = info.getValue();
                return (
                  <div className="flex gap-2">
                    <Icon.Crypto.Sol />
                    <span className="text-xs text-primary font-medium">{`${address.slice(
                      0,
                      6
                    )}...${address.slice(address.length - 4, address.length)}`}</span>
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
          data={mints}
        />
      )}
    </div>
  );
}
