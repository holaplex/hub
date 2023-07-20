'use client';
import { PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from '../../../../../components/Icon';
import Table from '../../../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetProjectCollections } from './../../../../../queries/collections.graphql';
import { Collection, Project } from '../../../../../graphql.types';
import { convertLocalTime, DateFormat } from '../../../../../modules/time';
import Copy from '../../../../../components/Copy';
import { useProject } from '../../../../../hooks/useProject';
import { format } from 'date-fns';

interface GetCollectionsData {
  project: Project;
}

interface GetCollectionsVars {
  project: string;
}
export default function ProjectCollectionsPage() {
  const { project } = useProject();

  const collectionsQuery = useQuery<GetCollectionsData, GetCollectionsVars>(GetProjectCollections, {
    variables: { project: project?.id },
  });

  const collections = collectionsQuery.data?.project.collections || [];
  const noCollections = collections.length === 0;
  const columnHelper = createColumnHelper<Collection>();
  const loadingColumnHelper = createColumnHelper<any>();

  const loading = collectionsQuery.loading;

  return (
    <>
      <div className="h-full flex flex-col p-6">
        {loading ? (
          <>
            <div className="w-36 h-8 rounded-md bg-stone-900 animate-pulse" />
            <div className="w-32 h-8 rounded-md bg-stone-900 animate-pulse mt-4 self-end" />
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'name',
                  header: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-md h-8 w-8 bg-stone-800 animate-pulse" />
                      <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'nfts',
                  header: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                  cell: () => (
                    <div className="flex items-center">
                      <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'type',
                  header: () => (
                    <div className="flex items-center">
                      <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                  cell: () => (
                    <div className="flex items-center">
                      <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdAt',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-stone-800 animate-pulse" />
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
          <>
            <h1 className="text-2xl text-white font-medium">Collections</h1>
            {noCollections ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <span className="mt-6 text-xl font-semibold">No collections created yet</span>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <Table
                  className="mt-4"
                  columns={[
                    // @ts-ignore
                    columnHelper.accessor('metadataJson.name', {
                      header: () => <span>Collection Name</span>,
                      cell: (info) => {
                        const collection = info.row.original;
                        const image = collection.metadataJson?.image;
                        return (
                          <Link
                            href={`/projects/${project?.id}/collections/${info.row.original.id}/nfts`}
                            className="flex gap-2 items-center"
                          >
                            {image ? (
                              <img className="w-8 h-8 rounded-md" src={image} alt="logo" />
                            ) : (
                              <div className="w-8 h-8 bg-stone-800 rounded-md" />
                            )}
                            <span className="text-white text-xs font-medium">
                              {info.getValue()}
                            </span>
                          </Link>
                        );
                      },
                    }),
                    columnHelper.accessor('totalMints', {
                      header: () => <span>NFTs</span>,
                      cell: (info) => {
                        return (
                          <div className="text-white text-xs font-medium">{info.getValue()}</div>
                        );
                      },
                    }),
                    columnHelper.accessor('drop', {
                      header: () => <span>Type</span>,
                      cell: (info) => {
                        return (
                          <div className="text-white text-xs font-medium">
                            {info.getValue() ? 'Drop' : 'Open'}
                          </div>
                        );
                      },
                    }),
                    columnHelper.accessor('createdAt', {
                      header: () => <span>Created</span>,
                      cell: (info) => {
                        return (
                          <div className="flex flex-col">
                            <span className="text-gray-400 text-xs font-medium">
                              {format(convertLocalTime(info.getValue()), DateFormat.DATE_1)}
                            </span>
                            <span className="text-white text-xs">
                              {format(convertLocalTime(info.getValue()), DateFormat.TIME_1)}
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
                        const collectionId = info.row.original.id;
                        return (
                          <span>
                            <PopoverBox
                              triggerButton={
                                <div className="px-2 py-1 hover:rounded-md hover:bg-stone-800 inline-block">
                                  <Icon.More />
                                </div>
                              }
                              elements={[
                                <Copy key="copy_id" copyString={collectionId}>
                                  <span>Copy collection ID</span>
                                </Copy>,
                              ]}
                            />
                          </span>
                        );
                      },
                    }),
                  ]}
                  data={collections}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
