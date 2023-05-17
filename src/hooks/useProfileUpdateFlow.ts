import { useEffect, useState } from 'react';
import { useOry } from './useOry';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { SettingsFlow } from '@ory/client';

const defaultUndefined = defaultTo(undefined);

interface ProfileUpdateFlowContext {
  flow?: SettingsFlow;
  loading: boolean;
}

export function useProfileUpdateFlow(): ProfileUpdateFlowContext {
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
