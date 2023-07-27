import { useEffect, useState } from 'react';
import { useOry } from './useOry';
import { useRouter } from 'next/navigation';
import { RecoveryFlow } from '@ory/client';
import { toast } from 'react-toastify';

interface RecoveryFlowContext {
  flow?: RecoveryFlow;
  loading: boolean;
}

interface RecoveryCodeFlowProps {
  flowId: string;
}

export function useRecoveryCodeFlow({ flowId }: RecoveryCodeFlowProps): RecoveryFlowContext {
  const [flow, setFlow] = useState<RecoveryFlow>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { ory } = useOry();

  useEffect(() => {
    (async () => {
      try {
        const result = await ory.getRecoveryFlow({ id: flowId });

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
  }, [router, ory, flowId]);

  return {
    flow,
    loading,
  };
}
