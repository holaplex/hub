import { useEffect, useState } from 'react';
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
}

export function useEmailVerifyFlow({ email }: EmailVerifyFlowProps): EmailVerifyFlowContext {
  const [flow, setFlow] = useState<VerificationFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  const searchParams = useSearchParams();
  let returnTo = defaultUndefined(searchParams?.get('return_to'));
  useEffect(() => {
    (async () => {
      try {
        const result = await ory.createBrowserVerificationFlow({ returnTo });

        const csrfToken = (
          extractFlowNode('csrf_token')(result.data.ui.nodes).attributes as UiNodeInputAttributes
        ).value;

        const { data } = await ory.updateRecoveryFlow({
          flow: result.data.id,
          updateRecoveryFlowBody: { email, csrf_token: csrfToken, method: 'code' },
        });

        setFlow(data);
      } catch (err: any) {
        toast.error(err.response?.data.error?.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [router, ory, returnTo, email]);

  return {
    flow,
    loading,
  };
}
