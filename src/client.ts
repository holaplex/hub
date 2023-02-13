import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

export function apollo(uri: string): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
  });
};
