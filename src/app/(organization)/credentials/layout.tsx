'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { Organization, Credential } from '../../../graphql.types';
import { useOrganization } from '../../../hooks/useOrganization';
import { DateFormat, formatDateString } from '../../../modules/time';
import { GetOrganizationCredentials } from './../../../queries/credentials.graphql';

interface GetOrganizationCredentialsData {
  organization: Organization;
}

interface GetOrganizationCredentialsVars {
  organization: string;
}

export default function ProjectsPage({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();

  const credentialsQuery = useQuery<GetOrganizationCredentialsData, GetOrganizationCredentialsVars>(
    GetOrganizationCredentials,
    { variables: { organization: organization?.id } }
  );

  const columnHelper = createColumnHelper<Credential>();
  const loadingColumnHelper = createColumnHelper<any>();

  const noCredentials = credentialsQuery.data?.organization.credentials.length === 0;

  return (
    <>
      <div className="h-full flex flex-col p-4">
        {credentialsQuery.loading ? (
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
                  id: 'createdBy',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-10 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'id',
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
                        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
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
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      ),
                    }),

                    columnHelper.accessor('createdBy', {
                      header: () => (
                        <span className="flex text-xs text-gray-600 font-medium self-start">
                          Created by
                        </span>
                      ),
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs text-primary font-medium">
                            {`${info.getValue().firstName} ${info.getValue().lastName}`}
                          </span>
                          <span className="text-xs text-gray-500">{info.getValue().email}</span>
                        </div>
                      ),
                    }),

                    columnHelper.display({
                      id: 'clientId',
                      header: () => <Icon.TableAction />,
                      cell: (info) => (
                        <PopoverBox
                          popperPlacement="auto"
                          triggerButton={
                            <div className="px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min">
                              <Icon.More />
                            </div>
                          }
                          elements={[
                            <Link
                              key="delete"
                              className="flex gap-2 items-center"
                              href={`/credentials/${info.row.original.clientId}/delete`}
                            >
                              <Icon.Delete fill="#E52E2E" />
                              <span className="text-negative">Delete</span>
                            </Link>,
                          ]}
                        />
                      ),
                    }),
                  ]}
                  data={credentialsQuery.data?.organization.credentials || []}
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
