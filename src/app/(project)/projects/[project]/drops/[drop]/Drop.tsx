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
import {
  AssetType,
  Blockchain,
  CollectionCreatorInput,
  DropStatus,
  MetadataJsonAttribute,
  Project,
} from '../../../../../../graphql.types';
import clsx from 'clsx';
import { cloneElement } from 'react';
import Table from '../../../../../../components/Table';
import { Drop as DropModal } from '../../../../../../components/Drop';
import Typography, { Size } from '../../../../../../components/Typography';
import { shorten } from '../../../../../../modules/wallet';
import { format } from 'util';

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
  const dropData = dropQuery.data?.project?.drop;
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
  const startTime = dropData?.startTime || dropData?.createdAt;
  const endTime = dropData?.endTime;

  return (
    <DropModal.Shutdown>
      {({ shutdown }) => (
        <DropModal.Resume>
          {({ resume }) => (
            <DropModal.Pause>
              {({ pause }) => (
                <div className="flex flex-col px-6 py-6">
                  {loading ? (
                    <>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 items-center">
                          <div className="h-8 w-80 bg-stone-900 animate-pulse rounded-lg" />
                          <div className="h-6 w-16 bg-stone-900 animate-pulse rounded-full" />
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="h-10 w-24 bg-stone-900 animate-pulse rounded-lg" />
                          <div className="h-10 w-28 bg-stone-900 animate-pulse rounded-lg" />
                          <div className="h-10 w-32 bg-stone-900 animate-pulse rounded-lg" />
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
                          <div className="flex p-6 bg-stone-900 rounded-lg">
                            <div className="basis-1/2 h-full flex flex-col border-r border-r-stone-800 pr-4">
                              <div className="h-4 w-8 bg-stone-800 animate-pulse rounded-full mb-2" />
                              <span className="h-8 w-2/3 bg-stone-800 animate-pulse rounded-lg mb-1" />
                              <span className="h-6 w-1/3 bg-stone-800 animate-pulse rounded-lg mb-7" />
                              <div className="h-4 w-10 bg-stone-800 animate-pulse rounded-full mb-1" />
                              <span className="h-12 w-3/4 bg-stone-800 animate-pulse rounded-lg" />
                              <div className="flex gap-2 mt-4">
                                <span className="h-14 w-full bg-stone-800 animate-pulse rounded-lg" />
                                <span className="h-14 w-full bg-stone-800 animate-pulse rounded-lg" />
                              </div>
                            </div>
                            <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                              <div className="flex flex-col gap-2">
                                <div className="h-4 w-8 bg-stone-800 animate-pulse rounded-full mb-2" />
                                <span className="h-8 w-1/3 bg-stone-800 animate-pulse rounded-lg mb-7" />
                              </div>
                              <div>
                                <div className="flex flex-col gap-3">
                                  <div className="h-12 w-full flex flex-col rounded-lg bg-stone-800 animate-pulse" />
                                </div>

                                <div className="flex gap-2 mt-3">
                                  <div className="h-12 w-full flex flex-col rounded-lg bg-stone-800 animate-pulse" />
                                  <div className="h-12 w-full flex flex-col rounded-lg bg-stone-800 animate-pulse" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* HEADER */}
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2 text-2xl font-medium items-center">
                          <Link href={`/projects/${project}/drops`} className="text-gray-400">
                            Drops /
                          </Link>{' '}
                          <span>
                            {dropQuery.data?.project?.drop?.collection?.metadataJson?.name}
                          </span>
                          <Table.DropStatusPill
                            status={dropQuery.data?.project?.drop?.status as DropStatus}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/projects/${project}/drops/${drop}/mint`}>
                            <Button>Mint edition</Button>
                          </Link>
                          <Link href={`/projects/${project}/drops/${drop}/help`}>
                            <Button variant="secondary">?</Button>
                          </Link>
                        </div>
                        {/* {dropQuery.data?.project.drop?.status !== DropStatus.Shutdown && (
                          <div className="flex items-center gap-2">
                            <Link href={`/projects/${project}/drops/${drop}/edit`}>
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
                        )} */}
                      </div>
                      {/* MAIN */}
                      <div className="mt-5 flex flex-col md:flex-row gap-6">
                        <div className="basis-1/3 shrink">
                          {dropData?.collection.metadataJson?.animationUrl ? (
                            <video
                              src={dropData?.collection.metadataJson?.animationUrl}
                              controls
                              className="w-full aspect-video object-cover rounded-lg"
                            />
                          ) : (
                            <img
                              src={dropData?.collection?.metadataJson?.image as string}
                              className="w-full aspect-square rounded-lg object-cover"
                            />
                          )}
                        </div>
                        <div className="basis-2/3 shrink flex flex-col gap-2">
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
                          <div className="flex p-6 bg-stone-900 rounded-lg">
                            <div className="basis-1/2 h-full flex flex-col border-r border-r-stone-800 pr-4">
                              <span className="text-sm text-gray-400">
                                {dropData?.collection.metadataJson?.symbol}
                              </span>
                              <Typography.Header size={Size.H2} className="mt-2">
                                {dropData?.collection.metadataJson?.name as string}
                              </Typography.Header>
                              <span className="text-sm text-gray-400 mt-2">
                                {dropData?.collection.metadataJson?.description}
                              </span>
                            </div>

                            <div className="basis-1/2 h-full flex flex-col px-4 gap-2 text-sm">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-gray-400">Royalties</span>
                                <span>{dropData?.collection.sellerFeeBasisPoints}</span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-gray-400">Royalties recipients</span>
                                <div className="flex flex-col gap-2 justify-end">
                                  {dropData?.collection.creators?.map(
                                    (creator: CollectionCreatorInput) => {
                                      return (
                                        <div
                                          key={creator.address}
                                          className="text-right"
                                        >{`${shorten(creator.address)} - ${creator.share}%`}</div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-gray-400">Starts</span>
                                <span>
                                  {dropData?.startTime
                                    ? `${format(dropData?.startTime, DateFormat.DATE_1)}, ${format(
                                        dropData?.startTime,
                                        DateFormat.TIME_1
                                      )}`
                                    : 'Immediately'}
                                </span>
                              </div>
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-gray-400">Ends</span>
                                <span>
                                  {dropData?.endTime
                                    ? `${format(dropData?.endTime, DateFormat.DATE_1)}, ${format(
                                        dropData?.endTime,
                                        DateFormat.TIME_1
                                      )}`
                                    : 'Never'}
                                </span>
                              </div>
                              {dropData?.collection.metadataJson?.externalUrl && (
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-gray-400">External URL</span>
                                  <span>{dropData?.collection.metadataJson?.externalUrl}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
                            {dropData?.collection.metadataJson?.attributes?.map(
                              (attr: MetadataJsonAttribute) => {
                                return (
                                  <div
                                    key={attr.id}
                                    className="w-full flex flex-col rounded-lg py-2 px-4 bg-stone-800 col-span-1"
                                  >
                                    <span className="text-gray-400 text-xs">{attr.traitType}</span>
                                    <span className="text-white text-sm mt-2">{attr.value}</span>
                                  </div>
                                );
                              }
                            )}
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
