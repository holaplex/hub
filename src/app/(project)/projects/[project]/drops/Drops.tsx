'use client';
import { Button, Form, Modal, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { GetProjectDrops } from './../../../../../queries/drop.graphql';
import { useState } from 'react';
import Card from '../../../../../components/Card';
import { Icon } from '../../../../../components/Icon';
import Table from '../../../../../components/Table';
import Typography, { Size } from '../../../../../components/Typography';
import { formatDateString, DateFormat } from '../../../../../modules/time';
import { Project, Drop, DropStatus } from '../../../../../graphql.types';

enum ShowModal {
  NONE,
  EDIT_DROP,
  PAUSE_MINT,
}

interface DropsPageProps {
  project: string;
}

interface GetDropsData {
  project: Pick<Project, 'id' | 'drops'>;
}

interface GetDropsVars {
  project: string;
}

export default function Drops({ project }: DropsPageProps) {
  const [showModal, setShowModal] = useState<ShowModal>(ShowModal.NONE);
  const dropsQuery = useQuery<GetDropsData, GetDropsVars>(GetProjectDrops, {
    variables: { project },
  });

  const drops = dropsQuery.data?.project.drops || [];
  const noDrops = drops.length === 0;
  const loadingColumnHelper = createColumnHelper<any>();
  const columnHelper = createColumnHelper<Drop>();

  return (
    <>
      <div className="h-full flex flex-col p-4">
        {dropsQuery.loading ? (
          <>
            <div className="w-36 h-8 rounded-md bg-gray-100 animate-pulse" />
            <div className="w-32 h-8 rounded-md bg-gray-100 animate-pulse mt-4 self-end" />
            <Table
              className="mt-4"
              columns={[
                loadingColumnHelper.display({
                  id: 'name',
                  header: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-4 w-4 bg-gray-100 animate-pulse" />
                      <span className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />
                    </div>
                  ),
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-4 w-4 bg-gray-50 animate-pulse" />
                      <span className="rounded-md h-8 w-8 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-4 w-28 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'price',
                  header: () => <div className="rounded-full h-3 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-3 w-11 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-4 bg-gray-50 animate-pulse" />
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
                  id: 'startTime',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'endTime',
                  header: () => <div className="rounded-full h-4 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex flex-col gap-1">
                      <span className="rounded-full h-3 w-16 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-8 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'supply',
                  header: () => <div className="rounded-full h-3 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-3 w-11 bg-gray-50 animate-pulse" />
                      <span className="rounded-full h-3 w-4 bg-gray-50 animate-pulse" />
                    </div>
                  ),
                }),
                loadingColumnHelper.display({
                  id: 'status',
                  header: () => <div className="rounded-full h-3 w-28 bg-gray-100 animate-pulse" />,
                  cell: () => (
                    <div className="flex gap-2 items-center">
                      <span className="rounded-full h-6 w-20 bg-gray-50 animate-pulse" />
                    </div>
                  ),
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
            <h1 className="text-2xl text-primary font-medium">Manage drops</h1>
            {noDrops ? (
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
                <Link
                  href={`/projects/${dropsQuery.data?.project.id}/drops/create/details`}
                  className="self-end"
                >
                  <Button icon={<Icon.Add stroke="#ffffff" />} variant="primary">
                    Create drop
                  </Button>
                </Link>
                <Table
                  className="mt-4"
                  columns={[
                    columnHelper.accessor(
                      ({ collection, id }) => {
                        if (!collection) {
                          throw new Error('no collection');
                        }

                        const { metadataJson } = collection;

                        return {
                          name: metadataJson?.name,
                          image: metadataJson?.image,
                          symbol: metadataJson?.symbol,
                          id,
                        };
                      },
                      {
                        id: 'name',
                        header: () => <span className="table-header-text">Drop name</span>,
                        cell: (info) => (
                          <div className="flex gap-2 items-center">
                            <img
                              src={info.getValue().image}
                              alt={`drop ${info.getValue().id} metadata json image`}
                              className="w-8 aspect-square rounded-md"
                            />
                            <Link
                              href={`/projects/${dropsQuery.data?.project.id}/drops/${
                                info.getValue().id
                              }/holders`}
                              className="flex flex-col gap-1"
                            >
                              <span className="text-xs text-primary font-medium">
                                {info.getValue().name}
                              </span>
                              <span className="text-xs text-gray-500">
                                {info.getValue().symbol}
                              </span>
                            </Link>
                          </div>
                        ),
                      }
                    ),
                    columnHelper.accessor(
                      ({ price, collection }) => {
                        if (!collection) {
                          throw new Error('no collection');
                        }

                        return {
                          blockchain: collection.blockchain,
                          price,
                        };
                      },
                      {
                        id: 'price',
                        header: () => <span className="table-header-text">Price</span>,
                        cell: (info) => {
                          const price = info.getValue().price;
                          return (
                            <div className="flex gap-1">
                              <span className="text-xs text-primary font-medium">
                                {price === 0 ? 'FREE' : price}
                              </span>
                              {price > 0 && (
                                <span className="text-xs text-gray-600 font-medium">Lamports</span>
                              )}
                            </div>
                          );
                        },
                      }
                    ),
                    columnHelper.accessor('createdAt', {
                      header: () => <span className="table-header-text">Create date</span>,
                      cell: (info) => (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-primary font-medium">
                            {formatDateString(info.getValue(), DateFormat.DATE_1)}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDateString(info.getValue(), DateFormat.TIME_1)}
                          </span>
                        </div>
                      ),
                    }),
                    columnHelper.accessor(
                      ({ startTime, createdAt }) => ({ startTime, createdAt }),
                      {
                        id: 'startTime',
                        header: () => <span className="table-header-text">Mint start date</span>,
                        cell: (info) => {
                          let start = info.getValue().startTime;

                          if (!start) {
                            start = info.getValue().createdAt;
                          }

                          return (
                            <div className="flex flex-col gap-1">
                              <span className="text-xs text-primary font-medium">
                                {formatDateString(start, DateFormat.DATE_1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDateString(start, DateFormat.TIME_1)}
                              </span>
                            </div>
                          );
                        },
                      }
                    ),
                    columnHelper.accessor('endTime', {
                      header: () => <span className="table-header-text">Mint end date</span>,
                      cell: (info) => (
                        <div className="flex flex-col gap-1">
                          {info.getValue() ? (
                            <>
                              <span className="text-xs text-primary font-medium">
                                {formatDateString(info.getValue(), DateFormat.DATE_1)}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatDateString(info.getValue(), DateFormat.TIME_1)}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs text-primary font-medium">None</span>
                          )}
                        </div>
                      ),
                    }),
                    columnHelper.accessor(
                      ({ collection }) => {
                        if (!collection) {
                          throw new Error('no collection');
                        }

                        return {
                          supply: collection?.supply,
                          totalMints: collection?.totalMints,
                        };
                      },
                      {
                        id: 'counts',
                        header: () => (
                          <span className="table-header-text">Minted out & supply</span>
                        ),
                        cell: (info) => {
                          const { supply, totalMints } = info.getValue();

                          if (supply) {
                            const percent = Math.ceil(totalMints / supply);

                            return (
                              <div className="flex gap-1 items-center justify-between">
                                <span className="text-xs text-primary font-medium">
                                  {totalMints} / {supply} Minted
                                </span>
                                <span
                                  className="w-11 h-5 rounded-full flex items-center justify-center"
                                  style={{ background: `conic-gradient(#000 ${percent}%, #E6E6E6 0)` }}
                                >
                                  <span
                                    className={clsx(
                                      'w-[38px] h-4 rounded-full flex items-center justify-center text-xs',
                                      {
                                        'bg-white text-black': percent < 100,
                                        'bg-black text-white': percent === 100,
                                      }
                                    )}
                                  >
                                    {percent}%
                                  </span>
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div className="flex gap-1 items-center justify-between">
                              <span className="text-xs text-primary font-medium">
                                {totalMints} / Unlimited
                              </span>
                            </div>
                          );
                        },
                      }
                    ),
                    columnHelper.accessor('status', {
                      header: () => (
                        <span className="flex text-xs text-gray-600 font-medium">Status</span>
                      ),
                      cell: (info) => (
                        <Table.DropStatusPill status={info.getValue() as DropStatus} />
                      ),
                    }),
                    columnHelper.display({
                      id: 'options',
                      header: () => <Icon.TableAction />,
                      cell: () => (
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
                  data={drops}
                />
              </div>
            )}
          </>
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
