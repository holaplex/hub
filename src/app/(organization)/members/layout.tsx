'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { Organization, Maybe, Member } from '../../../graphql.types';
import { MemberStatus } from './../../../types';
import { useOrganization } from '../../../hooks/useOrganization';
import { GetOrganizationMembers } from './../../../queries/organization.graphql';
import { DateFormat, formatDateString } from '../../../modules/time';
import { appConfig } from './../../../app.config';
import useClipboard from './../../../hooks/useClipboard';

type Associate = {
  id: string;
  email: string;
  fullName?: string;
  member?: Maybe<Member>;
  createdAt: string;
  status: MemberStatus;
};

interface GetOrganizationMembersData {
  organization: Organization;
}

interface GetOrganizationMembersVars {
  organization: string;
}

function ActionCell({ id, status }: { id: string; status: MemberStatus }): JSX.Element {
  const { copied, copyText } = useClipboard(`${appConfig.client('fqdn')}/invites/${id}`);

  if (status === MemberStatus.Owner) {
    return <div />;
  }

  let elements = [
    <Link key="delete_member" className="flex gap-2 items-center" href={`/members/${id}/delete`}>
      <Icon.Delete fill="#E52E2E" />
      <span className="text-negative">Delete member</span>
    </Link>,
  ];

  if (status === MemberStatus.Sent) {
    elements = [
      ...elements,
      <span key="copy" className="flex flex-row gap-2" onClick={copyText}>
        {copied ? <Icon.Check /> : <Icon.Copy />}
        Invite link
      </span>,
    ];
  }

  return (
    <PopoverBox
      triggerButton={
        <div className={clsx('px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min')}>
          <Icon.More />
        </div>
      }
      elements={elements}
    />
  );
}

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();
  const membersQuery = useQuery<GetOrganizationMembersData, GetOrganizationMembersVars>(
    GetOrganizationMembers,
    { variables: { organization: organization?.id } }
  );

  const columnHelper = createColumnHelper<Associate>();
  const loadingColumnHelper = createColumnHelper<any>();

  const associates: Associate[] = useMemo(() => {
    const { data } = membersQuery;

    if (!data) {
      return [];
    }
    const {
      organization: { owner, invites },
    } = data;

    if (!owner || !invites) {
      return [];
    }

    const associates: Associate[] = invites.map(({ id, email, member, createdAt, status }) => {
      let associate = {
        id: member?.id || id,
        email: member?.user?.email || email,
        user: member?.user,
        createdAt: member?.createdAt || createdAt,
        status: status as unknown as MemberStatus,
      } as Associate;

      if (member) {
        associate.fullName = `${member?.user?.firstName} ${member?.user?.lastName}`;
      }

      return associate;
    });

    return [
      {
        id: owner.id as string,
        email: owner?.user?.email,
        fullName: `${owner?.user?.firstName} ${owner?.user?.lastName}`,
        createdAt: owner?.createdAt,
        status: MemberStatus.Owner,
      } as Associate,
      ...associates,
    ];
  }, [membersQuery]);

  const loading = membersQuery.loading;

  const columns = [
    columnHelper.accessor(
      ({ fullName, email }) => ({ fullName, email }),
      // @ts-ignore
      {
        id: 'member',
        header: () => (
          <div className="flex gap-2">
            <span className="text-xs text-gray-600 font-medium">Members</span>
          </div>
        ),
        cell: (info) => {
          return (
            <div className="flex flex-col">
              <span className="text-xs text-primary font-medium">
                {info.getValue().fullName ? info.getValue().fullName : info.getValue().email}
              </span>
              {info.getValue().fullName && (
                <span className="text-xs text-gray-500">{info.getValue().fullName}</span>
              )}
            </div>
          );
        },
      }
    ),
    columnHelper.accessor('createdAt', {
      header: () => (
        <span className="flex text-xs text-gray-600 font-medium self-start">Invited</span>
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
    columnHelper.accessor('status', {
      header: () => <span className="flex text-xs text-gray-600 font-medium">Status</span>,
      cell: (info) => <Table.MemberPill status={info.getValue()} />,
    }),
    columnHelper.accessor(({ id, status }) => ({ id, status }), {
      id: 'options',
      header: () => <Icon.TableAction />,
      cell: (info) => <ActionCell id={info.getValue().id} status={info.getValue().status} />,
    }),
  ];

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
                  id: 'member',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-20 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-24 bg-gray-50 animate-pulse" />
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
            <h1 className="text-2xl text-primary font-medium">Members</h1>
            <div className="mt-4 flex flex-col">
              <Link href="/members/invite" className="self-end">
                <Button icon={<Icon.InviteMember stroke="#ffffff" />}>Invite member</Button>
              </Link>
              <Table className="mt-4" columns={columns} data={associates} />
            </div>
          </>
        )}
      </div>
      {children}
    </>
  );
}
