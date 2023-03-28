'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import React from 'react';
import { Icon } from './../../../../../components/Icon';
import Table from './../../../../../components/Table';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetProjectCustomers } from './../../../../../queries/customer.graphql';
import { Customer, Project } from './../../../../../graphql.types';
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
          <div className="w-36 h-8 rounded-md bg-gray-100 animate-pulse" />
          <div className="w-32 h-8 rounded-md bg-gray-100 animate-pulse mt-4 self-end" />
          <Table
            className="mt-4"
            columns={[
              loadingColumnHelper.display({
                id: 'id',
                header: () => (
                  <div className="flex gap-2 items-center">
                    <span className="rounded-full h-4 w-4 bg-gray-100 animate-pulse" />
                    <span className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />
                  </div>
                ),
                cell: () => (
                  <div className="flex gap-2 items-center">
                    <span className="rounded-full h-3 w-40 bg-gray-50 animate-pulse" />
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
          <h1 className="text-2xl text-primary font-medium">Customers</h1>
          {noCustomers ? (
            <div className="h-full flex-1 flex flex-col items-center justify-center">
              <Icon.Large.CreateCustomers />
              <span className="mt-6 text-xl font-semibold">No customers yet</span>
              <span className="mt-2 text-gray-500 text-sm">
                Click button below to understand how to integrate customers.
              </span>
              <a href="https://docs.holaplex.dev/hub/Guides/creating-a-customer-wallet">
                <Button icon={<Icon.Help stroke="#ffffff" />} className="mt-8">
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
                <Button icon={<Icon.Help stroke="#000" />} variant="secondary" className="self-end">
                  How to integrate
                </Button>
              </a>
              <Table
                className="mt-4"
                columns={[
                  columnHelper.accessor('id', {
                    header: () => (
                      <div className="flex gap-2">
                        <span className="text-xs text-gray-600 font-medium">Customer ID</span>
                      </div>
                    ),
                    cell: (info) => (
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                    ),
                  }),
                  columnHelper.accessor('createdAt', {
                    header: () => (
                      <span className="flex text-xs text-gray-600 font-medium self-start">
                        Registered
                      </span>
                    ),
                    cell: (info) => {
                      return (
                        <div className="flex flex-col">
                          <span className="text-xs text-primary font-medium">
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      );
                    },
                  }),
                  columnHelper.accessor(({ id }) => id, {
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
