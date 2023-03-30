import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { useOry } from './useOry';
import { RegistrationFlow } from '@ory/client';
import { toast } from 'react-toastify';

const defaultUndefined = defaultTo(undefined);

interface RegistrationFlowContext {
  flow?: RegistrationFlow;
  loading: boolean;
}

export function useRegistrationFlow(): RegistrationFlowContext {
  const [flow, setFlow] = useState<RegistrationFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();

  let returnTo = defaultUndefined(searchParams?.get('return_to'));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ory.createBrowserRegistrationFlow({ returnTo });

        setFlow(data);
      } catch (err: any) {
        const errorCode = err.response?.data.error?.id;

        if (errorCode === 'session_already_available') {
          toast.info('You are already logged in');

          router.push('/projects');
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
