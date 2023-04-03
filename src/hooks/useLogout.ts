import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useOry } from './useOry';

interface LogoutContext {
  logout: () => void;
}

// Returns a function which will log the user out
export function useLogout(): LogoutContext {
  const router = useRouter();
  const { ory } = useOry();

  const logout = useCallback(() => {
    ory
      .createBrowserLogoutFlow()
      .then(({ data }) => {
        return fetch('/browser/logout', {
          method: 'POST',
          credentials: 'same-origin',
        }).then(() => ({ data }));
      })
      .then(({ data }) => {
        return ory.updateLogoutFlow({ token: data.logout_token });
      })
      .then(() => router.push('/login'))
      .catch((err: AxiosError) => {
        switch (err.response?.status) {
          case 401:
            // do nothing, the user is not logged in
            return;
        }

        // Something else happened!
        return Promise.reject(err);
      });
  }, [ory, router]);

  return {
    logout,
  };
}
