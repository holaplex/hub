import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { useOry } from './useOry';
import { useSession } from './useSession';

interface LogoutContext {
  logout: () => void;
}

// Returns a function which will log the user out
export function useLogout(): LogoutContext {
  const { session } = useSession();
  const [logoutToken, setLogoutToken] = useState<string>('');
  const router = useRouter();
  const { ory } = useOry();

  useEffect(() => {
    if (!session) {
      return
    }

    ory
      .createBrowserLogoutFlow()
      .then(({ data }) => {
        setLogoutToken(data.logout_token);
      })
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 401:
            // do nothing, the user is not logged in
            return;
        }

        // Something else happened!
        return Promise.reject(err);
      });
  }, [session, ory]);

  return {
    logout: () => {
      if (logoutToken) {
        ory.updateLogoutFlow({ token: logoutToken }).then(() => router.push('/login'));
      }
    },
  };
}
