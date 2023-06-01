import { useEffect, useState, useCallback } from 'react';
import { useOry } from './useOry';
import { useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { UiNodeInputAttributes, VerificationFlow } from '@ory/kratos-client';
import { toast } from 'react-toastify';
import { extractFlowNode } from '../modules/ory';

const defaultUndefined = defaultTo(undefined);

interface EmailVerifyFlowContext {
  flow?: VerificationFlow;
  loading: boolean;
  updateFlow: () => Promise<void>;
  cooldown: number;
}

interface EmailVerifyFlowProps {
  email: string;
}

export function useEmailVerifyFlow({ email }: EmailVerifyFlowProps): EmailVerifyFlowContext {
  const [flow, setFlow] = useState<VerificationFlow>();
  const [loading, setLoading] = useState<boolean>(false);
  const { ory } = useOry();
  const searchParams = useSearchParams();
  let returnTo = defaultUndefined(searchParams?.get('return_to'));
  const [cooldown, setCooldown] = useState<number>(0);

  useEffect(() => {
    (async () => {
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
        setCooldown(30);
      } catch (err: any) {
        toast.error(err.response?.data.error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [returnTo, email, ory]);

  const updateFlow = useCallback(async () => {
    if (cooldown > 0 || !flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      const { data } = await ory.updateVerificationFlow({
        flow: flow.id,
        updateVerificationFlowBody: { email, csrf_token: csrfToken, method: 'code' },
      });

      setFlow(data);
      setCooldown(30);
    } catch (err: any) {
      toast.error(err.response?.data.error?.message);
    } finally {
      setLoading(false);
    }
  }, [cooldown, flow, ory, email]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cooldown > 0) {
        setCooldown((cooldown) => cooldown - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  return {
    flow,
    loading,
    updateFlow,
    cooldown,
  };
}
