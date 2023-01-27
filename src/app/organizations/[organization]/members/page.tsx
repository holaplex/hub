'use client';
import { Avatar, Button, Form, Modal, AvatarSize } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';
import Card from '../../../../components/Card';
import { Icon } from '../../../../components/Icon';
import Table from '../../../../components/Table';
import Typography, { Size } from '../../../../components/Typography';
import { InviteStatus } from '../../../../graphql.types';

type Member = {
  firstName?: string;
  lastName?: string;
  email: string;
  invitedDate: string;
  inviteStatus?: InviteStatus;
};

export default function MembersPage() {
  const [showInviteMember, setShowInviteMember] = useState<boolean>(false);
  const columnHelper = createColumnHelper<Member>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Members</div>

        <div className="mt-4 flex flex-col">
          <Button
            icon={<Icon.InviteMember color="#ffffff" className="mr-2" />}
            border="rounded"
            className="bg-primary p-3 text-white min-w-min self-end"
            onClick={() => setShowInviteMember(true)}
          >
            Invite member
          </Button>
          <Table
            className="mt-4"
            columns={[
              columnHelper.accessor((row) => `${row.firstName} ${row.lastName}`, {
                id: 'fullName',
                header: () => (
                  <div className="flex gap-2">
                    <span className="text-xs text-gray-600 font-medium">Member name</span>
                  </div>
                ),
                cell: (info) => (
                  <div className="flex gap-2 items-center">
                    <Icon.EmptyAvatar />
                    <div className="flex flex-col">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      <span className="text-xs text-gray-500">abc@gmail.com</span>
                    </div>
                  </div>
                ),
              }),
              columnHelper.accessor('invitedDate', {
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium self-start">
                    Invited date
                  </span>
                ),
                cell: (info) => (
                  <div className="flex flex-col">
                    <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                  </div>
                ),
              }),
              columnHelper.accessor((row) => row.inviteStatus?.toString(), {
                id: 'inviteStatus',
                header: () => (
                  <span className="flex text-xs text-gray-600 font-medium">Invite status</span>
                ),
                cell: (info) => (
                  <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                ),
              }),
              columnHelper.display({
                id: 'moreOptions',
                header: () => <Icon.TableAction />,
                cell: () => <Icon.More />,
              }),
            ]}
            data={[
              {
                firstName: 'Lee',
                lastName: 'Leng',
                email: 'abc@gmail.com',
                invitedDate: '05/27/2023',
                inviteStatus: InviteStatus.Accepted,
              },
              {
                firstName: 'Ed',
                lastName: 'Cred',
                email: 'abc@gmail.com',
                invitedDate: '05/27/2023',
                inviteStatus: InviteStatus.Sent,
              },

              {
                firstName: 'Su',
                lastName: 'Yon',
                email: 'abc@gmail.com',
                invitedDate: '05/27/2023',
                inviteStatus: InviteStatus.Accepted,
              },
            ]}
          />
        </div>
      </div>
      {/* TODO: Fix Modal to show as overlay instead of in footer. */}
      <Modal
        open={showInviteMember}
        setOpen={(open: boolean) => {
          setShowInviteMember(open);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Invite new member to
          </Typography.Header>
          <Typography.Header size={Size.H3} className="self-start">
            Enter member email address to invite.
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label name="Member email address" className="text-xs text-primary">
              <Form.Input placeholder="name@example.com" />
              <span className="text-xs text-gray-500 font-medium self-start">
                Invite link will be active 6 hours after sending.
              </span>
            </Form.Label>

            <Form.Error message="" />

            <Button
              border="rounded"
              htmlType="submit"
              className="w-full bg-primary text-white p-3 mt-5 text-xs font-semibold "
            >
              Send invite
            </Button>
            <Button
              border="rounded"
              className="w-full bg-white text-black p-3 mt-5 text-xs font-semibold"
              onClick={() => setShowInviteMember(false)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
    </>
  );
}
