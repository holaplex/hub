import { useEffect, useState } from 'react';
import { ory } from '../modules/ory';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { RecoveryFlow } from '@ory/client';
import { toast } from 'react-toastify';

const defaultUndefined = defaultTo(undefined);

interface RecoveryFlowContext {
  flow?: RecoveryFlow;
  loading: boolean;
}

export function useRecoveryFlow(): RecoveryFlowContext {
  const [flow, setFlow] = useState<RecoveryFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const searchParams = useSearchParams();

  let returnTo = defaultUndefined(searchParams.get('return_to'));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ory.createBrowserRecoveryFlow({ returnTo });

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
