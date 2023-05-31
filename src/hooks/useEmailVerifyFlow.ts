import { useEffect, useState, useRef, useCallback } from 'react';
import { useOry } from './useOry';
import { useRouter, useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { UiNodeInputAttributes, VerificationFlow } from '@ory/client';
import { toast } from 'react-toastify';
import { extractFlowNode } from '../modules/ory';

const defaultUndefined = defaultTo(undefined);

interface EmailVerifyFlowContext {
  flow?: VerificationFlow;
  loading: boolean;
}

interface EmailVerifyFlowProps {
  email: string;
  code: string;
}

export function useEmailVerifyFlow({ email }: EmailVerifyFlowProps): EmailVerifyFlowContext {
  const [flow, setFlow] = useState<VerificationFlow>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();
  let returnTo = defaultUndefined(searchParams?.get('return_to'));
  const lastUpdate = useRef<number | null>(null);
  const [cooldown, setCooldown] = useState<number>(0);
  const updateFlow = useCallback(async () => {
      if (cooldown != 0) {
      return;
      }
      try {
        const result = await ory.createBrowserVerificationFlow({ returnTo });

        const csrfToken = (
          extractFlowNode('csrf_token')(result.data.ui.nodes).attributes as UiNodeInputAttributes
        ).value;

        const { data } = await ory.updateVerificationFlow({
          flow: result.data.id,
          updateVerificationFlowBody: { email, csrf_token: csrfToken, method: 'code' },
        });

        setFlow(data);
        lastUpdate.current = Date.now();
        setCooldown(30)
      } catch (err: any) {
        toast.error(err.response?.data.error?.message);
      } finally {
      setLoading(false);
    }
  }, [router, ory, returnTo, email]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (cooldown) {
      intervalId = setInterval(() => {
        setCooldown(prev => prev && prev > 1 ? prev - 1 : null);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    }
  }, [cooldown]);
  return {
    flow,
    loading,
    updateFlow,
    cooldown,
  };
}
