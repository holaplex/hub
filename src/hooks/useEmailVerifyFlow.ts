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

interface EmailVerifyFlowProps {
  flowId: string;
}

export function useEmailVerifyFlow({ flowId }: EmailVerifyFlowProps): EmailVerifyFlowContext {
  const [flow, setFlow] = useState<VerificationFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await ory.getVerificationFlow({ id: flowId });
        setFlow(data);
      } catch (err: any) {
        toast.error(err.response?.data.error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [router, ory, flowId]);

  return {
    flow,
    loading,
  };
}
