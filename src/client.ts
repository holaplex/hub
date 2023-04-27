import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import typeDefs from './../local.graphql';
import { shorten } from './modules/wallet';

function asShortAddress(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('address');

  return shorten(address as string);
}

function asShortWallet(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('wallet');

  return shorten(address as string);
}

function asShortTx(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('txSignature');

  return shorten(address as string);
}

function asRoyalties(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const sellerFeeBasisPoints: number | undefined = readField('sellerFeeBasisPoints');

  return `${(sellerFeeBasisPoints as number) / 100}%`;
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
          },
        },
        Purchase: {
          fields: {
            shortWallet: asShortWallet,
            shortTx: asShortTx,
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
