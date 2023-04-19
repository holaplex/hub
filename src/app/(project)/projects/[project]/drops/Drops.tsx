'use client';
import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { GetProjectDrops } from './../../../../../queries/drop.graphql';
import { Icon } from '../../../../../components/Icon';
import Table from '../../../../../components/Table';
import { DateFormat, convertLocalTime } from '../../../../../modules/time';
import { Project, Drop as DropType, DropStatus } from '../../../../../graphql.types';
import { Drop } from '../../../../../components/Drop';

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
  const dropsQuery = useQuery<GetDropsData, GetDropsVars>(GetProjectDrops, {
    variables: { project },
  });

  const drops = dropsQuery.data?.project.drops || [];
  const noDrops = drops.length === 0;
  const loadingColumnHelper = createColumnHelper<any>();
  const columnHelper = createColumnHelper<DropType>();

  return (
    <Drop.Shutdown>
      {({ shutdown }) => (
        <Drop.Resume>
          {({ resume }) => (
            <Drop.Pause>
              {({ pause }) => (
                <>
                  <div className="h-full flex flex-col p-4">
                    {dropsQuery.loading ? (
                      <>
                        <div className="w-36 h-8 rounded-md bg-loadingui animate-pulse" />
                        <div className="w-32 h-8 rounded-md bg-loadingui animate-pulse mt-4 self-end" />
                        <Table
                          className="mt-4"
                          columns={[
                            loadingColumnHelper.display({
                              id: 'name',
                              header: () => (
                                <div className="flex gap-2 items-center">
                                  <span className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />
                                  <span className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                                </div>
                              ),
                              cell: () => (
                                <div className="flex gap-2 items-center">
                                  <span className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />
                                  <span className="rounded-md h-8 w-8 bg-loadingui animate-pulse" />
                                  <span className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                                </div>
                              ),
                            }),
                            loadingColumnHelper.display({
                              id: 'price',
                              header: () => (
                                <div className="rounded-full h-3 w-28 bg-loadingui animate-pulse" />
                              ),
                              cell: () => (
                                <div className="flex gap-2 items-center">
                                  <span className="rounded-full h-3 w-11 bg-loadingui animate-pulse" />
                                  <span className="rounded-full h-3 w-4 bg-loadingui animate-pulse" />
                                </div>
                              ),
                            }),
                            loadingColumnHelper.display({
                              id: 'createdAt',
                              header: () => (
                                <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                              ),
                              cell: () => (
                                <div className="flex flex-col gap-1">
                                  <span className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />
                                  <span className="rounded-full h-3 w-8 bg-loadingui animate-pulse" />
                                </div>
                              ),
                            }),
                            loadingColumnHelper.display({
                              id: 'startTime',
                              header: () => (
                                <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                              ),
                              cell: () => (
                                <div className="flex flex-col gap-1">
                                  <span className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />
                                  <span className="rounded-full h-3 w-8 bg-loadingui animate-pulse" />
                                </div>
                              ),
                            }),
                            loadingColumnHelper.display({
                              id: 'endTime',
                              header: () => (
                                <div className="rounded-full h-4 w-28 bg-loadingui animate-pulse" />
                              ),
                              cell: () => (
                                <div className="flex flex-col gap-1">
                                  <span className="rounded-full h-3 w-16 bg-loadingui animate-pulse" />
                                  <span className="rounded-full h-3 w-8 bg-loadingui animate-pulse" />
                                </div>
                              ),
                            }),
                            loadingColumnHelper.display({
                              id: 'supply',
                              header: () => (
                                <div className="rounded-full h-3 w-28 bg-loadingui animate-pulse" />
                              ),
                              cell: () => (
                                <div className="flex gap-2 items-center">
                                  <span className="rounded-full h-3 w-11 bg-loadingui animate-pulse" />
                                  <span className="rounded-full h-3 w-4 bg-loadingui animate-pulse" />
                                </div>
                              ),
                            }),
                            loadingColumnHelper.display({
                              id: 'status',
                              header: () => (
                                <div className="rounded-full h-3 w-28 bg-loadingui animate-pulse" />
                              ),
                              cell: () => (
                                <div className="flex gap-2 items-center">
                                  <span className="rounded-full h-6 w-20 bg-loadingui animate-pulse" />
                                </div>
                              ),
                            }),
                            loadingColumnHelper.display({
                              id: 'options',
                              header: () => (
                                <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />
                              ),
                              cell: () => (
                                <div className="rounded-full h-4 w-4 bg-loadingui animate-pulse" />
                              ),
                            }),
                          ]}
                          data={new Array(4)}
                        />
                      </>
                    ) : (
                      <>
                        <h1 className="text-2xl font-medium">Manage drops</h1>
                        {noDrops ? (
                          <div className="h-full flex-1 flex flex-col items-center justify-center">
                            <Icon.Large.CreateNft />
                            <span className="mt-6 text-xl font-semibold">No drops yet</span>
                            <span className="mt-2 text-subtletext text-sm">
                              Click button below to mint your first drop
                            </span>
                            <Link
                              href={`/projects/${dropsQuery.data?.project.id}/drops/new/details`}
                            >
                              <Button
                                icon={<Icon.Add className="primary-button-icon" />}
                                className="mt-8"
                              >
                                Create drop
                              </Button>
                            </Link>
                          </div>
                        ) : (
                          <div className="mt-4 flex flex-col">
                            <Link
                              href={`/projects/${dropsQuery.data?.project.id}/drops/new/details`}
                              className="self-end"
                            >
                              <Button
                                icon={<Icon.Add className="primary-button-icon" />}
                                variant="primary"
                              >
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
                                    header: () => <span>Drop name</span>,
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
                                          <span className="text-xs font-medium">
                                            {info.getValue().name}
                                          </span>
                                          <span className="text-xs text-subtletext">
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
                                    header: () => <span>Price</span>,
                                    cell: (info) => {
                                      const price = info.getValue().price;
                                      return (
                                        <div className="flex gap-1">
                                          <span className="text-xs font-medium">
                                            {price === 0 ? 'FREE' : price}
                                          </span>
                                          {price > 0 && (
                                            <span className="text-xs text-subtletext font-medium">
                                              Lamports
                                            </span>
                                          )}
                                        </div>
                                      );
                                    },
                                  }
                                ),
                                columnHelper.accessor('createdAt', {
                                  header: () => <span>Create date</span>,
                                  cell: (info) => (
                                    <div className="flex flex-col gap-1">
                                      <span className="text-xs text-subtletext font-medium">
                                        {format(
                                          convertLocalTime(info.getValue()),
                                          DateFormat.DATE_1
                                        )}
                                      </span>
                                      <span className="text-xs">
                                        {format(
                                          convertLocalTime(info.getValue()),
                                          DateFormat.TIME_1
                                        )}
                                      </span>
                                    </div>
                                  ),
                                }),
                                columnHelper.accessor(
                                  ({ startTime, createdAt }) => ({ startTime, createdAt }),
                                  {
                                    id: 'startTime',
                                    header: () => <span>Mint start date</span>,
                                    cell: (info) => {
                                      let start = info.getValue().startTime;

                                      if (!start) {
                                        start = info.getValue().createdAt;
                                      }

                                      return (
                                        <div className="flex flex-col gap-1">
                                          <span className="text-xs text-subtletext font-medium">
                                            {format(convertLocalTime(start), DateFormat.DATE_1)}
                                          </span>
                                          <span className="text-xs">
                                            {format(convertLocalTime(start), DateFormat.TIME_1)}
                                          </span>
                                        </div>
                                      );
                                    },
                                  }
                                ),
                                columnHelper.accessor('endTime', {
                                  header: () => <span>Mint end date</span>,
                                  cell: (info) => (
                                    <div className="flex flex-col gap-1">
                                      {info.getValue() ? (
                                        <>
                                          <span className="text-xs text-subtletext font-medium">
                                            {format(
                                              convertLocalTime(info.getValue()),
                                              DateFormat.DATE_1
                                            )}
                                          </span>
                                          <span className="text-xs">
                                            {format(
                                              convertLocalTime(info.getValue()),
                                              DateFormat.TIME_1
                                            )}
                                          </span>
                                        </>
                                      ) : (
                                        <span className="text-xs text-primary font-medium">
                                          None
                                        </span>
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
                                    header: () => <span>Minted out & supply</span>,
                                    cell: (info) => {
                                      const { supply, totalMints } = info.getValue();

                                      if (supply) {
                                        const percent = Math.ceil((totalMints / supply) * 100);

                                        return (
                                          <div className="flex gap-1 items-center justify-between">
                                            <span className="text-xs text-primary font-medium">
                                              {totalMints} / {supply} Minted
                                            </span>
                                            <span
                                              className="w-11 h-5 rounded-full flex items-center justify-center"
                                              style={{
                                                background: `conic-gradient(#000 ${percent}%, #E6E6E6 0)`,
                                              }}
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
                                  header: () => <span>Status</span>,
                                  cell: (info) => (
                                    <Table.DropStatusPill status={info.getValue() as DropStatus} />
                                  ),
                                }),
                                columnHelper.display({
                                  id: 'options',
                                  header: () => <div />,
                                  cell: (info) => {
                                    const drop = info.row.original;

                                    if (drop.status === DropStatus.Shutdown) {
                                      return <div />;
                                    }

                                    let actions: JSX.Element[] = [
                                      <Link
                                        key="edit_drop"
                                        className="flex gap-2 items-center"
                                        href={`/projects/${project}/drops/${info.row.original.id}/edit`}
                                      >
                                        <Icon.Edit /> <span>Edit drop</span>
                                      </Link>,
                                    ];

                                    if (drop.status === DropStatus.Paused) {
                                      actions.push(
                                        <div
                                          key="resume_mint"
                                          onClick={() => resume(drop.id, drop.projectId)}
                                          className="flex gap-2 items-center"
                                        >
                                          <Icon.Pause /> <span>Resume mint</span>
                                        </div>
                                      );
                                    } else {
                                      actions.push(
                                        <div
                                          key="pause_mint"
                                          onClick={() => pause(drop.id, drop.projectId)}
                                          className="flex gap-2 items-center"
                                        >
                                          <Icon.Pause /> <span>Pause mint</span>
                                        </div>
                                      );
                                    }

                                    if (drop.status === DropStatus.Minting) {
                                      actions.push(
                                        <div
                                          key="shutdown_mint"
                                          onClick={() => shutdown(drop.id, drop.projectId)}
                                          className="flex gap-2 items-center"
                                        >
                                          <Icon.Close /> <span>Shut-down mint</span>
                                        </div>
                                      );
                                    }

                                    return (
                                      <PopoverBox
                                        triggerButton={
                                          <div
                                            className={clsx(
                                              'px-2 py-1 hover:rounded-md hover:highlightcell max-w-min'
                                            )}
                                          >
                                            <Icon.More />
                                          </div>
                                        }
                                        elements={actions}
                                      />
                                    );
                                  },
                                }),
                              ]}
                              data={drops}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </Drop.Pause>
          )}
        </Drop.Resume>
      )}
    </Drop.Shutdown>
  );
}
