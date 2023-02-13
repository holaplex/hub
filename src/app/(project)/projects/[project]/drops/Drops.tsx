'use client';
import { Avatar, AvatarSize, Button, Form, Modal, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetProjectDrops } from './../../../../../queries/project.graphql';
import { useState } from 'react';
import Card from '../../../../../components/Card';
import { Icon } from '../../../../../components/Icon';
import Table from '../../../../../components/Table';
import Typography, { Size } from '../../../../../components/Typography';
import { DropStatus } from '../../../../../types';
import { Project } from '../../../../../graphql.types';

type Drop = {
  id: string;
  name: string;
  price: string;
  createDate: string;
  startMintDate: string;
  endMintDate: string;
  minted: number;
  supply: number;
  status: DropStatus;
};

enum ShowModal {
  NONE,
  EDIT_DROP,
  PAUSE_MINT,
}

interface DropsPageProps {
  project: string;
}

interface GetDropsData {
  project: Project;
}

interface GetDropsVars {
  project: string;
}

export default function Drops({ project }: DropsPageProps) {
  const [showModal, setShowModal] = useState<ShowModal>(ShowModal.NONE);
  const dropsQuery = useQuery<GetDropsData, GetDropsVars>(GetProjectDrops, {
    variables: { project },
  });

  // TODO: Replace this with actual data.
  const hasDrops = true;
  const columnHelper = createColumnHelper<Drop>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        <div className="text-2xl text-primary font-medium">Manage drops</div>
        {!hasDrops ? (
          <div className="h-full flex-1 flex flex-col items-center justify-center">
            <Icon.Large.CreateNft />
            <span className="mt-6 text-xl font-semibold">No drops yet</span>
            <span className="mt-2 text-gray-500 text-sm">
              Click button below to mint your first drop
            </span>
            <Link href={`/projects/${dropsQuery.data?.project.id}/drops/create/details`}>
              <Button icon={<Icon.Add stroke="#ffffff" />} className="mt-8">
                Create drop
              </Button>
            </Link>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Link href={`/projects/${dropsQuery.data?.project.id}/drops/create/details`} className="self-end">
              <Button icon={<Icon.Add stroke="#ffffff" />} variant="primary">
                Create drop
              </Button>
            </Link>
            <Table
              className="mt-4"
              columns={[
                columnHelper.accessor(({ name, id }) => ({ name, id }), {
                  id: 'name',
                  header: () => <span className="table-header-text">Drop name</span>,
                  cell: (info) => (
                    <div className="flex gap-2 items-center">
                      <Avatar size={AvatarSize.Standard} placeholder={<Icon.EmptyAvatar />} />
                      <Link
                        href={`/projects/${dropsQuery.data?.project.id}/drops/${info.getValue().id}/holders`}
                        className="flex flex-col gap-1"
                      >
                        <span className="text-xs text-primary font-medium">
                          {info.getValue().name}
                        </span>
                        <span className="text-xs text-gray-500">{}</span>
                      </Link>
                    </div>
                  ),
                }),
                columnHelper.accessor('price', {
                  header: () => <span className="table-header-text">Price</span>,
                  cell: (info) => (
                    <div className="flex gap-1">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      <span className="text-xs text-gray-600 font-medium">SOL</span>
                    </div>
                  ),
                }),
                columnHelper.accessor('createDate', {
                  header: () => <span className="table-header-text">Create date</span>,
                  cell: (info) => (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      <span className="text-xs text-gray-500">10:28 AM</span>
                    </div>
                  ),
                }),
                columnHelper.accessor('startMintDate', {
                  header: () => <span className="table-header-text">Start mint date</span>,
                  cell: (info) => (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      <span className="text-xs text-gray-500">10:28 AM</span>
                    </div>
                  ),
                }),
                columnHelper.accessor('endMintDate', {
                  header: () => <span className="table-header-text">End mint date</span>,
                  cell: (info) => (
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-primary font-medium">{info.getValue()}</span>
                      <span className="text-xs text-gray-500">10:28 AM</span>
                    </div>
                  ),
                }),
                columnHelper.display({
                  id: 'minted',
                  header: () => <span className="table-header-text">Minted out & supply</span>,
                  cell: (info) => (
                    <div className="flex gap-1 items-center justify-between">
                      <span className="text-xs text-primary font-medium">
                        {info.row.original.minted} / {info.row.original.supply}
                      </span>
                      <span></span>
                    </div>
                  ),
                }),
                columnHelper.accessor((row) => row.status?.toString(), {
                  id: 'inviteStatus',
                  header: () => (
                    <span className="flex text-xs text-gray-600 font-medium">Invite status</span>
                  ),
                  cell: (info) => <Table.DropStatusPill status={info.row.original.status} />,
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
                          key="edit_drop"
                          className="flex gap-2 items-center"
                          onClick={() => setShowModal(ShowModal.EDIT_DROP)}
                        >
                          <Icon.Edit /> <span>Edit drop</span>
                        </div>,
                        <div
                          key="pause_mint"
                          className="flex gap-2 items-center"
                          onClick={() => setShowModal(ShowModal.PAUSE_MINT)}
                        >
                          <Icon.Pause /> <span>Pause mint</span>
                        </div>,
                      ]}
                    />
                  ),
                }),
              ]}
              data={[
                {
                  id: '1',
                  name: 'Bored Usyk club',
                  price: '40.3012',
                  createDate: '20/11/22',
                  startMintDate: '20/11/22',
                  endMintDate: '12/03/23',
                  minted: 3,
                  supply: 100,
                  status: DropStatus.MINTING,
                },
                {
                  id: '2',
                  name: 'Usyk kozak club',
                  price: '83.3012',
                  createDate: '20/01/23',
                  startMintDate: '15/02/23',
                  endMintDate: '12/03/23',
                  minted: 0,
                  supply: 400,
                  status: DropStatus.SCHEDULED,
                },
                {
                  id: '3',
                  name: 'Usyk winner club',
                  price: '46.9873',
                  createDate: '20/11/22',
                  startMintDate: '20/11/22',
                  endMintDate: '12/01/23',
                  minted: 250,
                  supply: 250,
                  status: DropStatus.MINTED,
                },
                {
                  id: '4',
                  name: 'Bored Usyk club',
                  price: '40.3012',
                  createDate: '20/11/22',
                  startMintDate: '20/11/22',
                  endMintDate: '12/03/23',
                  minted: 3,
                  supply: 100,
                  status: DropStatus.SCHEDULED,
                },
              ]}
            />
          </div>
        )}
      </div>
      {/* TODO: Fix Modal to show as overlay instead of in footer. */}

      <Modal
        open={showModal === ShowModal.PAUSE_MINT}
        setOpen={(open: boolean) => {
          open ? setShowModal(ShowModal.PAUSE_MINT) : setShowModal(ShowModal.NONE);
        }}
      >
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Pause mint
          </Typography.Header>
          <Typography.Header size={Size.H3} className="self-start">
            Are you sure you want to pause [Name] drop and stop sales?
          </Typography.Header>
          <Form className="flex flex-col mt-5">
            <Button htmlType="submit" className="w-full mt-5">
              Pause mint
            </Button>
            <Button
              className="w-full mt-5"
              variant="tertiary"
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
