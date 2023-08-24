'use client';

import { useMemo } from 'react';
import Tabs from './../../../../../../../../../../layouts/Tabs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GetCollectionMint } from './../../../../../../../../../../queries/mint.graphql';
import { DateFormat, formatDateString } from './../../../../../../../../../../modules/time';
import { useQuery } from '@apollo/client';
import {
  Blockchain,
  CollectionMint,
  CreationStatus,
  Maybe,
  MetadataJsonAttribute,
  MintCreator,
} from '../../../../../../../../../../graphql.types';
import { Icon } from './../../../../../../../../../../components/Icon';
import { cloneElement } from 'react';
import Typography, { Size } from '../../../../../../../../../../components/Typography';
import { Button } from '@holaplex/ui-library-react';
import Table from '../../../../../../../../../../components/Table';

interface CollectionNftProps {
  project: string;
  collection: string;
  nft: string;
  children: React.ReactNode;
}

interface GetCollectionNftVars {
  mint: string;
}

interface GetCollectionNftData {
  mint: Maybe<CollectionMint>;
}

export default function CollectionNft({
  children,
  project,
  collection,
  nft,
}: CollectionNftProps): JSX.Element {
  const pathname = usePathname();

  const collectionMintQuery = useQuery<GetCollectionNftData, GetCollectionNftVars>(
    GetCollectionMint,
    { variables: { mint: nft } }
  );

  const loading = collectionMintQuery.loading;
  const collectionMintData = collectionMintQuery.data?.mint;

  let blockchainIcon = useMemo(() => {
    switch (collectionMintData?.collection?.blockchain) {
      case Blockchain.Solana:
        return <Icon.Crypto.Sol />;
      case Blockchain.Polygon:
        return <Icon.Crypto.Polygon />;
      default:
        return <></>;
    }
  }, [collectionMintData?.collection?.blockchain]);

  return (
    <div className="flex flex-col px-6 py-6">
      {loading ? (
        <>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <div className="h-10 w-40 bg-stone-900 animate-pulse rounded-lg" />
              <div className="h-10 w-40 bg-stone-900 animate-pulse rounded-lg" />
              <div className="h-10 w-40 bg-stone-900 animate-pulse rounded-lg" />
            </div>

            <div className="flex items-center gap-2">
              <div className="h-10 w-20 bg-stone-900 animate-pulse rounded-lg" />
            </div>
          </div>
          <div className="mt-8 flex gap-6">
            <div className="basis-1/3">
              <div className="w-full aspect-square bg-stone-900 animate-pulse rounded-lg" />
            </div>
            <div className="basis-2/3 flex flex-col gap-2">
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
              <Link href={`/projects/${project}/collections`} className="text-gray-400">
                Collections /
              </Link>{' '}
              <Link
                href={`/projects/${project}/collections/${collection}/nfts`}
                className="text-gray-400"
              >
                {collectionMintData?.collection?.metadataJson?.name} /
              </Link>
              <span>{collectionMintData?.metadataJson?.name}</span>
            </div>
            {collectionMintData?.editable && (
              <div className="flex items-center gap-2">
                <Link href={`/projects/${project}/collections/${collection}/nfts/${nft}/edit`}>
                  <Button variant="secondary" icon={<Icon.Edit2 stroke="stroke-yellow-300" />}>
                    Edit
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* MAIN */}
          <div className="mt-8 flex flex-col md:flex-row gap-6">
            <div className="basis-1/3 shrink">
              {collectionMintData?.metadataJson?.animationUrl ? (
                <video
                  src={collectionMintData?.metadataJson?.animationUrl}
                  controls
                  className="w-full aspect-video object-cover rounded-lg"
                />
              ) : (
                <img
                  src={collectionMintData?.metadataJson?.image as string}
                  className="w-full aspect-square rounded-lg object-cover"
                />
              )}
            </div>
            <div className="flex-grow">
              <div className="flex p-6 bg-stone-900 rounded-lg">
                <div className="basis-1/2 h-full flex flex-col border-r border-r-stone-800 pr-4">
                  <span className="text-sm text-gray-400">
                    {collectionMintData?.metadataJson?.symbol}
                  </span>
                  <Typography.Header size={Size.H2} className="mt-2">
                    {collectionMintData?.metadataJson?.name as string}
                  </Typography.Header>
                  <span className="text-sm text-gray-400 mt-2">
                    {collectionMintData?.metadataJson?.description}
                  </span>
                </div>

                <div className="basis-1/2 h-full flex flex-col px-4 gap-2 text-sm">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Status</span>
                    <span className="flex flex-row gap-1">
                      <Table.CreationStatusPill
                        status={collectionMintData?.creationStatus as CreationStatus}
                      />
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Blockchain</span>
                    <span className="flex flex-row gap-1">
                      {blockchainIcon} {collectionMintData?.collection?.blockchain}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Owner</span>
                    <a
                      href={collectionMintData?.ownerExplorerLink as string}
                      target="_blank"
                      rel="nofollow"
                      className="hover:underline hover:opacity-80"
                    >
                      {collectionMintData?.ownerShortAddress}
                    </a>
                  </div>
                  {collectionMintData?.mintHistory && (
                    <>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-400">Minted at</span>
                        <span className="flex flex-row gap-1">
                          {formatDateString(
                            collectionMintData?.mintHistory?.createdAt as string,
                            DateFormat.DATE_1
                          )}{' '}
                          -{' '}
                          {formatDateString(
                            collectionMintData?.mintHistory?.createdAt as string,
                            DateFormat.TIME_1
                          )}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-gray-400">Minted by</span>
                        <span className="flex flex-row gap-1">
                          {collectionMintData?.mintHistory?.shortWallet}
                        </span>
                      </div>
                    </>
                  )}

                  {collectionMintData?.address && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">Token ID</span>
                      <a
                        target="_blank"
                        rel="nofollow"
                        className="hover:underline hover:opacity-80"
                        href={collectionMintData?.exploreLink as string}
                      >
                        {collectionMintData?.shortAddress}
                      </a>
                    </div>
                  )}
                  {collectionMintData?.signature && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">Transaction</span>
                      <a
                        target="_blank"
                        rel="nofollow"
                        className="hover:underline hover:opacity-80"
                        href={collectionMintData?.transactionLink as string}
                      >
                        {collectionMintData?.shortTx}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Royalties</span>
                    <span>{collectionMintData?.royalties}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-400">Royalties recipients</span>
                    <div className="flex flex-col gap-2 justify-end">
                      {collectionMintData?.creators?.map((creator: MintCreator) => {
                        return (
                          <div
                            key={creator.address}
                            className="text-right"
                          >{`${creator.shortAddress} - ${creator.share}%`}</div>
                        );
                      })}
                    </div>
                  </div>
                  {collectionMintData?.metadataJson?.externalUrl && (
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-gray-400">External URL</span>
                      <a
                        rel="nofollow"
                        href={collectionMintData?.metadataJson?.externalUrl as string}
                        target="_blank"
                        className="hover:underline hover:opacity-80"
                      >
                        {collectionMintData?.metadataJson?.externalUrl}
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
                {collectionMintData?.metadataJson?.attributes?.map(
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
            name="Transfer History"
            href={`/projects/${project}/collections/${collection}/nfts/${nft}/transfers`}
            active={
              pathname === `/projects/${project}/collections/${collection}/nfts/${nft}/transfers`
            }
          />
          <Tabs.Tab
            name="Update History"
            href={`/projects/${project}/collections/${collection}/nfts/${nft}/updates`}
            active={
              pathname === `/projects/${project}/collections/${collection}/nfts/${nft}/updates`
            }
          />
        </Tabs.Panel>
        <Tabs.Content>{cloneElement(children as JSX.Element, { loading })}</Tabs.Content>
      </Tabs.Page>
    </div>
  );
}
