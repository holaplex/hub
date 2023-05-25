import { useEffect, useState } from 'react';
import { useOry } from './useOry';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { RecoveryFlow, SettingsFlow } from '@ory/client';
import { toast } from 'react-toastify';

const defaultUndefined = defaultTo(undefined);

interface UpdatePasswordFlowContext {
  flow?: SettingsFlow;
  loading: boolean;
}

export function useUpdatePasswordFlow(): UpdatePasswordFlowContext {
  const [flow, setFlow] = useState<SettingsFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();

  let returnTo = defaultUndefined(searchParams?.get('return_to'));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ory.createBrowserSettingsFlow({ returnTo });
        setFlow(data);
      } catch (err: any) {
        const errorCode = err.response?.data.error?.id;
        toast.error(`Error: ${errorCode}`);
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
