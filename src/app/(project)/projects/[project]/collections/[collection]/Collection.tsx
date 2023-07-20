'use client';

import { PopoverBox } from '@holaplex/ui-library-react';
import { useMemo } from 'react';
import Tabs from '../../../../../../layouts/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GetProjectCollection } from './../../../../../../queries/collections.graphql';
import { convertLocalTime, DateFormat } from '../../../../../../modules/time';
import { useQuery } from '@apollo/client';
import { Blockchain, Project } from '../../../../../../graphql.types';
import { Icon } from '../../../../../../components/Icon';
import { cloneElement } from 'react';
import Typography, { Size } from '../../../../../../components/Typography';
import { shorten } from '../../../../../../modules/wallet';
import { format } from 'date-fns';

interface CollectionProps {
  project: string;
  collection: string;
  children: React.ReactNode;
}

interface GetCollectionVars {
  project: string;
  collection: string;
}

interface GetCollectionData {
  project: Pick<Project, 'collection'>;
}

export default function Collection({
  children,
  project,
  collection,
}: CollectionProps): JSX.Element {
  const pathname = usePathname();

  const collectionQuery = useQuery<GetCollectionData, GetCollectionVars>(GetProjectCollection, {
    variables: { project, collection },
  });

  const loading = collectionQuery.loading;
  const collectionData = collectionQuery.data?.project?.collection;

  let blockchainIcon = useMemo(() => {
    switch (collectionData?.blockchain) {
      case Blockchain.Solana:
        return <Icon.Crypto.Sol className="cursor-pointer" />;
      case Blockchain.Polygon:
        return <Icon.Crypto.Polygon className="cursor-pointer" />;
      default:
        return <></>;
    }
  }, [collectionData?.blockchain]);

  return (
    <div className="flex flex-col px-6 py-6">
      {loading ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-64 bg-stone-900 animate-pulse rounded-lg" />
              <div className="h-10 w-64 bg-stone-900 animate-pulse rounded-lg" />
            </div>
          </div>

          <div className="min-w-full mt-8">
            <div className="flex p-6 bg-stone-900 rounded-lg">
              <div className="basis-1/2 min-h-full flex border-r border-r-stone-800 pr-4 gap-4">
                <span className="h-[80px] w-[80px] bg-stone-800 animate-pulse rounded-lg" />
                <div className="flex flex-col gap-2 min-w-max">
                  <div className="h-6 w-64 bg-stone-800 animate-pulse rounded-full" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full" />
                  <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full" />
                </div>
              </div>
              <div className="basis-1/2 h-full flex flex-col px-4 justify-between">
                <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
                <div className="h-4 w-full bg-stone-800 animate-pulse rounded-full mt-2" />
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 text-2xl font-medium items-center">
              <Link href={`/projects/${project}/collections`} className="text-gray-400">
                Collections /
              </Link>
              <span>{collectionQuery.data?.project?.collection?.metadataJson?.name}</span>
            </div>
          </div>

          {/* MAIN */}
          <div className="mt-8 min-w-full">
            <div className="flex p-6 bg-stone-900 rounded-lg mt-6">
              <div className="basis-1/2 min-h-full flex border-r border-r-stone-800 pr-4 gap-4">
                <img
                  src={collectionData?.metadataJson?.image as string}
                  className="w-[80px] h-[80px] aspect-square rounded-lg object-cover"
                />
                <div className="flex flex-col gap-2">
                  <Typography.Header size={Size.H2}>
                    {collectionData?.metadataJson?.name as string}
                  </Typography.Header>
                  <span className="text-sm text-gray-400">
                    {collectionData?.metadataJson?.description}
                  </span>
                </div>
              </div>

              <div className="basis-1/2 h-full flex flex-col px-4 gap-2 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-400">Blockchain</span>
                  <PopoverBox
                    triggerButton={blockchainIcon}
                    elements={[<span key="blockchain">{collectionData?.blockchain}</span>]}
                  />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-400">Type</span>
                  <span>
                    {collectionData?.drop ? (
                      <span>
                        Drop{' '}
                        <Link
                          href={`/projects/${project}/drops/${collectionData.drop.id}/mints`}
                          className="text-yellow-300"
                        >
                          view
                        </Link>
                      </span>
                    ) : (
                      'Open'
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-400">Symbol</span>
                  <span>{collectionData?.metadataJson?.symbol}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-400">Created</span>
                  <span>
                    {format(convertLocalTime(collectionData?.createdAt), DateFormat.DATE_2)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-400">Authority</span>
                  <span>{shorten(collectionData?.createdById)}</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Tabs.Page className="mt-8">
        <Tabs.Panel loading={loading}>
          <Tabs.Tab
            name="NFTs"
            href={`/projects/${project}/collections/${collection}/nfts`}
            active={pathname === `/projects/${project}/collections/${collection}/nfts`}
          />
          <Tabs.Tab
            name="Current holders"
            href={`/projects/${project}/collections/${collection}/holders`}
            active={pathname === `/projects/${project}/collections/${collection}/holders`}
          />
        </Tabs.Panel>
        <Tabs.Content>{cloneElement(children as JSX.Element, { loading })}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
