import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ReadFieldFunction } from '@apollo/client/cache/core/types/common';
import typeDefs from './../local.graphql';
import { shorten } from './modules/wallet';

function asShortAddress(_: any, { readField }: { readField: ReadFieldFunction }): string {
  const address: string | undefined = readField('address');

  return shorten(address as string);
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
