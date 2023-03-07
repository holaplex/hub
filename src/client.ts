import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import typeDefs from './../local.graphql';

export function apollo(uri: string, session?: string): ApolloClient<NormalizedCacheObject> {
  let headers: Record<string, string> = {};

  if (session) {
    headers['Cookie'] = `hub_session=${session}`;
  }

  return new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    credentials: 'include',
    typeDefs,
    headers,
    
  });
}
