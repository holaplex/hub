import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from '../providers/SessionProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from './../client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ApolloProvider>
  );
}
