'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from '../../../../components/Icon';
import Table from '../../../../components/Table';
import Link from 'next/link';
import { Project } from '../../../../graphql.types';
import { useOrganization } from '../../../../hooks/useOrganization';
import { DateFormat, formatDateString } from '../../../../modules/time';
import { CredentialStatus } from '../../../../types';

export type TempCrendential = {
  id: string;
  name: string;
  projects: Project[];
  createdDate: string;
  createdBy: string;
  email: string;
  status: CredentialStatus;
};

export default function ProjectsPage({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();

  const credentials: TempCrendential[] = [
    {
      id: 'c1',
      name: 'Usyk Api',
      projects: [{ id: '123', name: 'Team Motley', createdAt: '', organizationId: 'org123' }],
      createdBy: 'Lee Leng',
      email: 'agent@gmail.com',
      createdDate: '01-01-2023 00:03:44',
      status: CredentialStatus.ACTIVE,
    },
  ];
  const noCredentials = credentials.length === 0;
  const columnHelper = createColumnHelper<TempCrendential>();
  const loadingColumnHelper = createColumnHelper<any>();

  const loading = false;

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
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => <div className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'projects',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex gap-1 items-center">
                      <span className="rounded-full h-3 w-20 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-20 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdDate',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdBy',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-20 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-24 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'status',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => <div className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />,
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
            <h1 className="text-2xl text-primary font-medium">Credentials</h1>
            {noCredentials ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <Icon.Large.Crdentials />
                <span className="mt-6 text-xl font-semibold">No credentials yet</span>
                <span className="mt-2 text-gray-500 text-sm">
                  Click button below to get started.
                </span>
                <Link href="/credentials/new">
                  <Button icon={<Icon.AddCredential stroke="#ffffff" />} className="mt-8">
                    Generate token
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <Link href="/credentials/new" className="self-end">
                  <Button icon={<Icon.AddCredential stroke="#ffffff" />} className="self-end">
                    Generate token
                  </Button>
                </Link>
                <Table
                  className="mt-4"
                  columns={[
                    columnHelper.accessor('name', {
                      header: () => (
                        <div className="flex gap-2">
                          <span className="text-xs text-gray-600 font-medium">Name</span>
                        </div>
                      ),
                      cell: (info) => (
                        <Link href={''} className="flex gap-2">
                          <span className="text-xs text-primary font-medium">
                            {info.getValue()}
                          </span>
                        </Link>
                      ),
                    }),

                    columnHelper.display({
                      id: 'projects',
                      header: () => (
                        <span className="flex text-xs text-gray-600 font-medium">Projects</span>
                      ),
                      cell: (info) => (
                        <div className="flex gap-1">
                          {info.row.original.projects.map((project) => {
                            return (
                              <div
                                key={project.id}
                                className="rounded-full py-1 px-3 text-xs font-medium bg-gray-50 text-primary"
                              >
                                {project.name}
                              </div>
                            );
                          })}
                        </div>
                      ),
                    }),

                    columnHelper.accessor('createdDate', {
                      header: () => (
                        <span className="flex text-xs text-gray-600 font-medium self-start">
                          Created date
                        </span>
                      ),
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs text-primary font-medium">
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      ),
                    }),

                    columnHelper.accessor(({ createdBy, email }) => ({ createdBy, email }), {
                      id: 'createdBy',
                      header: () => (
                        <div className="flex gap-2">
                          <span className="text-xs text-gray-600 font-medium">Created by</span>
                        </div>
                      ),
                      cell: (info) => {
                        return (
                          <div className="flex flex-col">
                            <span className="text-xs text-primary font-medium">
                              {info.getValue().createdBy
                                ? info.getValue().createdBy
                                : info.getValue().email}
                            </span>
                            {info.getValue().fullName && (
                              <span className="text-xs text-gray-500">
                                {info.getValue().fullName}
                              </span>
                            )}
                          </div>
                        );
                      },
                    }),

                    columnHelper.accessor((row) => row.status.toString(), {
                      id: 'status',
                      header: () => (
                        <span className="flex text-xs text-gray-600 font-medium">Status</span>
                      ),
                      cell: (info) => (
                        <Table.CredentialStatusPill status={info.getValue() as CredentialStatus} />
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
                              key="edit"
                              className="flex gap-2 items-center"
                              href={`/credentials/${info.row.original.id}/edit`}
                            >
                              <Icon.Edit /> <span>Edit</span>
                            </Link>,
                            <Link
                              key="delete"
                              className="flex gap-2 items-center"
                              href={`/credentials/${info.row.original.id}/delete`}
                            >
                              <Icon.Delete fill="#E52E2E" />
                              <span className="text-negative">Delete</span>
                            </Link>,
                          ]}
                        />
                      ),
                    }),
                  ]}
                  data={credentials}
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
