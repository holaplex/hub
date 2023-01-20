import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from '../providers/SessionProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from './../client';
import { NextPage } from 'next';
import { ReactElement } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (props: { children: ReactElement }) => ReactElement;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const PageLayout = Component.getLayout ?? ((props: { children: ReactElement }) => props.children);

  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <PageLayout {...pageProps}>
          <Component {...pageProps} />
        </PageLayout>
      </SessionProvider>
    </ApolloProvider>
  );
}
