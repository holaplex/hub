'use client';

import { SessionProvider } from '../providers/SessionProvider';
import { ApolloProvider } from '@apollo/client';
import { OryProvider } from '../providers/OryProvider';
import { apollo } from '../client';
import { ToastContainer } from 'react-toastify';
import { Session } from '@ory/client';

interface AppLayoutProps {
  children: React.ReactNode;
  session?: Session;
}

export default function App({ children, session }: AppLayoutProps) {
  return (
    <SessionProvider session={session}>
      <OryProvider>
        <ApolloProvider client={apollo('/graphql')}>
          {children}
          <ToastContainer theme="dark" position="bottom-right" />
        </ApolloProvider>
      </OryProvider>
    </SessionProvider>
  );
}
