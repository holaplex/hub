'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { Icon } from '../../../components/Icon';
import Table from '../../../components/Table';
import Link from 'next/link';
import { Organization, User, Maybe } from '../../../graphql.types';
import { useOrganization } from '../../../hooks/useOrganization';
import { GetOrganizationMembers } from './../../../queries/organization.graphql';

type Associate = {
  id: string;
  user: Maybe<User> | undefined;
  createdAt: string;
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

  const associates = useMemo(() => {
    const { data } = membersQuery;

    if (!data) {
      return [];
    }
    const {
      organization: { members, owner },
    } = data;

    return [owner, ...(members || [])] as Associate[];
  }, [membersQuery]);

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Members</div>
        <div className="mt-4 flex flex-col">
          <Link href="/members/invite" className="self-end">
            <Button icon={<Icon.InviteMember stroke="#ffffff" />}>Invite member</Button>
          </Link>
          <Table
            className="mt-4"
            columns={[
              columnHelper.accessor(({ user }) => `${user?.firstName} ${user?.lastName}`, {
                id: 'fullName',
                header: () => (
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-600 font-medium">Member name</span>
                  </div>
                ),
                cell: (info) => {
                  return (
                    <div className="flex gap-2 items-center">
                      <Icon.EmptyAvatar />
                      <div className="flex flex-col">
                        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      </div>
                    </div>
                  );
                },
              }),
              columnHelper.accessor('user.email', {
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium self-start">Email</span>
                ),
                cell: (info) => (
                  <div className="flex flex-col">
                    <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                  </div>
                ),
              }),
              columnHelper.accessor('createdAt', {
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium self-start">
                    Joined on
                  </span>
                ),
                cell: (info) => (
                  <div className="flex flex-col">
                    <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                  </div>
                ),
              }),
              columnHelper.accessor((row) => row.id, {
                id: 'moreOptions',
                header: () => <Icon.TableAction />,
                cell: (info) => (
                  <PopoverBox
                    triggerButton={
                      <div
                        className={clsx('px-2 py-1 hover:rounded-md hover:bg-gray-50 max-w-min')}
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
      </div>
      {children}
    </>
  );
}
