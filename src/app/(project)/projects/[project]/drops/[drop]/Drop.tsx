'use client';

import { Button, PopoverBox } from '@holaplex/ui-library-react';
import { useMemo } from 'react';
import Tabs from './../../../../../../layouts/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GetDrop } from './../../../../../../queries/drop.graphql';
import { format } from 'date-fns';
import {
  DateFormat,
  daysUntil,
  inTheFuture,
  convertLocalTime,
} from './../../../../../../modules/time';
import { useQuery } from '@apollo/client';
import {
  Blockchain,
  CreatorInput,
  DropStatus,
  DropType,
  MetadataJsonAttribute,
  Project,
} from '../../../../../../graphql.types';
import { Icon } from './../../../../../../components/Icon';
import clsx from 'clsx';
import { cloneElement } from 'react';
import Typography, { Size } from '../../../../../../components/Typography';
import { shorten } from '../../../../../../modules/wallet';
import { useRouter } from 'next/navigation';
import { isNil, not, pipe } from 'ramda';

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

const isNotNil = pipe(isNil, not);

export default function Drop({ children, project, drop }: DropProps): JSX.Element {
  const pathname = usePathname();
  const router = useRouter();

  const dropQuery = useQuery<GetDropsData, GetDropVars>(GetDrop, { variables: { project, drop } });

  const percent = useMemo(() => {
    if (dropQuery.data?.project?.drop?.collection?.supply == 0) {
      return 0;
    }

    return Math.ceil(
      ((dropQuery.data?.project?.drop?.collection?.totalMints as number) /
        (dropQuery.data?.project?.drop?.collection?.supply as number)) *
        100
    );
  }, [
    dropQuery.data?.project?.drop?.collection?.supply,
    dropQuery.data?.project?.drop?.collection?.totalMints,
  ]);

  const hasSupply = isNotNil(dropQuery.data?.project?.drop?.collection?.supply);

  const loading = dropQuery.loading;
  const dropData = dropQuery.data?.project?.drop;
  const startTime = dropData?.startTime || dropData?.createdAt;

  let blockchainIcon = useMemo(() => {
    switch (dropData?.collection.blockchain) {
      case Blockchain.Solana:
        return <Icon.Crypto.Sol />;
      case Blockchain.Polygon:
        return <Icon.Crypto.Polygon />;
      default:
        return <></>;
    }
  }, [dropData?.collection.blockchain]);

  let tabs = [
    <Tabs.Tab
      name="Mint history"
      key="mints"
      href={`/projects/${project}/drops/${drop}/mints`}
      active={pathname === `/projects/${project}/drops/${drop}/mints`}
    />,
    <Tabs.Tab
      name="Current holders"
      key="holders"
      href={`/projects/${project}/drops/${drop}/holders`}
      active={pathname === `/projects/${project}/drops/${drop}/holders`}
    />,
  ];

  if (dropData?.dropType === DropType.Open) {
    tabs = [
      <Tabs.Tab
        key="queued"
        name="Unminted supply"
        href={`/projects/${project}/drops/${drop}/supply`}
        active={pathname === `/projects/${project}/drops/${drop}/supply`}
      />,
      ...tabs,
    ];
  }

  return (
    <div className="flex flex-col px-6 py-6">
      {loading ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-64 bg-stone-900 animate-pulse rounded-lg" />
              <div className="h-10 w-64 bg-stone-900 animate-pulse rounded-lg" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-12 bg-stone-900 animate-pulse rounded-lg" />
              <div className="h-10 w-12 bg-stone-900 animate-pulse rounded-lg" />
              <div className="h-10 w-32 bg-stone-900 animate-pulse rounded-lg" />
            </div>
          </div>
          <div className="mt-8 flex gap-6">
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
                  <span className="h-10 w-32 bg-stone-800 animate-pulse rounded-lg mb-1" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-4" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                </div>
                <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
                <div className="h-12 w-full flex flex-col rounded-lg bg-stone-800 animate-pulse col-span-1" />
                <div className="h-12 w-full flex flex-col rounded-lg bg-stone-800 animate-pulse col-span-1" />
                <div className="h-12 w-full flex flex-col rounded-lg bg-stone-800 animate-pulse col-span-1" />
                <div className="h-12 w-full flex flex-col rounded-lg bg-stone-800 animate-pulse col-span-1" />
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
              <span>{dropQuery.data?.project?.drop?.collection?.metadataJson?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${project}/drops/${drop}/edit`}
                className="border-2 border-yellow-300 rounded-md p-2 group hover:border-yellow-500"
              >
                <Icon.Edit2 stroke="stroke-yellow-300" className="group-hover:stroke-yellow-500" />
              </Link>
              <Link href={`/projects/${project}/drops/${drop}/help`}>
                <Button variant="secondary">?</Button>
              </Link>
              <Link href={`/projects/${project}/drops/${drop}/mint`}>
                <Button
                  disabled={dropQuery?.data?.project?.drop?.status !== DropStatus.Minting}
                  onClick={() => {
                    if (dropQuery?.data?.project?.drop?.status !== DropStatus.Minting) return;
                    router.push(`/projects/${project}/drops/${drop}/mint`);
                  }}
                >
                  {dropQuery.data?.project?.drop?.dropType === DropType.Edition
                    ? 'Mint edition'
                    : 'Mint random'}
                </Button>
              </Link>
            </div>
          </div>

          {/* MAIN */}
          <div className="mt-8 flex flex-col md:flex-row gap-6">
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
            <div className="basis-2/3 shrink flex flex-col">
              <div className="flex items-end gap-2">
                <div className="w-full text-xs font-medium">
                  <div className="flex items-center justify-between">
                    <span className="text-white">
                      {`Status: ${dropQuery.data?.project?.drop?.status} - ${
                        dropQuery.data?.project?.drop?.collection?.totalMints
                      } ${` / ${
                        hasSupply ? dropQuery.data?.project?.drop?.collection?.supply : '∞'
                      }`}`}
                      <span className="text-gray-500"> - minted</span>
                    </span>
                    {inTheFuture(startTime) ? (
                      <span className="text-gray-400">{daysUntil(startTime)} to start</span>
                    ) : (
                      hasSupply && <span>{`${percent}%`}</span>
                    )}
                  </div>
                  {hasSupply && (
                    <div className="w-full rounded-full h-[12px] bg-stone-800 mt-1 relative overflow-hidden">
                      <div
                        className={clsx('top-0 bottom-0 left-0 absolute rounded-r-full', {
                          'bg-green-400':
                            dropQuery.data?.project?.drop?.status === DropStatus.Minting ||
                            dropQuery.data?.project?.drop?.status === DropStatus.Minted,
                          'bg-red-500':
                            dropQuery.data?.project?.drop?.status === DropStatus.Shutdown ||
                            dropQuery.data?.project?.drop?.status === DropStatus.Expired,
                          'bg-yellow-400':
                            dropQuery.data?.project?.drop?.status === DropStatus.Paused ||
                            dropQuery.data?.project?.drop?.status === DropStatus.Scheduled,
                        })}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  )}

                  <div></div>
                </div>
                {dropQuery.data?.project?.drop?.status === DropStatus.Paused && (
                  <Link
                    href={`/projects/${project}/drops/${drop}/resume`}
                    className="border border-yellow-300 rounded-lg p-2 cursor-pointer group hover:border-yellow-500"
                  >
                    <Icon.Play
                      stroke="stroke-yellow-300"
                      className="group-hover:stroke-yellow-500"
                    />
                  </Link>
                )}
                {dropQuery.data?.project?.drop?.status === DropStatus.Minting && (
                  <Link
                    href={`/projects/${project}/drops/${drop}/pause`}
                    className="border border-yellow-300 rounded-lg p-2 cursor-pointer group hover:border-yellow-500"
                  >
                    <Icon.Pause2
                      stroke="stroke-yellow-300"
                      className="group-hover:stroke-yellow-500"
                    />
                  </Link>
                )}
                {(dropQuery.data?.project?.drop?.status === DropStatus.Minting ||
                  dropQuery.data?.project?.drop?.status === DropStatus.Paused ||
                  dropQuery.data?.project?.drop?.status === DropStatus.Scheduled) && (
                  <Link
                    href={`/projects/${project}/drops/${drop}/shutdown`}
                    className="border border-yellow-300 rounded-lg p-2 cursor-pointer group hover:border-yellow-500"
                  >
                    <Icon.Cross stroke="stroke-yellow-300 group-hover:stroke-yellow-500" />
                  </Link>
                )}
              </div>

              <div className="flex p-6 bg-stone-900 rounded-lg mt-6">
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
                    <span className="text-gray-400">Blockchain</span>
                    <span className="flex align-middle">
                      {blockchainIcon} {dropData?.collection.blockchain}
                    </span>
                  </div>
                  {dropData?.collection.address && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">Address</span>
                      <a
                        target="_blank"
                        rel="nofollow"
                        className="hover:underline hover:opacity-80"
                        href={dropData?.collection.exploreLink as string}
                      >
                        {dropData?.collection.shortAddress}
                      </a>
                    </div>
                  )}
                  {dropData?.collection.signature && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">Transaction</span>
                      <a
                        target="_blank"
                        rel="nofollow"
                        className="hover:underline hover:opacity-80"
                        href={dropData?.collection.transactionLink as string}
                      >
                        {dropData?.collection.shortTx}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Royalties</span>
                    <span>{dropData?.collection.royalties}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Royalties recipients</span>
                    <div className="flex flex-col gap-2 justify-end">
                      {dropData?.collection.creators?.map((creator: CreatorInput) => {
                        return (
                          <div key={creator.address} className="text-right">{`${shorten(
                            creator.address
                          )} - ${creator.share}%`}</div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Starts</span>
                    <span>
                      {dropData?.startTime
                        ? `${format(convertLocalTime(dropData?.startTime), DateFormat.DATE_2)}`
                        : 'Immediately'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Ends</span>
                    <span>
                      {dropData?.endTime
                        ? `${format(convertLocalTime(dropData?.endTime), DateFormat.DATE_2)}`
                        : 'Never'}
                    </span>
                  </div>
                  {dropData?.collection.metadataJson?.externalUrl && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">External URL</span>
                      <a
                        rel="nofollow"
                        href={dropData?.collection.metadataJson?.externalUrl as string}
                        target="_blank"
                        className="hover:underline hover:opacity-80"
                      >
                        {dropData?.collection.metadataJson?.externalUrl}
                      </a>
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
        <Tabs.Panel loading={loading}>{tabs}</Tabs.Panel>
        <Tabs.Content>{cloneElement(children as JSX.Element, { loading })}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
