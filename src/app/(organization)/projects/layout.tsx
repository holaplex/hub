'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetOrganizationProjects } from './../../../queries/organization.graphql';
import { Organization, Project } from '../../../graphql.types';
import { useOrganization } from '../../../hooks/useOrganization';

interface GetProjectsData {
  organization: Organization;
}

interface GetProjectsVars {
  organization: string;
}

export default function ProjectsPage({ children }: { children: React.ReactNode }) {
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
      <div className="h-full flex flex-col p-4">
        {loading ? (
          <>
            <div className="w-36 h-8 rounded-md bg-gray-100 animate-pulse" />
            <div className="w-32 h-8 rounded-md bg-gray-100 animate-pulse mt-4 self-end" />
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'name',
                  header: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-4 w-4 bg-gray-100 animate-pulse" />
                      <span className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />
                    </div>
                  ),
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-4 w-4 bg-gray-50 animate-pulse" />
                      <span className="rounded-md h-8 w-8 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-4 w-28 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'balance',
                  header: () => <div className="rounded-full h-3 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-3 w-11 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-4 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdAt',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdAt',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-gray-50 animate-pulse" />
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
          <>
            <h1 className="text-2xl text-primary font-medium">Projects</h1>
            {noProjects ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <Icon.Large.CreateProject />
                <span className="mt-6 text-xl font-semibold">No projects created yet</span>
                <span className="mt-2 text-gray-500 text-sm">
                  Click button below to get started.
                </span>
                <Link href="/projects/new">
                  <Button icon={<Icon.CreateProject stroke="#ffffff" />} className="mt-8">
                    Create new project
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <Link href="/projects/new" className="self-end">
                  <Button icon={<Icon.CreateProject stroke="#ffffff" />} className="self-end">
                    Create project
                  </Button>
                </Link>
                <Table
                  className="mt-4"
                  columns={[
                    columnHelper.accessor('name', {
                      header: () => (
                        <div className="flex gap-2">
                          <span className="text-xs text-gray-600 font-medium">Project Name</span>
                        </div>
                      ),
                      cell: (info) => (
                        <Link
                          href={`/projects/${info.row.original.id}/drops`}
                          className="flex gap-2"
                        >
                          <span className="text-xs text-primary font-medium">
                            {info.getValue()}
                          </span>
                        </Link>
                      ),
                    }),
                    columnHelper.display({
                      id: 'balance',
                      header: () => (
                        <span className="flex text-xs text-gray-600 font-medium">
                          Total balance
                        </span>
                      ),
                      cell: () => (
                        <div className="flex gap-1">
                          <span className="text-xs text-primary font-medium">99.99</span>
                          <span className="text-xs text-gray-600 font-medium">USD</span>
                        </div>
                      ),
                    }),
                    columnHelper.accessor('createdAt', {
                      header: () => (
                        <span className="flex text-xs text-gray-600 font-medium self-start">
                          Created date
                        </span>
                      ),
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs text-primary font-medium">
                            {info.getValue()}
                          </span>
                        </div>
                      ),
                    }),
                    columnHelper.display({
                      id: 'options',
                      header: () => <Icon.TableAction />,
                      cell: (info) => (
                        <PopoverBox
                          triggerButton={
                            <div className="px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min">
                              <Icon.More />
                            </div>
                          }
                          elements={[
                            <Link
                              key="transfer_tokens"
                              className="flex gap-2 items-center"
                              href={`/projects/${info.getValue()}/transfer`}
                            >
                              <Icon.TransferTokens /> <span>Transfer tokens</span>
                            </Link>,
                            <Link
                              key="edit_project"
                              className="flex gap-2 items-center"
                              href={`/projects/${info.getValue()}/edit`}
                            >
                              <Icon.Edit /> <span>Edit project</span>
                            </Link>,
                            // TODO: Check the project treasury, if it has funds ask to transfer funds.
                            <Link
                              key="delete_project"
                              className="flex gap-2 items-center"
                              href={`/projects/${info.getValue()}/delete`}
                            >
                              <Icon.Delete fill="#E52E2E" />
                              <span className="text-negative">Delete project</span>
                            </Link>,
                          ]}
                        />
                      ),
                    }),
                  ]}
                  data={projects}
                />
              </div>
            )}
          </>
        )}
      </div>

      {children}
    </>
  );
}
