'use client';
import { Avatar, Button, Form, Modal, AvatarSize, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
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

enum ShowModal {
  NONE,
  INVITE_MEMBER,
  CHANGE_EMAIL,
  DELETE_MEMBER,
}

export default function MembersPage() {
  const [showModal, setShowModal] = useState<ShowModal>(ShowModal.NONE);
  const columnHelper = createColumnHelper<Member>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Members</div>

        <div className="mt-4 flex flex-col">
          <Button
            icon={<Icon.InviteMember stroke="#ffffff" />}
            className="self-end"
            onClick={() => setShowModal(ShowModal.INVITE_MEMBER)}
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
                cell: (info) => {
                  return (
                    <div className="flex gap-2 items-center">
                      <Icon.EmptyAvatar />
                      <div className="flex flex-col">
                        <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                        <span className="text-xs text-gray-500">{info.row.original.email}</span>
                      </div>
                    </div>
                  );
                },
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
                cell: (info) => <Table.InviteStatusPill status={info.getValue() as InviteStatus} />,
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
                      <div
                        key="change_email"
                        className="flex gap-2 items-center"
                        onClick={() => setShowModal(ShowModal.CHANGE_EMAIL)}
                      >
                        <Icon.Email /> <span>Change email</span>
                      </div>,
                      <div
                        key="delete_member"
                        className="flex gap-2 items-center"
                        onClick={() => setShowModal(ShowModal.DELETE_MEMBER)}
                      >
                        <Icon.Delete fill="#E52E2E" />
                        <span className="text-negative">Delete member</span>
                      </div>,
                    ]}
                  />
                ),
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
                email: 'xyz@gmail.com',
                invitedDate: '05/27/2023',
                inviteStatus: InviteStatus.Sent,
              },

              {
                firstName: 'Su',
                lastName: 'Yon',
                email: 'hello@gmail.com',
                invitedDate: '05/27/2023',
                inviteStatus: InviteStatus.Revoked,
              },
            ]}
          />
        </div>
      </div>
      {/* TODO: Fix Modal to show as overlay instead of in footer. */}
      <Modal
        open={showModal === ShowModal.INVITE_MEMBER}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.INVITE_MEMBER) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Invite new member to</Typography.Header>
          <Typography.Header size={Size.H3}>
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

            <Button htmlType="submit" className="w-full mt-5">
              Send invite
            </Button>
            <Button
              variant="tertiary"
              className="w-full mt-5 "
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal
        open={showModal === ShowModal.CHANGE_EMAIL}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.CHANGE_EMAIL) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Change email address</Typography.Header>
          <Typography.Header size={Size.H3}>
            You are about to change [Name] email address. This member should accept invite within 6
            hours.
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Form.Label name="Member new email address" className="text-xs text-primary">
              <Form.Input placeholder="name@example.com" />
              <span className="text-xs text-gray-500 font-medium self-start">
                Invite link will be active 6 hours after sending.
              </span>
            </Form.Label>

            <Form.Error message="" />

            <Button htmlType="submit" className="w-full mt-5">
              Send invite
            </Button>
            <Button
              variant="tertiary"
              className="w-full mt-5 "
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal
        open={showModal === ShowModal.DELETE_MEMBER}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.DELETE_MEMBER) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Do you really want to delete [name]?</Typography.Header>
          <Typography.Header size={Size.H3}>This action cannot be reversed.</Typography.Header>

          <Form className="flex flex-col mt-5">
            <div className="flex items-start gap-2 rounded-md bg-gray-50 p-3">
              <Icon.Info />
              <span className="text-xs text-gray-500 font-medium">
                The member will be deprived of access to the project
              </span>
            </div>
            <Button htmlType="submit" className="w-full mt-5" variant="failure">
              Delete member
            </Button>
            <Button
              variant="tertiary"
              className="w-full mt-5 "
              onClick={() => setShowModal(ShowModal.NONE)}
            >
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
    </>
  );
}
