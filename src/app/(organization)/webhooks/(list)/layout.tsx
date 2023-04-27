'use client';
import { useQuery } from '@apollo/client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../components/Icon';
import Table from '../../../../components/Table';
import { Organization, Webhook } from '../../../../graphql.types';
import { useOrganization } from '../../../../hooks/useOrganization';
import { DateFormat, formatDateString } from '../../../../modules/time';
import { WebhookStatus, WebhookEvent } from '../../../../types';
import { GetOrganizationWebhooks } from './../../../../queries/webhooks.graphql';

interface GetOrganizationWebhooksData {
  organization: Organization;
}

interface GetOrganizationWebhooksVars {
  organization: string;
}

export default function WebhooksPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { organization } = useOrganization();

  const webhooksQuery = useQuery<GetOrganizationWebhooksData, GetOrganizationWebhooksVars>(
    GetOrganizationWebhooks,
    { variables: { organization: organization?.id } }
  );

  const noWebhooks =
    !webhooksQuery.data?.organization.webhooks ||
    webhooksQuery.data?.organization.webhooks.length === 0;
  const columnHelper = createColumnHelper<Webhook>();
  const loadingColumnHelper = createColumnHelper<any>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        {webhooksQuery.loading ? (
          <>
            <div className="w-36 h-8 rounded-md bg-stone-900 animate-pulse" />
            <div className="w-32 h-8 rounded-md bg-stone-900 animate-pulse mt-4 self-end" />
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'name',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => <div className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'url',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => <div className="rounded-full h-3 w-40 bg-stone-800 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'events',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex gap-1 items-center">
                      <span className="rounded-full h-4 w-20 bg-stone-800 animate-pulse" />
                      <span className="rounded-full h-4 w-20 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdDate',
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
                  id: 'createdBy',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-10 bg-stone-800 animate-pulse" />
                      <span className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'status',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => <div className="rounded-full h-4 w-16 bg-stone-800 animate-pulse" />,
                }),
                loadingColumnHelper.display({
                  id: 'options',
                  header: () => <div className="rounded-full h-4 w-4 bg-stone-800 animate-pulse" />,
                  cell: () => <div className="rounded-full h-4 w-4 bg-stone-800 animate-pulse" />,
                }),
              ]}
              data={new Array(4)}
            />
          </>
        ) : (
          <>
            <div className="text-2xl text-white font-medium">Webhooks</div>
            {noWebhooks ? (
              <div className="h-full flex-1 flex flex-col items-center justify-center">
                <Icon.Large.Webhook />
                <span className="mt-6 text-xl font-semibold">No webhooks yet</span>
                <span className="mt-2 text-gray-400 text-sm">
                  Click button below to get started.
                </span>
                <Button
                  icon={<Icon.AddWebhook />}
                  className="mt-8"
                  onClick={() => router.push(`/webhooks/new`)}
                >
                  Add Webhook
                </Button>
              </div>
            ) : (
              <div className="mt-4 flex flex-col">
                <Button
                  icon={<Icon.AddWebhook />}
                  className="self-end"
                  onClick={() => router.push(`/webhooks/new`)}
                >
                  Add Webhook
                </Button>
                <Table
                  className="mt-4"
                  columns={[
                    columnHelper.accessor('description', {
                      header: () => <span className="text-xs text-gray-400 font-medium">Name</span>,
                      cell: (info) => (
                        <span className="text-xs text-white font-medium">{info.getValue()}</span>
                      ),
                    }),
                    columnHelper.accessor('url', {
                      header: () => <span className="text-xs text-gray-400 font-medium">URL</span>,
                      cell: (info) => <span className="text-xs text-white">{info.getValue()}</span>,
                    }),
                    columnHelper.display({
                      id: 'events',
                      header: () => (
                        <span className="flex text-xs text-gray-400 font-medium">Events</span>
                      ),
                      cell: (info) => (
                        <div className="flex gap-1">
                          {info.row.original.events.map((event) => {
                            return (
                              <div
                                key={event}
                                className="rounded-full py-1 px-3 text-xs font-medium bg-cyan-200 text-cyan-600"
                              >
                                {event}
                              </div>
                            );
                          })}
                        </div>
                      ),
                    }),
                    columnHelper.accessor('createdAt', {
                      header: () => (
                        <span className="flex text-xs text-gray-400 font-medium">Created date</span>
                      ),
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs text-white font-medium">
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      ),
                    }),
                    columnHelper.accessor('createdBy', {
                      header: () => (
                        <span className="flex text-xs text-gray-400 font-medium">Created by</span>
                      ),
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs text-white font-medium">
                            {`${info.getValue().firstName} ${info.getValue().lastName}`}
                          </span>
                          <span className="text-xs text-gray-400">{info.getValue().email}</span>
                        </div>
                      ),
                    }),
                    // columnHelper.accessor((row) => row.status.toString(), {
                    //   id: 'status',
                    //   header: () => (
                    //     <span className="flex text-xs text-gray-400 font-medium">Status</span>
                    //   ),
                    //   cell: (info) => (
                    //     <Table.WebhookStatusPill status={info.getValue() as WebhookStatus} />
                    //   ),
                    // }),
                    columnHelper.display({
                      id: 'options',
                      header: () => <Icon.TableAction />,
                      cell: (info) => (
                        <PopoverBox
                          triggerButton={
                            <div
                              className={clsx(
                                'px-2 py-1 hover:rounded-md hover:bg-stone-800 max-w-min'
                              )}
                            >
                              <Icon.More />
                            </div>
                          }
                          elements={[
                            // <Link
                            //   key="enable"
                            //   className="flex gap-2 items-center"
                            //   href={`/webhooks/${info.row.original.id}/edit`}
                            // >
                            //   <Icon.Check /> <span>Enable</span>
                            // </Link>,
                            <Link
                              key="edit"
                              className="flex gap-2 items-center"
                              href={`/webhooks/${info.row.original.id}/edit`}
                            >
                              <Icon.Edit stroke="stoke-white" /> <span>Edit</span>
                            </Link>,
                            <Link
                              key="delete"
                              className="flex gap-2 items-center"
                              href={`/webhooks/${info.row.original.id}/delete`}
                            >
                              <Icon.Delete stroke="stroke-red-500" />
                              <span className="text-red-500">Delete</span>
                            </Link>,
                          ]}
                        />
                      ),
                    }),
                  ]}
                  data={webhooksQuery.data?.organization.webhooks || []}
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
