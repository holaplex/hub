'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { Organization, User, Maybe, InviteStatus, Member } from '../../../graphql.types';
import { useOrganization } from '../../../hooks/useOrganization';
import { GetOrganizationMembers } from './../../../queries/organization.graphql';
import { DateFormat, formatDateString } from '../../../modules/time';

type Associate = {
  id: string;
  email: string;
  user: Maybe<User> | undefined;
  member: Maybe<Member> | undefined;
  createdAt: string;
  status: InviteStatus;
};

interface GetOrganizationMembersData {
  organization: Organization;
}

interface GetOrganizationMembersVars {
  organization: string;
}

export default function MembersLayout({ children }: { children: JSX.Element }) {
  const { organization } = useOrganization();
  const membersQuery = useQuery<GetOrganizationMembersData, GetOrganizationMembersVars>(
    GetOrganizationMembers,
    { variables: { organization: organization?.id } }
  );

  const columnHelper = createColumnHelper<Associate>();
  const loadingColumnHelper = createColumnHelper<any>();

  const associates = useMemo(() => {
    const { data } = membersQuery;

    if (!data) {
      return [];
    }
    const {
      organization: { owner, invites },
    } = data;

    return [owner, ...(invites || [])] as unknown as Associate[];
  }, [membersQuery]);

  const loading = membersQuery.loading;

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
                  id: 'nameAndEmail',
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
              <Table
                className="mt-4"
                columns={[
                  //`${user?.firstName} ${user?.lastName}`
                  columnHelper.accessor(
                    ({ user, member, email }) => {
                      const associate = user ?? member?.user;
                      return associate
                        ? associate.firstName
                          ? `${associate?.firstName} ${associate?.lastName}`
                          : associate?.email
                        : email;
                    },
                    {
                      id: 'nameAndEmail',
                      header: () => (
                        <div className="flex gap-2">
                          <span className="text-xs text-gray-600 font-medium">Members</span>
                        </div>
                      ),
                      cell: (info) => {
                        const { user, member } = info.row.original;
                        const associate = user ?? member?.user;
                        const hasName = !!associate?.firstName;

                        return (
                          <div className="flex flex-col">
                            <span className="text-xs text-primary font-medium">
                              {info.getValue()}
                            </span>
                            {hasName && (
                              <span className="text-xs text-gray-500">{associate.email}</span>
                            )}
                          </div>
                        );
                      },
                    }
                  ),
                  columnHelper.accessor('createdAt', {
                    header: () => (
                      <span className="flex text-xs text-gray-600 font-medium self-start">
                        Invited
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
                  columnHelper.display({
                    id: 'status',
                    header: () => (
                      <span className="flex text-xs text-gray-600 font-medium">Status</span>
                    ),
                    cell: (info) => {
                      const associate = info.row.original;
                      const isOwner = associate.__typename === 'Owner';
                      const status = associate.status;
                      return <Table.InviteStatusPill isOwner={isOwner} status={status} />;
                    },
                  }),
                  columnHelper.display({
                    id: 'moreOptions',
                    header: () => <Icon.TableAction />,
                    cell: (info) => (
                      <PopoverBox
                        triggerButton={
                          <div
                            className={clsx(
                              'px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min'
                            )}
                          >
                            <Icon.More />
                          </div>
                        }
                        elements={[
                          <Link
                            key="delete_member"
                            className="flex gap-2 items-center"
                            href={`/members/${info.getValue()}/delete`}
                          >
                            <Icon.Delete fill="#E52E2E" />
                            <span className="text-negative">Delete member</span>
                          </Link>,
                        ]}
                      />
                    ),
                  }),
                ]}
                data={associates}
              />
            </div>
          </>
        )}
      </div>
      {children}
    </>
  );
}
