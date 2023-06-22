import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import typeDefs from './../local.graphql';
import { Blockchain } from './graphql.types';
import { shorten } from './modules/wallet';

function asShortAddress(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('address');

  return shorten(address as string);
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

function asRoyalties(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const sellerFeeBasisPoints: number | undefined = readField('sellerFeeBasisPoints');

  return `${(sellerFeeBasisPoints as number) / 100}%`;
}

function asExploreLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: any }
): string | null {
  const collectionRef = toReference(
    cache.identify({ __typename: 'Collection', id: readField('blockchain') })
  );
  const blockchain = readField('blockchain', collectionRef);

  const addressToken: string | undefined = readField('address');
  const address = addressToken?.split(':')[0];
  switch (blockchain) {
    case Blockchain.Solana:
      return `https://solscan.io/account/${address}`;
    case Blockchain.Polygon:
      return `https://polygonscan.com/address/${address}`;
    default:
      return null;
  }
}

function astransactionLink(
  _: any,
  {
    readField,
    cache,
    toReference,
  }: { readField: ReadFieldFunction; cache: InMemoryCache; toReference: any }
): string | null {
  const collectionRef = toReference(
    cache.identify({ __typename: 'Collection', id: readField('blockchain') })
  );
  const blockchain = readField('blockchain', collectionRef);

  const tx: string | undefined = readField('txSignature');
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
            exploreLink: asExploreLink,
          },
        },
        Purchase: {
          fields: {
            shortWallet: asShortWallet,
            shortTx: asShortTx,
            transactionLink: astransactionLink,
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
