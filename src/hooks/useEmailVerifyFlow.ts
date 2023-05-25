import { useEffect, useState } from 'react';
import { useOry } from './useOry';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { VerificationFlow } from '@ory/client';
import { toast } from 'react-toastify';

const defaultUndefined = defaultTo(undefined);

interface EmailVerifyFlowContext {
  flow?: VerificationFlow;
  loading: boolean;
}

export function useEmailVerifyFlow(): EmailVerifyFlowContext {
  const [flow, setFlow] = useState<VerificationFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();

  let returnTo = defaultUndefined(searchParams?.get('return_to'));

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ory.createBrowserVerificationFlow({ returnTo });
        setFlow(data);
      } catch (err: any) {
        toast.error(err.response?.data.error?.message);
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
