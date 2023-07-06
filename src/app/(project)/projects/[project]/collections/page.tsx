'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from '../../../../../components/Icon';
import Table from '../../../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetOrganizationProjects } from './../../../queries/organization.graphql';
import { Organization, Project } from '../../../../../graphql.types';
import { useOrganization } from '../../../../../hooks/useOrganization';
import { DateFormat, formatDateString } from '../../../../../modules/time';
import Copy from '../../../../../components/Copy';

interface GetProjectsData {
  organization: Organization;
}

interface GetProjectsVars {
  organization: string;
}
export default function OrganizationCollectionsPage() {
  const { organization } = useOrganization();

  const projectsQuery = useQuery<GetProjectsData, GetProjectsVars>(GetOrganizationProjects, {
    variables: { organization: organization?.id },
  });

  const projects = projectsQuery.data?.organization.projects || [];
  const noProjects = projects.length === 0;
  const columnHelper = createColumnHelper<Project>();
  const loadingColumnHelper = createColumnHelper<any>();

  const loading = projectsQuery.loading;

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
            <h1 className="text-2xl text-white font-medium">Projects</h1>
            {noProjects ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <Icon.Large.CreateProject />
                <span className="mt-6 text-xl font-semibold">No collections created yet</span>
                <span className="mt-2 text-gray-400 text-sm">
                  Click button below to get started.
                </span>
                <Link href="/collections/new">
                  <Button icon={<Icon.CreateProject />} className="mt-8">
                    Create new collection
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <Link href="/collections/new" className="self-end">
                  <Button icon={<Icon.Add />} className="self-end">
                    Collection
                  </Button>
                </Link>
                <Table
                  className="mt-4"
                  columns={[
                    // @ts-ignore
                    columnHelper.accessor('name', {
                      header: () => <span>Collection Name</span>,
                      cell: (info) => {
                        const profileImage = info.row.original.profileImageUrl;
                        return (
                          <Link
                            href={`/collections/${info.row.original.id}/nfts`}
                            className="flex gap-2 items-center"
                          >
                            {profileImage ? (
                              <img className="w-8 h-8 rounded-md" src={profileImage} alt="logo" />
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
                    columnHelper.accessor('createdAt', {
                      header: () => <span>Created</span>,
                      cell: (info) => {
                        return (
                          <div className="flex flex-col">
                            <span className="text-gray-400 text-xs font-medium">
                              {formatDateString(info.getValue(), DateFormat.DATE_1)}
                            </span>
                            <span className="text-white text-xs">
                              {formatDateString(info.getValue(), DateFormat.TIME_1)}
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
                                <Link
                                  key="edit_collection"
                                  className="flex gap-2 items-center"
                                  href={`/collections/${collectionId}/edit`}
                                >
                                  <Icon.Edit stroke="stroke-gray-400" />{' '}
                                  <span>Edit collection</span>
                                </Link>,
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
                  data={projects}
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
