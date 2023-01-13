import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState, useEffect, DependencyList } from 'react';

import ory from '../modules/ory/sdk';

interface LogoutContext {
  logout: () => void;
}

// Returns a function which will log the user out
export function useLogout(deps?: DependencyList): LogoutContext {
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
  }, deps);

  return {
    logout: () => {
      if (logoutToken) {
        ory
          .updateLogoutFlow({ token: logoutToken })
          .then(() => router.push('/login'))
          .then(() => router.reload());
      }
    },
  };
}
