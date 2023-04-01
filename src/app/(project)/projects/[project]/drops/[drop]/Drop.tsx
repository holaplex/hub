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

  const status = dropQuery.data?.project.drop?.status;

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
                          <div className="h-8 w-80 bg-gray-100 animate-pulse rounded-md" />
                          <div className="h-6 w-16 bg-gray-100 animate-pulse rounded-full" />
                        </div>

                        {/* <div className="flex items-center gap-2">
              <div className="h-10 w-24 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-10 w-28 bg-gray-100 animate-pulse rounded-md" />
              <div className="h-10 w-32 bg-gray-100 animate-pulse rounded-md" />
            </div> */}
                      </div>
                      <div className="mt-5 flex gap-4">
                        <div className="basis-1/3">
                          <div className="w-full aspect-square bg-gray-100 animate-pulse rounded-lg" />
                        </div>
                        <div className="basis-2/3 flex flex-col gap-2">
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              <div className="h-4 w-20 bg-gray-100 animate-pulse rounded-full" />

                              <div className="h-4 w-14 bg-gray-100 animate-pulse rounded-full" />
                            </div>
                            <div className="w-full rounded-full h-[12px] bg-gray-100 animate-pulse mt-1 relative overflow-hidden" />
                          </div>
                          <div className="flex p-4 bg-white rounded-md">
                            <div className="basis-1/2 h-full flex flex-col border-r border-r-gray-100 pr-4">
                              <div className="h-4 w-8 bg-gray-100 animate-pulse rounded-full mb-2" />
                              <span className="h-8 w-2/3 bg-gray-100 animate-pulse rounded-md mb-1" />
                              <span className="h-6 w-1/3 bg-gray-100 animate-pulse rounded-md mb-7" />
                              <div className="h-4 w-10 bg-gray-100 animate-pulse rounded-full mb-1" />
                              <span className="h-12 w-3/4 bg-gray-100 animate-pulse rounded-md" />
                              <div className="flex gap-2 mt-4">
                                <span className="h-14 w-full bg-gray-100 animate-pulse rounded-md" />
                                <span className="h-14 w-full bg-gray-100 animate-pulse rounded-md" />
                              </div>
                            </div>
                            <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                              <div className="flex flex-col gap-2">
                                <div className="h-4 w-8 bg-gray-100 animate-pulse rounded-full mb-2" />
                                <span className="h-8 w-1/3 bg-gray-100 animate-pulse rounded-md mb-7" />
                              </div>
                              <div>
                                <div className="flex flex-col gap-3">
                                  <div className="h-12 w-full flex flex-col rounded-md bg-gray-100 animate-pulse" />
                                </div>

                                <div className="flex gap-2 mt-3">
                                  <div className="h-12 w-full flex flex-col rounded-md bg-gray-100 animate-pulse" />
                                  <div className="h-12 w-full flex flex-col rounded-md bg-gray-100 animate-pulse" />
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
                          <Link href={`/projects/${project}/drops`} className="text-gray-500">
                            Manage drops
                          </Link>{' '}
                          /
                          <span className="text-primary">
                            {dropQuery.data?.project?.drop?.collection?.metadataJson?.name}
                          </span>
                          <Table.DropStatusPill
                            status={dropQuery.data?.project?.drop?.status as DropStatus}
                          />
                        </div>
                        {dropQuery.data?.project.drop?.status !== DropStatus.Shutdown && (
                          <div className="flex items-center gap-2">
                            <Button icon={<Icon.Edit />} variant="secondary">
                              Edit drop
                            </Button>
                            {dropQuery.data?.project.drop?.status === DropStatus.Paused ? (
                              <Button
                                icon={<Icon.Resume />}
                                variant="secondary"
                                onClick={() => resume(drop, project)}
                              >
                                Resume mint
                              </Button>
                            ) : (
                              <Button
                                icon={<Icon.Pause />}
                                variant="secondary"
                                onClick={() => pause(drop, project)}
                              >
                                Pause mint
                              </Button>
                            )}
                            <Button
                              icon={<Icon.Close />}
                              variant="secondary"
                              onClick={() => shutdown(drop, project)}
                            >
                              Shut-down minting
                            </Button>
                          </div>
                        )}
                      </div>
                      <div className="mt-5 flex gap-4">
                        <div className="basis-1/3">
                          <img
                            src={dropQuery.data?.project?.drop?.collection?.metadataJson?.image}
                            className="w-full aspect-square rounded-lg"
                          />
                        </div>
                        <div className="basis-2/3 flex flex-col gap-2">
                          <div className="w-full text-xs font-medium">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2 items-center">
                                <span className="text-primary">
                                  {dropQuery.data?.project?.drop?.status} - {percent}%
                                </span>
                                <span className="text-gray-500">
                                  {dropQuery.data?.project?.drop?.collection?.totalMints}/
                                  {dropQuery.data?.project?.drop?.collection?.supply}
                                </span>
                              </div>
                              {inTheFuture(startTime) && (
                                <span className="text-gray-500">
                                  {daysUntil(startTime)} to start
                                </span>
                              )}
                            </div>
                            <div className="w-full rounded-full h-[12px] bg-gray-100 mt-1 relative overflow-hidden">
                              <div
                                className={clsx('top-0 bottom-0 left-0 absolute rounded-r-full', {
                                  'bg-blue-600':
                                    dropQuery.data?.project?.drop?.status === DropStatus.Minting,
                                  'bg-red-900':
                                    dropQuery.data?.project?.drop?.status === DropStatus.Shutdown,
                                  'bg-gray-500':
                                    dropQuery.data?.project?.drop?.status === DropStatus.Paused,
                                })}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex p-4 bg-white rounded-md">
                            <div className="basis-1/2 h-full flex flex-col border-r border-r-gray-100 pr-4">
                              <span className="text-gray-500 text-xs font-medium mb-2">Name</span>
                              <span className="text-primary text-3xl font-medium">
                                {dropQuery.data?.project?.drop?.collection?.metadataJson?.name}
                              </span>
                              <span className="text-gray-500 mb-6">
                                {dropQuery.data?.project?.drop?.collection?.metadataJson?.symbol}
                              </span>
                              <span className="text-gray-400 text-xs font-medium mb-1">
                                Description
                              </span>
                              <span className="text-sm h-[90px] text-primary overflow-hidden">
                                {
                                  dropQuery.data?.project?.drop?.collection?.metadataJson
                                    ?.description
                                }
                              </span>
                              <div className="flex gap-2 mt-4">
                                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                                  <span className="text-gray-500 text-xs font-medium">
                                    Treasury wallet
                                  </span>
                                  <span className="text-primary text-sm font-medium">
                                    {wallet?.shortAddress}
                                  </span>
                                </div>
                                <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                                  <span className="text-gray-500 text-xs font-medium">
                                    Blockchain
                                  </span>
                                  <span className="text-primary text-sm font-medium">
                                    {dropQuery.data?.project?.drop?.collection?.blockchain}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                              <div className="flex flex-col gap-2">
                                <span className="text-gray-500 text-xs font-medium mb-2">
                                  Price
                                </span>
                                <span className="text-primary text-3xl font-medium">Free</span>
                              </div>
                              <div>
                                {dropQuery.data?.project?.drop?.collection?.creators?.map(
                                  (creator, index) => (
                                    <div
                                      className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50 mt-3"
                                      key={creator.address}
                                    >
                                      <span className="text-gray-500 text-xs font-medium">
                                        Royalty wallet address #{index + 1}
                                      </span>
                                      <span className="text-primary text-sm font-medium">
                                        {creator.shortAddress}{' '}
                                        <span className="text-gray-400">- {creator.share}%</span>a{' '}
                                      </span>
                                    </div>
                                  )
                                )}
                                <div className="flex gap-2 mt-3">
                                  <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                                    <span className="text-gray-500 text-xs font-medium">
                                      Start date
                                    </span>
                                    <span className="text-primary text-sm font-medium">
                                      {formatDateString(startTime, DateFormat.DATE_1)},{' '}
                                      {formatDateString(startTime, DateFormat.TIME_1)}
                                    </span>
                                  </div>
                                  <div className="w-full flex flex-col rounded-md py-2 px-3 bg-gray-50">
                                    <span className="text-gray-500 text-xs font-medium">
                                      End date
                                    </span>
                                    <span className="text-primary text-sm font-medium">
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
                        name="Analytics"
                        href={`/projects/${project}/drops/${drop}/analytics`}
                        active={pathname === `/projects/${project}/drops/${drop}/analytics`}
                      />
                      <Tabs.Tab
                        name="Purchase history"
                        href={`/projects/${project}/drops/${drop}/purchases`}
                        active={pathname === `/projects/${project}/drops/${drop}/purchases`}
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
