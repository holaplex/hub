import { useEffect, useState } from 'react';
import { useOry } from './useOry';
import { useRouter, useSearchParams } from 'next/navigation';
import { RecoveryFlow, SettingsFlow } from '@ory/client';
import { toast } from 'react-toastify';
import { defaultTo } from 'ramda';

interface RecoveryFlowContext {
  flow?: SettingsFlow;
  loading: boolean;
}

interface RecoveryCodeFlowProps {
  flowId: string;
}

const defaultUndefined = defaultTo(undefined);

export function useRecoveryPasswordFlow({ flowId }: RecoveryCodeFlowProps): RecoveryFlowContext {
  const [flow, setFlow] = useState<SettingsFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();
  const searchParams = useSearchParams();

  let returnTo = defaultUndefined(searchParams?.get('return_to'));

  useEffect(() => {
    (async () => {
      try {
        const result = await ory.createBrowserSettingsFlow({ returnTo });
        setFlow(result.data);

      } catch (err: any) {
        const errorCode = err.response?.data.error?.id;

        if (errorCode === 'session_already_available') {
          toast.info('You are already logged in');

          router.back();
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [router, ory, returnTo]);

  return {
    flow,
    loading,
  };
}
