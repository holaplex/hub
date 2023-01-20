import { Session } from '@ory/client';
import { createContext, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ory } from '../modules/ory';
import { useLogout } from '../hooks/useLogout';

export type SessionContextType = {
  session: Session | null;
  error: AxiosError | null;
  logout: () => void | null;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout } = useLogout();
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    ory
      .toSession()
      .then(({ data }) => {
        setSession(data);
      })
      .catch((err: AxiosError) => {
        setError(err);
      });
  }, [router]);
  return (
    <SessionContext.Provider value={{ session, error, logout }}>
      <>{children}</>
    </SessionContext.Provider>
  );
}

