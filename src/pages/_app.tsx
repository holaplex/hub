import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from '../providers/SessionProvider';
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
    <SessionProvider>
      <PageLayout {...pageProps}>
        <Component {...pageProps} />
      </PageLayout>
    </SessionProvider>
  );
}
