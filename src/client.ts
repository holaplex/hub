"use client";
import { ApolloClient, InMemoryCache } from '@apollo/client';
import config from './app.config.client';

export const client = new ApolloClient({
  uri: config.graphql,
  cache: new InMemoryCache(),
});
