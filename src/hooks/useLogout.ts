import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { ory } from '../modules/ory';

interface LogoutContext {
  logout: () => void;
}

// Returns a function which will log the user out
export function useLogout(): LogoutContext {
  const [logoutToken, setLogoutToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
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
  });

  return {
    logout: () => {
      if (logoutToken) {
        ory.updateLogoutFlow({ token: logoutToken }).then(() => router.push('/login'));
      }
    },
  };
}
