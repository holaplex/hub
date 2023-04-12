'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from './../../../../../components/Icon';
import Table from './../../../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetProjectCustomers } from './../../../../../queries/customer.graphql';
import { AssetType, Customer, Project } from './../../../../../graphql.types';
import { useProject } from '../../../../../hooks/useProject';
import { DateFormat, formatDateString } from './../../../../../modules/time';

interface GetProjectCustomersData {
  project: Pick<Project, 'customers'>;
}

interface GetProjectCustomersVars {
  project: string;
}

export default function CustomersPage() {
  const { project } = useProject();

  const projectsQuery = useQuery<GetProjectCustomersData, GetProjectCustomersVars>(
    GetProjectCustomers,
    {
      variables: { project: project?.id },
    }
  );

  const customers = projectsQuery.data?.project.customers || [];

  const noCustomers = customers.length === 0;
  const columnHelper = createColumnHelper<Customer>();
  const loadingColumnHelper = createColumnHelper<any>();

  const loading = projectsQuery.loading;

  return (
    <div className="h-full flex flex-col p-4">
      {loading ? (
        <>
          <div className="w-36 h-8 rounded-md bg-loadingui animate-pulse" />
          <div className="w-32 h-8 rounded-md bg-loadingui animate-pulse mt-4 self-end" />
          <Table
            className="mt-4"
            columns={[
              loadingColumnHelper.display({
                id: 'id',
                header: () => (
                  <div className="flex gap-2 items-center">
                    <span className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                  </div>
                ),
                cell: () => (
                  <div className="flex gap-2 items-center">
                    <span className="rounded-full h-3 w-40 bg-loadingui animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'createdAt',
                header: () => <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />,
                cell: () => (
                  <div className="flex flex-col gap-1">
                    <span className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />
                    <span className="rounded-full h-3 w-8 bg-loadingui animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'wallets',
                header: () => <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />,
                cell: () => (
                  <div className="flex flex-row gap-1">
                    <span className="rounded-full w-6 aspect-square bg-loadingui animate-pulse" />
                    <span className="rounded-full w-6 aspect-square bg-loadingui animate-pulse" />
                    <span className="rounded-full w-6 aspect-square bg-loadingui animate-pulse" />
                  </div>
                ),
              }),
              loadingColumnHelper.display({
                id: 'options',
                header: () => <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />,
                cell: () => <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />,
              }),
            ]}
            data={new Array(4)}
          />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-medium">Customers</h1>
          {noCustomers ? (
            <div className="h-full flex-1 flex flex-col items-center justify-center">
              <Icon.Large.CreateCustomers />
              <span className="mt-6 text-xl font-semibold">No customers yet</span>
              <span className="mt-2 text-subtletext text-sm">
                Click button below to understand how to integrate customers.
              </span>
              <a
                href="https://docs.holaplex.dev/hub/Guides/creating-a-customer-wallet"
                target="_blank"
              >
                <Button icon={<Icon.Help className="stroke-secondary" />} className="mt-8">
                  How to integrate
                </Button>
              </a>
            </div>
          ) : (
            <div className="mt-4 flex flex-col">
              <a
                href="https://docs.holaplex.dev/hub/Guides/creating-a-customer-wallet"
                className="self-end"
              >
                <Button
                  icon={<Icon.Help className="stroke-primary" />}
                  variant="secondary"
                  className="self-end"
                >
                  How to integrate
                </Button>
              </a>
              <Table
                className="mt-4"
                columns={[
                  columnHelper.accessor('id', {
                    header: () => <span>Customer ID</span>,
                    cell: (info) => (
                      <Link
                        href={`/projects/${project?.id}/customers/${info.getValue()}/nfts`}
                        className="text-xs font-medium"
                      >
                        {info.getValue()}
                      </Link>
                    ),
                  }),
                  columnHelper.accessor('createdAt', {
                    header: () => <span>Registered</span>,
                    cell: (info) => {
                      return (
                        <div className="flex flex-col">
                          <span className="text-xs text-subtletext font-medium">
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      );
                    },
                  }),
                  columnHelper.accessor(
                    ({ treasury }) => treasury?.wallets?.map((wallet) => wallet.assetId),
                    {
                      id: 'wallets',
                      header: () => <span>Wallets</span>,
                      cell: (info) => {
                        return (
                          <div className="flex flex-row gap-1">
                            {info.getValue().map((assetId: AssetType) => {
                              let icon: React.ReactNode;

                              switch (assetId) {
                                case AssetType.SolTest:
                                case AssetType.Sol:
                                  icon = <Icon.Crypto.Sol />;
                              }

                              return icon;
                            })}
                          </div>
                        );
                      },
                    }
                  ),
                  columnHelper.display({
                    id: 'options',
                    header: () => <div />,
                    cell: (info) => (
                      <PopoverBox
                        triggerButton={
                          <div className="px-2 py-1 hover:rounded-md hover:bg-highlightcell max-w-min">
                            <Icon.More />
                          </div>
                        }
                        elements={[
                          <Link
                            key="delete_project"
                            className="flex gap-2 items-center"
                            href={`/projects/${project?.id}/customers/${info.getValue()}/delete`}
                          >
                            <Icon.Delete fill="#E52E2E" />
                            <span className="text-negative">Remove</span>
                          </Link>,
                        ]}
                      />
                    ),
                  }),
                ]}
                data={customers}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
