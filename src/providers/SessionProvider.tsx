import { Session } from '@ory/client';
import { createContext, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { compareAsc, sub, subMinutes } from 'date-fns';
import { useLogout } from '../hooks/useLogout';
import { convertLocalTime } from '../modules/time';
import { parseISO } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { toast } from 'react-toastify';
import { Button } from '@holaplex/ui-library-react';

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

  useEffect(() => {
    if (!s) {
      return;
    }

    const interval = setInterval(() => {
      const now = zonedTimeToUtc(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone);
      const expiration = parseISO(s?.expires_at as string);

      if (compareAsc(now, expiration) >= 0) {
        logout();

        toast.info(
          'Your session has expired so you have been automatically logged out. Please log back in to continue.'
        );
        return;
      }

      if (compareAsc(now, subMinutes(expiration, 5)) >= 0) {
        toast.warning(
          <div className="flex flex-col gap-2">
            <p>
              Your session is going to expire in 5 minutes. To continue please{' '}
              <span
                className="text-black hover:underline transition cursor-pointer inline-block"
                onClick={logout}
              >
                re-login
              </span>
              .
            </p>
          </div>,
          { autoClose: false, closeOnClick: false }
        );
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [s, logout]);

  return (
    <SessionContext.Provider value={{ session: s, setSession, logout }}>
      <>{children}</>
    </SessionContext.Provider>
  );
}
