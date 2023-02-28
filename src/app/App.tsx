'use client';

import { SessionProvider } from '../providers/SessionProvider';
import { ApolloProvider } from '@apollo/client';
import { OryProvider } from '../providers/OryProvider';
import { apollo } from '../client';
import { ToastContainer } from 'react-toastify';
import { Session } from '@ory/client';
import { appConfig } from '../app.config';

interface AppLayoutProps {
  children: React.ReactNode;
  session?: Session;
}

export default function App({ children, session }: AppLayoutProps) {
  return (
    <SessionProvider session={session}>
      <OryProvider>
        <ApolloProvider client={apollo(appConfig.client('graphql'))}>
          {children}
          <ToastContainer />
        </ApolloProvider>
      </OryProvider>
    </SessionProvider>
  );
}
