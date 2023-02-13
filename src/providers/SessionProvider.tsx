import { Session } from '@ory/client';
import { createContext, useState, Dispatch, SetStateAction } from 'react';
import { useLogout } from '../hooks/useLogout';

export type SessionContextType = {
  session?: Session;
  logout: () => void | null;
  setSession: Dispatch<SetStateAction<Session | undefined>>;
};

export const SessionContext = createContext<SessionContextType>({} as SessionContextType);

interface SessionProviderProps {
  children: React.ReactNode;
  session?: Session;
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  const { logout } = useLogout();
  const [s, setSession] = useState<Session | undefined>(session);

  return (
    <SessionContext.Provider value={{ session: s, setSession, logout }}>
      <>{children}</>
    </SessionContext.Provider>
  );
}
