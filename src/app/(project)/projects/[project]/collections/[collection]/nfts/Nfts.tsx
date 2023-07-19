'use client';
import { createColumnHelper } from '@tanstack/react-table';
import { useQuery } from '@apollo/client';
import Table from '../../../../../../../components/Table';
import { formatDateString, DateFormat } from '../../../../../../../modules/time';
import { CollectionMint, Project } from '../../../../../../../graphql.types';
import { GetProjectCollectionMints } from './../../../../../../../queries/collections.graphql';

interface NftsProps {
  loading?: boolean;
  project: string;
  collection: string;
}

interface GetNftsData {
  project: Pick<Project, 'collection'>;
}

interface GetNftsVars {
  project: string;
  collection: string;
}

export default function Nfts({ loading, project, collection }: NftsProps) {
  const columnHelper = createColumnHelper<CollectionMint>();
  const loadingColumnHelper = createColumnHelper<any>();

  const nftsQuery = useQuery<GetNftsData, GetNftsVars>(GetProjectCollectionMints, {
    variables: { project, collection },
  });

  console.log('nftsquery', nftsQuery);

  const nfts = nftsQuery.data?.project?.collection?.mints || [];
  const noNfts = nfts.length === 0;

  return (
    <div className="flex flex-col">
      {loading || nftsQuery.loading ? (
        <>
          <Table
            columns={[
              loadingColumnHelper.display({
                id: 'name',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2 align-middle">
                    <span className="rounded-full w-4 aspect-square bg-stone-800 animate-pulse" />
                    <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'currentHolder',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <span className="rounded-full h-3 w-24 inline-block bg-stone-800 animate-pulse" />
                ),
              }),
              loadingColumnHelper.display({
                id: 'minted',
                header: () => <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-2">
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
      ) : (
        <Table
          columns={[
            columnHelper.accessor('metadataJson.name', {
              header: () => <span>NFT name</span>,
              cell: (info) => {
                const collectionMint = info.row.original;
                return (
                  <div className="flex gap-2 justify-middle">
                    <img
                      src={collectionMint?.metadataJson?.image as string}
                      className="w-full aspect-square rounded-lg object-cover"
                    />
                    <span className="text-xs text-white font-medium justify-middle">
                      {info.getValue()}
                    </span>
                  </div>
                );
              },
            }),
            columnHelper.accessor('createdBy', {
              header: () => <span>Current holder</span>,
              cell: (info) => {
                return <span className="text-xs text-white font-medium">{info.getValue()}</span>;
              },
            }),
            columnHelper.accessor('createdAt', {
              header: () => <span>Minted</span>,
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
            columnHelper.display({
              id: 'moreOptions',
              header: () => <></>,
              meta: {
                align: 'right',
              },
              cell: (info) => {
                return <></>;
              },
            }),
          ]}
          data={nfts}
        />
      )}
    </div>
  );
}
