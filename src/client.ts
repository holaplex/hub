import { ApolloClient, InMemoryCache, NormalizedCacheObject, Reference } from '@apollo/client';
import { ReadFieldFunction, ToReferenceFunction } from '@apollo/client/cache/core/types/common';
import typeDefs from './../local.graphql';
import { Blockchain, Collection } from './graphql.types';
import { shorten } from './modules/wallet';

function asShortAddress(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('address');

  return shorten(address as string);
}

function asShortCollectionAddress(_: any, { readField }: { readField: ReadFieldFunction }): string | null {
  const address: string | undefined = readField('address');
  const blockchain: Blockchain | undefined = readField('blockchain');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return shorten(address as string);
    case Blockchain.Polygon:
      const [contractAddress, tokenId] = address.split(':');
      return `${shorten(contractAddress as string)}:${tokenId}`;
    default:
      return null;
  }
}

function asShortWallet(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('wallet');

  if (address) {
    return shorten(address as string);
  }

  return '';
}

function asShortTx(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('txSignature');

  if (address) {
    return shorten(address as string);
  }

  return '';
}

function asShortSignature(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const signature: string | undefined = readField('signature');

  if (signature) {
    return shorten(signature as string);
  }

  return '';
}

function asRoyalties(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const sellerFeeBasisPoints: number | undefined = readField('sellerFeeBasisPoints');

  return `${(sellerFeeBasisPoints as number) / 100}%`;
}

function asHolderExplorerLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
): string | null {
  const collectionIdentifier = cache.identify({
    __typename: 'Collection',
    id: readField('collectionId'),
  }) as string;
  const collectionRef = toReference(collectionIdentifier);
  const blockchain = readField('blockchain', collectionRef);

  const address: string | undefined = readField('address');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/account/${address}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/address/${address}`;
    default:
      return null;
  }
}

function asCollectionExplorerLink(
  _: any,
  { readField }: { readField: ReadFieldFunction }
): string | null {
  const address: string | undefined = readField('address');
  const blockchain = readField('blockchain');

  if (!address) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/account/${address}`;
    case Blockchain.Polygon:
      const [contractAddress, tokenId] = address.split(':');

      return `https://polygonscan.com/token/${contractAddress}?a=${tokenId}`;
    default:
      return null;
  }
}

function asCollectionTransactionLink(
  _: any,
  { readField }: { readField: ReadFieldFunction }
): string | null {
  const blockchain = readField('blockchain');
  const tx: string | undefined = readField('signature');

  if (!tx) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/tx/${tx}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/tx/${tx}`;
    default:
      return null;
  }
}

function asPurchaseTransactionLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: ToReferenceFunction }
): string | null {
  const dropRef = toReference(
    cache.identify({ __typename: 'Drop', id: readField('dropId') }) as string
  );
  const collectionRef = readField('collection', dropRef) as Reference;
  const blockchain = readField('blockchain', collectionRef);

  const tx: string | undefined = readField('txSignature');

  if (!tx) {
    return null;
  }

  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/tx/${tx}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/tx/${tx}`;
    default:
      return null;
  }
}

export function apollo(uri: string, session?: string): ApolloClient<NormalizedCacheObject> {
  let headers: Record<string, string> = {};

  if (session) {
    headers['Cookie'] = `hub_session=${session}`;
  }

  return new ApolloClient({
    uri,
    cache: new InMemoryCache({
      typePolicies: {
        MetadataJson: {
          keyFields: ['id'],
        },
        Wallet: {
          fields: {
            shortAddress: asShortAddress,
          },
        },
        Collection: {
          fields: {
            royalties: asRoyalties,
            shortAddress: asShortCollectionAddress,
            exploreLink: asCollectionExplorerLink,
            transactionLink: asCollectionTransactionLink,
            shortTx: asShortSignature,
          },
        },
        CollectionCreator: {
          fields: {
            shortAddress: asShortAddress,
          },
        },
        Holder: {
          fields: {
            shortAddress: asShortAddress,
            exploreLink: asHolderExplorerLink,
          },
        },
        Purchase: {
          fields: {
            shortWallet: asShortWallet,
            shortTx: asShortTx,
            transactionLink: asPurchaseTransactionLink,
          },
        },
        CollectionMint: {
          fields: {
            ownerShortAddress: asShortAddress,
            shortAddress: asShortAddress,
          },
        },
      },
    }),
    credentials: 'include',
    headers,
    typeDefs,
  });
}
