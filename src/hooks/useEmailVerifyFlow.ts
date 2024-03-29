import { useEffect, useState, useCallback } from 'react';
import { useOry } from './useOry';
import { useSearchParams } from 'next/navigation';
import { defaultTo } from 'ramda';
import { UiNodeInputAttributes, VerificationFlow } from '@ory/client';
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
        let flowId;
        let res;
        if (searchParams?.has('flow')) {
          flowId = searchParams.get('flow')!;
          res = await ory.getVerificationFlow({ id: flowId });

          setFlow(res.data);
        } else {
          res = await ory.createBrowserVerificationFlow({ returnTo });
          flowId = res.data.id;
          const csrfToken = (
            extractFlowNode('csrf_token')(res.data.ui.nodes).attributes as UiNodeInputAttributes
          ).value;

          res = await ory.updateVerificationFlow({
            flow: flowId,
            updateVerificationFlowBody: { email, csrf_token: csrfToken, method: 'code' },
          });

          setFlow(res.data);
        }
        const [message] = res.data.ui.messages ?? [];

        if (message?.type === 'info') {
          if (message?.id === 1080003) {
            toast.info('Verification email sent');
          } else {
            toast.info(message.text);
          }
        } else {
          toast.error(message.text);
        }

        setLoading(false);
        setCooldown(30);
      } catch (err: any) {
        toast.error(err.response?.data.error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [returnTo, email, searchParams, ory]);

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
      toast.info('A new verification code was sent to your email');
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
