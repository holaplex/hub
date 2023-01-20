'use client';
import './globals.css';
import { SessionProvider } from '../providers/SessionProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from './../client';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>{children}</SessionProvider>
    </ApolloProvider>
  );
}
