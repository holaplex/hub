'use client';

import { SessionProvider } from '../providers/SessionProvider';
import { ApolloProvider } from '@apollo/client';
import { client } from './../client';
import { ToastContainer } from "react-toastify"

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>{children}</SessionProvider>
      <ToastContainer />
    </ApolloProvider>
  );
}
