import { Session } from '@ory/client';
import { createContext, useContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { LogoutLink } from '../modules/ory';
import { useRouter } from 'next/router';
import ory from '../modules/ory/sdk';

export type SessionContextType = {
  session: Session | null;
  error: AxiosError | null;
  logout: () => void | null;
};

const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const onLogout = LogoutLink();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        // User has a session!
        setSession(data);
        // Create a logout url
        // ory.createBrowserLogoutFlow().then(({ data }) => {
        //   setLogoutUrl(data.logout_url);
        // });
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, [router]);
  return (
    <SessionContext.Provider value={{ session, error, logout: onLogout }}>
      <>{children}</>
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
