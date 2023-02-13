import { useEffect, useState } from 'react';
import { useOry } from './useOry';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { LoginFlow } from '@ory/client';
import { toast } from 'react-toastify';

const defaultUndefined = defaultTo(undefined);

interface LoginFlowContext {
  flow?: LoginFlow;
  loading: boolean;
}

export function useLoginFlow(): LoginFlowContext {
  const [flow, setFlow] = useState<LoginFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();

  let returnTo = defaultUndefined(searchParams.get('return_to'));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ory.createBrowserLoginFlow({ returnTo });

        setFlow(data);
      } catch (err: any) {
        const errorCode = err.response?.data.error?.id;

        if (errorCode === 'session_already_available') {
          toast.error('You were already logged in');

          router.push('/');
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [router, returnTo]);

  return {
    flow,
    loading,
  };
}
