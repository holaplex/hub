'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { Organization, Maybe, Member, Owner, User } from '../../../graphql.types';
import { MemberStatus } from './../../../types';
import { useSession } from './../../../hooks/useSession';
import { useOrganization } from '../../../hooks/useOrganization';
import { Session } from '@ory/client';
import { GetOrganizationMembers } from './../../../queries/organization.graphql';
import { DateFormat, formatDateString } from '../../../modules/time';
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

function ActionCell({
  id,
  status,
  owner,
  session,
}: {
  id: string;
  status: MemberStatus;
  owner: Maybe<Owner> | undefined;
  session: Session | undefined;
}): JSX.Element {
  const { copied, copyText } = useClipboard(`${process.env.NEXT_PUBLIC_APP_FQDN}/invites/${id}`);

  if (status === MemberStatus.Owner) {
    return <div />;
  }

  let elements: JSX.Element[] = [];
  if (session?.identity.id === owner?.user?.id) {
    status === MemberStatus.Inactive &&
      elements.push(
        <Link
          key="reactivate_member"
          className="flex gap-2 items-center"
          href={`/members/${id}/reactivate`}
        >
          <span>Reactivate member</span>
        </Link>
      );

    status === MemberStatus.Accepted &&
      elements.push(
        <Link
          key="delete_member"
          className="flex gap-2 items-center"
          href={`/members/${id}/deactivate`}
        >
          <Icon.Delete stroke="stroke-red-500" />
          <span className="text-red-500">Deactivate member</span>
        </Link>
      );
  }

  if (status === MemberStatus.Sent) {
    elements = [
      ...elements,
      <span key="copy" className="flex flex-row gap-2" onClick={copyText}>
        {copied ? <Icon.Check /> : <Icon.Copy />}
        Invite link
      </span>,
    ];
  }

  if (elements.length === 0) {
    return <div />;
  }

  return (
    <PopoverBox
      popperPlacement="auto"
      triggerButton={
        <div className={clsx('px-2 py-1 hover:rounded-md hover:bg-stone-800 max-w-min')}>
          <Icon.More />
        </div>
      }
      elements={elements}
    />
  );
}

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  const { organization } = useOrganization();
  const { session } = useSession();
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
        createdAt: member?.createdAt || createdAt,
        status: status as unknown as MemberStatus,
      } as Associate;

      if (member) {
        associate.fullName = `${member?.user?.firstName} ${member?.user?.lastName}`;
        if (member.deactivatedAt) {
          associate.status = MemberStatus.Inactive;
        }
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
        header: () => <span>Members</span>,
        cell: (info) => {
          return (
            <div className="flex flex-col">
              <span className="text-white text-xs font-medium">
                {info.getValue().fullName ? info.getValue().fullName : info.getValue().email}
              </span>
              {info.getValue().email && (
                <span className="text-gray-400 text-xs font-medium">{info.getValue().email}</span>
              )}
            </div>
          );
        },
      }
    ),
    columnHelper.accessor('createdAt', {
      header: () => <span>Invited</span>,
      cell: (info) => {
        return (
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs font-medium">
              {formatDateString(info.getValue(), DateFormat.DATE_1)}
            </span>
            <span className="text-white text-xs">
              {formatDateString(info.getValue(), DateFormat.TIME_1)}
            </span>
          </div>
        );
      },
    }),
    columnHelper.accessor('status', {
      header: () => <span>Status</span>,
      cell: (info) => <Table.MemberPill status={info.getValue()} />,
    }),
    columnHelper.display({
      id: 'options',
      meta: {
        align: 'right',
      },
      header: () => <></>,
      cell: (info) => (
        <ActionCell
          id={info.row.original.id}
          status={info.row.original.status}
          owner={membersQuery.data?.organization.owner}
          session={session}
        />
      ),
    }),
  ];

  return (
    <>
      <div className="h-full flex flex-col p-6">
        {loading ? (
          <>
            <div className="w-36 h-8 rounded-md bg-stone-900 animate-pulse" />
            <div className="w-32 h-8 rounded-md bg-stone-900 animate-pulse mt-4 self-end" />
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'member',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-20 bg-stone-800 animate-pulse" />
                      <span className="rounded-full h-3 w-24 bg-stone-800 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'createdAt',
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
                  id: 'status',
                  header: () => (
                    <div className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
                  ),
                  cell: () => <div className="rounded-full h-3 w-16 bg-stone-800 animate-pulse" />,
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
            <h1 className="text-2xl text-white font-medium">Members</h1>
            <div className="mt-4 flex flex-col">
              <Link href="/members/invite" className="self-end">
                <Button icon={<Icon.InviteMember />}>Invite member</Button>
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
