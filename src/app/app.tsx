'use client';

import { SessionProvider } from '../providers/SessionProvider';
import { ToastContainer } from 'react-toastify';

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <ToastContainer />
    </SessionProvider>
  );
}
