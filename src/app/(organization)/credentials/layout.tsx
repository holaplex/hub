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
            <div className="w-36 h-8 rounded-md bg-loadingui animate-pulse" />
            <div className="w-32 h-8 rounded-md bg-loadingui animate-pulse mt-4 self-end" />
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'name',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                  ),
                  cell: () => <div className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'createdAt',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-loadingui animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdBy',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-10 bg-loadingui animate-pulse" />
                      <span className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'id',
                  header: () => <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />,
                  cell: () => <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />,
                }),
              ]}
              data={new Array(4)}
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-medium">Credentials</h1>
            {noCredentials ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <Icon.Large.Crdentials />
                <span className="mt-6 text-xl font-semibold">No credentials yet</span>
                <span className="mt-2 text-subtletext text-sm">
                  Click button below to get started.
                </span>
                <Link href="/credentials/new">
                  <Button icon={<Icon.Add className="primary-button-icon" />} className="mt-8">
                    Generate token
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <Link href="/credentials/new" className="self-end">
                  <Button icon={<Icon.Add className="primary-button-icon" />} className="self-end">
                    Generate token
                  </Button>
                </Link>
                <Table
                  className="mt-4"
                  columns={[
                    columnHelper.accessor('name', {
                      header: () => <span>Name</span>,
                      cell: (info) => (
                        <span className="text-xs font-medium">{info.getValue()}</span>
                      ),
                    }),

                    columnHelper.accessor('createdAt', {
                      header: () => <span>Created date</span>,
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs text-subtletext font-medium">
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      ),
                    }),

                    columnHelper.accessor('createdBy', {
                      header: () => <span>Created by</span>,
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">
                            {`${info.getValue().firstName} ${info.getValue().lastName}`}
                          </span>
                          <span className="text-xs text-subtletext">{info.getValue().email}</span>
                        </div>
                      ),
                    }),

                    columnHelper.display({
                      id: 'clientId',
                      header: () => <div />,
                      cell: (info) => (
                        <PopoverBox
                          popperPlacement="auto"
                          triggerButton={
                            <div className="px-2 py-1 hover:rounded-md hover:bg-highlightcell max-w-min">
                              <Icon.More />
                            </div>
                          }
                          elements={[
                            <Link
                              key="delete"
                              className="flex gap-2 items-center"
                              href={`/credentials/${info.row.original.clientId}/delete`}
                            >
                              <Icon.Delete className="stroke-negative" />
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
