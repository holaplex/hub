import { useEffect, useState } from 'react';
import { useOry } from './useOry';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { AuthenticatorAssuranceLevel, LoginFlow } from '@ory/client';
import { toast } from 'react-toastify';

interface LoginResponse {
  redirect_path: string;
}

const defaultUndefined = defaultTo(undefined);

interface LoginFlowContext {
  flow?: LoginFlow;
  loading: boolean;
}

export function useLoginFlow(
  aal: AuthenticatorAssuranceLevel = AuthenticatorAssuranceLevel.Aal1
): LoginFlowContext {
  const [flow, setFlow] = useState<LoginFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();

  let returnTo = defaultUndefined(searchParams?.get('return_to'));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ory.createBrowserLoginFlow({ returnTo, aal, refresh: true });

        setFlow(data);
      } catch (err: any) {
        const errorCode = err.response?.data.error?.id;

        if (errorCode === 'session_already_available') {
          try {
            const response = await fetch('/browser/login', {
              method: 'POST',
              credentials: 'same-origin',
            });

            const json: LoginResponse = await response.json();

            router.push(json.redirect_path);
          } catch (e: any) {
            toast.error(
              'Unable to forward you to an organization. Please select or create an organization.'
            );

            router.push('/organizations');
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [router, returnTo, ory]);

  return {
    flow,
    loading,
  };
}
