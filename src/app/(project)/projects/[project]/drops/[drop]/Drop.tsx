'use client';

import { Button } from '@holaplex/ui-library-react';
import { Icon } from './../../../../../../components/Icon';
import Tabs from './../../../../../../layouts/Tabs';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GetDrop } from './../../../../../../queries/drop.graphql';
import {
  formatDateString,
  DateFormat,
  daysUntil,
  inTheFuture,
} from './../../../../../../modules/time';
import { useQuery } from '@apollo/client';
import { AssetType, Blockchain, DropStatus, Project } from '../../../../../../graphql.types';
import clsx from 'clsx';
import { cloneElement } from 'react';
import Table from '../../../../../../components/Table';
import { Drop as DropModal } from '../../../../../../components/Drop';

type Drop = {
  name: string;
};

interface DropProps {
  project: string;
  drop: string;
  children: React.ReactNode;
}

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetDropsData {
  project: Pick<Project, 'drop' | 'treasury'>;
}

export default function Drop({ children, project, drop }: DropProps): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const dropQuery = useQuery<GetDropsData, GetDropVars>(GetDrop, { variables: { project, drop } });
  const percent = Math.ceil(
    ((dropQuery.data?.project?.drop?.collection?.totalMints as number) /
      (dropQuery.data?.project?.drop?.collection?.supply as number)) *
      100
  );

  const loading = dropQuery.loading;
  const wallet = dropQuery.data?.project.treasury?.wallets?.find((wallet) => {
    switch (dropQuery.data?.project?.drop?.collection.blockchain) {
      case Blockchain.Solana:
        return wallet.assetId === AssetType.SolTest || wallet.assetId === AssetType.Sol;
      case Blockchain.Polygon:
        return wallet.assetId === AssetType.MaticTest || wallet.assetId === AssetType.Matic;
      case Blockchain.Ethereum:
        return wallet.assetId === AssetType.EthTest || wallet.assetId === AssetType.Eth;
    }
  });
  const startTime =
    dropQuery.data?.project?.drop?.startTime || dropQuery.data?.project?.drop?.createdAt;
  const endTime = dropQuery.data?.project?.drop?.endTime;

  return (
    <DropModal.Shutdown>
      {({ shutdown }) => (
        <DropModal.Resume>
          {({ resume }) => (
            <DropModal.Pause>
              {({ pause }) => (
                <div className="flex flex-col px-4 py-2">
                  {loading ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="h-8 w-80 bg-stone-900 animate-pulse rounded-md" />
                          <div className="h-6 w-16 bg-stone-900 animate-pulse rounded-full" />
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="h-10 w-24 bg-stone-900 animate-pulse rounded-md" />
                          <div className="h-10 w-28 bg-stone-900 animate-pulse rounded-md" />
                          <div className="h-10 w-32 bg-stone-900 animate-pulse rounded-md" />
                        </div>
                      </div>
                      <div className="mt-5 flex gap-6">
                        <div className="basis-1/3">
                          <div className="w-full aspect-square bg-stone-900 animate-pulse rounded-lg" />
                        </div>
                        <div className="basis-2/3 flex flex-col gap-2">
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <div className="h-4 w-20 bg-stone-800 animate-pulse rounded-full" />

                              <div className="h-4 w-14 bg-stone-800 animate-pulse rounded-full" />
                            </div>
                            <div className="w-full rounded-full h-[12px] bg-stone-800 animate-pulse mt-1 relative overflow-hidden" />
                          </div>
                          <div className="flex p-6 bg-stone-900 rounded-md">
                            <div className="basis-1/2 h-full flex flex-col border-r border-r-stone-800 pr-4">
                              <div className="h-4 w-8 bg-stone-800 animate-pulse rounded-full mb-2" />
                              <span className="h-8 w-2/3 bg-stone-800 animate-pulse rounded-md mb-1" />
                              <span className="h-6 w-1/3 bg-stone-800 animate-pulse rounded-md mb-7" />
                              <div className="h-4 w-10 bg-stone-800 animate-pulse rounded-full mb-1" />
                              <span className="h-12 w-3/4 bg-stone-800 animate-pulse rounded-md" />
                              <div className="flex gap-2 mt-4">
                                <span className="h-14 w-full bg-stone-800 animate-pulse rounded-md" />
                                <span className="h-14 w-full bg-stone-800 animate-pulse rounded-md" />
                              </div>
                            </div>
                            <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                              <div className="flex flex-col gap-2">
                                <div className="h-4 w-8 bg-stone-800 animate-pulse rounded-full mb-2" />
                                <span className="h-8 w-1/3 bg-stone-800 animate-pulse rounded-md mb-7" />
                              </div>
                              <div>
                                <div className="flex flex-col gap-3">
                                  <div className="h-12 w-full flex flex-col rounded-md bg-stone-800 animate-pulse" />
                                </div>

                                <div className="flex gap-2 mt-3">
                                  <div className="h-12 w-full flex flex-col rounded-md bg-stone-800 animate-pulse" />
                                  <div className="h-12 w-full flex flex-col rounded-md bg-stone-800 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 text-2xl font-medium items-center">
                          <Link href={`/projects/${project}/drops`} className="text-gray-400">
                            Manage drops /
                          </Link>{' '}
                          <span>
                            {dropQuery.data?.project?.drop?.collection?.metadataJson?.name}
                          </span>
                          <Table.DropStatusPill
                            status={dropQuery.data?.project?.drop?.status as DropStatus}
                          />
                        </div>
                        {dropQuery.data?.project.drop?.status !== DropStatus.Shutdown && (
                          <div className="flex items-center gap-2">
                            <Link href={`/projects/${project}/drops/${drop}/edit/details`}>
                              <Button
                                icon={<Icon.Edit stroke="stroke-yellow-300" />}
                                variant="secondary"
                              >
                                Edit drop
                              </Button>
                            </Link>
                            {dropQuery.data?.project.drop?.status === DropStatus.Paused ? (
                              <Button
                                icon={<Icon.Resume stroke="stroke-yellow-300" />}
                                variant="secondary"
                                onClick={() => resume(drop, project)}
                              >
                                Resume mint
                              </Button>
                            ) : (
                              <Button
                                icon={<Icon.Pause stroke="stroke-yellow-300" />}
                                variant="secondary"
                                onClick={() => pause(drop, project)}
                              >
                                Pause mint
                              </Button>
                            )}
                            <Button
                              icon={<Icon.Close stroke="stroke-yellow-300" />}
                              variant="secondary"
                              onClick={() => shutdown(drop, project)}
                            >
                              Shut-down minting
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="mt-5 flex gap-6">
                        <div className="basis-1/3">
                          <img
                            src={dropQuery.data?.project?.drop?.collection?.metadataJson?.image}
                            className="w-full aspect-square rounded-lg object-cover"
                          />
                        </div>
                        <div className="basis-2/3 flex flex-col gap-2">
                          <div className="w-full text-xs font-medium">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2 items-center">
                                <span className="text-white">
                                  {dropQuery.data?.project?.drop?.status} - {percent}%
                                </span>
                                <span className="text-gray-400">
                                  {dropQuery.data?.project?.drop?.collection?.totalMints}/
                                  {dropQuery.data?.project?.drop?.collection?.supply}
                                </span>
                              </div>
                              {inTheFuture(startTime) && (
                                <span className="text-gray-400">
                                  {daysUntil(startTime)} to start
                                </span>
                              )}
                            </div>
                            <div className="w-full rounded-full h-[12px] bg-stone-800 mt-1 relative overflow-hidden">
                              <div
                                className={clsx('top-0 bottom-0 left-0 absolute rounded-r-full', {
                                  'bg-blue-400':
                                    dropQuery.data?.project?.drop?.status === DropStatus.Minting,
                                  'bg-red-500':
                                    dropQuery.data?.project?.drop?.status === DropStatus.Shutdown ||
                                    dropQuery.data?.project?.drop?.status === DropStatus.Expired,
                                  'bg-stone-900':
                                    dropQuery.data?.project?.drop?.status === DropStatus.Paused,
                                })}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex p-6 bg-stone-900 rounded-md">
                            <div className="basis-1/2 h-full flex flex-col border-r border-r-stone-800 pr-4">
                              <span className="text-gray-400 text-xs font-medium mb-2">Name</span>
                              <span className="text-white text-3xl font-medium">
                                {dropQuery.data?.project?.drop?.collection?.metadataJson?.name}
                              </span>
                              <span className="text-gray-400 mb-6">
                                {dropQuery.data?.project?.drop?.collection?.metadataJson?.symbol}
                              </span>
                              <span className="text-gray-400 text-xs font-medium mb-1">
                                Description
                              </span>
                              <span className="text-sm h-[90px] text-white overflow-hidden">
                                {
                                  dropQuery.data?.project?.drop?.collection?.metadataJson
                                    ?.description
                                }
                              </span>
                              <div className="flex gap-2 mt-4">
                                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-stone-800">
                                  <span className="text-gray-400 text-xs font-medium">
                                    Treasury wallet
                                  </span>
                                  <span className="text-white text-sm font-medium">
                                    {wallet?.shortAddress}
                                  </span>
                                </div>
                                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-stone-800">
                                  <span className="text-gray-400 text-xs font-medium">
                                    Blockchain
                                  </span>
                                  <span className="text-white text-sm font-medium">
                                    {dropQuery.data?.project?.drop?.collection?.blockchain}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                              <div className="flex flex-col gap-2">
                                <span className="text-gray-400 text-xs font-medium mb-2">
                                  Price
                                </span>
                                <span className="text-white text-3xl font-medium">Free</span>
                              </div>
                              <div>
                                {dropQuery.data?.project?.drop?.collection?.creators?.map(
                                  (creator, index) => (
                                    <div
                                      className="w-full flex flex-col rounded-md py-2 px-3 bg-stone-800 mt-3"
                                      key={creator.address}
                                    >
                                      <span className="text-gray-400 text-xs font-medium">
                                        Royalty wallet address #{index + 1}
                                      </span>
                                      <span className="text-white text-sm font-medium">
                                        {creator.shortAddress}{' '}
                                        <span className="text-gray-400">- {creator.share}%</span>{' '}
                                      </span>
                                    </div>
                                  )
                                )}
                                <div className="flex gap-2 mt-3">
                                  <div className="w-full flex flex-col rounded-md py-2 px-3 bg-stone-800">
                                    <span className="text-gray-400 text-xs font-medium">
                                      Start date
                                    </span>
                                    <span className="text-white text-sm font-medium">
                                      {formatDateString(startTime, DateFormat.DATE_1)},{' '}
                                      {formatDateString(startTime, DateFormat.TIME_1)}
                                    </span>
                                  </div>
                                  <div className="w-full flex flex-col rounded-md py-2 px-3 bg-stone-800">
                                    <span className="text-gray-400 text-xs font-medium">
                                      End date
                                    </span>
                                    <span className="text-white text-sm font-medium">
                                      {endTime
                                        ? `${formatDateString(
                                            endTime,
                                            DateFormat.DATE_1
                                          )}, ${formatDateString(endTime, DateFormat.TIME_1)}`
                                        : 'None'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <Tabs.Page className="mt-8">
                    <Tabs.Panel loading={loading}>
                      <Tabs.Tab
                        name="Mint history"
                        href={`/projects/${project}/drops/${drop}/mints`}
                        active={pathname === `/projects/${project}/drops/${drop}/mints`}
                      />
                      <Tabs.Tab
                        name="Current holders"
                        href={`/projects/${project}/drops/${drop}/holders`}
                        active={pathname === `/projects/${project}/drops/${drop}/holders`}
                      />
                    </Tabs.Panel>
                    <Tabs.Content>
                      {cloneElement(children as JSX.Element, { loading })}
                    </Tabs.Content>
                  </Tabs.Page>
                </div>
              )}
            </DropModal.Pause>
          )}
        </DropModal.Resume>
      )}
    </DropModal.Shutdown>
  );
}
