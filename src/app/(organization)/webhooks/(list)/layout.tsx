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
import { Pill } from '../../../../components/Pill';
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
      <div className="h-full flex flex-col p-6">
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
                      header: () => <span>Name</span>,
                      size: 100,
                      cell: (info) => (
                        <span className="text-white text-xs inline-block font-medium truncate w-full">
                          {info.getValue()}
                        </span>
                      ),
                    }),
                    columnHelper.accessor('url', {
                      header: () => <span>URL</span>,
                      size: 160,
                      cell: (info) => (
                        <span className="text-white text-xs inline-block font-medium truncate w-full">
                          {info.getValue()}
                        </span>
                      ),
                    }),
                    columnHelper.display({
                      id: 'events',
                      header: () => <span>Events</span>,
                      size: 384,
                      cell: (info) => (
                        <Pill.List.Compact>
                          {info.row.original.events.map((event) => {
                            return (
                              <Pill key={event} variant="info">
                                {event}
                              </Pill>
                            );
                          })}
                        </Pill.List.Compact>
                      ),
                    }),
                    columnHelper.accessor('createdAt', {
                      header: () => <span>Created date</span>,
                      size: 136,
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-gray-400 text-xs font-medium">
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs text-white">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      ),
                    }),
                    columnHelper.accessor('createdBy', {
                      header: () => (
                        <span className="flex text-xs text-gray-400 font-medium">Created by</span>
                      ),
                      size: 160,
                      cell: (info) => (
                        <div className="flex flex-col">
                          <span className="text-xs text-white font-medium">
                            {`${info.getValue().firstName} ${info.getValue().lastName}`}
                          </span>
                          <span className="text-xs text-gray-400">{info.getValue().email}</span>
                        </div>
                      ),
                    }),
                    columnHelper.display({
                      id: 'options',
                      meta: {
                        align: 'right',
                      },
                      header: () => <></>,
                      size: 64,
                      cell: (info) => (
                        <PopoverBox
                          triggerButton={
                            <div className={clsx('px-2 py-1 hover:rounded-md hover:bg-stone-800')}>
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
                              <Icon.Edit stroke="stroke-gray-400" /> <span>Edit</span>
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
