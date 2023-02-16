'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import { WebhookStatus } from '../../../types';

export enum WebhookEvent {
  PROJECT_CREATED = 'Project created',
  PROJECT_DEACTIVATED = 'Project deactivated',
  INVITATION_SENT = 'Invitation sent',
  INVITATION_ACCEPTED = 'Invitation accepted',
  INVITATION_REVOKED = 'Invitation revoked',
  CREDENTIAL_CREATED = 'Credential created',
}

type Webhook = {
  name: string;
  url: string;
  events: WebhookEvent[];
  createDate: string;
  createdByName: string;
  createdByEmail: string;
  status: WebhookStatus;
};

export default function WebhooksPage() {
  const router = useRouter();
  const hasWebhooks = true;
  const columnHelper = createColumnHelper<Webhook>();

  return (
    <div className="h-full flex flex-col p-4">
      <div className="text-2xl text-primary font-medium">Webhooks</div>
      {!hasWebhooks ? (
        <div className="h-full flex-1 flex flex-col items-center justify-center">
          <Icon.Large.Webhook />
          <span className="mt-6 text-xl font-semibold">No webhooks yet</span>
          <span className="mt-2 text-gray-500 text-sm">Click button below to get started.</span>
          <Button
            icon={<Icon.AddWebhook stroke="#ffffff" />}
            className="mt-8"
            onClick={() => router.push(`/webhooks/new`)}
          >
            Add Webhook
          </Button>
        </div>
      ) : (
        <div className="mt-4 flex flex-col">
          <Button
            icon={<Icon.AddWebhook stroke="#ffffff" />}
            className="self-end"
            onClick={() => router.push(`/webhooks/new`)}
          >
            Add Webhook
          </Button>
          <Table
            className="mt-4"
            columns={[
              columnHelper.accessor('name', {
                header: () => <span className="text-xs text-gray-600 font-medium">Name</span>,
                cell: (info) => (
                  <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                ),
              }),
              columnHelper.accessor('url', {
                header: () => <span className="text-xs text-gray-600 font-medium">URL</span>,
                cell: (info) => <span className="text-xs text-primary">{info.getValue()}</span>,
              }),
              columnHelper.display({
                id: 'events',
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium">Events</span>
                ),
                cell: (info) => (
                  <div className="flex gap-1">
                    {info.row.original.events.map((event) => {
                      return (
                        <div
                          key={event.toString()}
                          className="rounded-full py-1 px-3 text-xs font-medium bg-cyan-200 text-cyan-600"
                        >
                          {event}
                        </div>
                      );
                    })}
                  </div>
                ),
              }),
              columnHelper.accessor('createDate', {
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium">Create date</span>
                ),
                cell: (info) => (
                  <div className="flex flex-col text-xs">
                    <span className=" text-primary font-medium">{info.getValue()}</span>
                    <span className="text-gray-600">9:56 AM</span>
                  </div>
                ),
              }),
              columnHelper.accessor('createdByName', {
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium">Create by</span>
                ),
                cell: (info) => (
                  <div className="flex flex-col text-xs">
                    <span className=" text-primary font-medium">{info.getValue()}</span>
                    <span className="text-gray-600">{info.row.original.createdByEmail}</span>
                  </div>
                ),
              }),
              columnHelper.accessor((row) => row.status.toString(), {
                id: 'status',
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium">Status</span>
                ),
                cell: (info) => (
                  <Table.WebhookStatusPill status={info.getValue() as WebhookStatus} />
                ),
              }),
              columnHelper.display({
                id: 'moreOptions',
                header: () => <Icon.TableAction />,
                cell: () => (
                  <PopoverBox
                    triggerButton={
                      <div
                        className={clsx('px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min')}
                      >
                        <Icon.More />
                      </div>
                    }
                    elements={[
                      <div key="enable" className="flex gap-2 items-center">
                        <Icon.Check /> <span>Enable</span>
                      </div>,
                      <div key="edit" className="flex gap-2 items-center">
                        <Icon.Edit /> <span>Edit</span>
                      </div>,
                      <div
                        key="delete"
                        className="flex gap-2 items-center"
                        onClick={() => router.push('/webhooks/delete')}
                      >
                        <Icon.Delete fill="#E52E2E" />
                        <span className="text-negative">Delete</span>
                      </div>,
                    ]}
                  />
                ),
              }),
            ]}
            data={[
              {
                name: 'Test hook 1',
                url: 'https://www.youtube.com',
                createDate: '09/02/2023',
                createdByName: 'Lee Leng',
                createdByEmail: 'agent10091@gmail.com',
                events: [WebhookEvent.CREDENTIAL_CREATED, WebhookEvent.INVITATION_ACCEPTED],
                status: WebhookStatus.ACTIVE,
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
