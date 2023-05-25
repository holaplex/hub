import { RecoveryFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { toast } from 'react-toastify';

interface RecoveryForm {
  code: string;
}

interface RecoveryCodeContext {
  submit: (values: RecoveryForm) => Promise<void>;
  register: UseFormRegister<RecoveryForm>;
  handleSubmit: UseFormHandleSubmit<RecoveryForm>;
  formState: FormState<RecoveryForm>;
}

interface RecoveryCodeProps {
  flow: RecoveryFlow | undefined;
}

export function useRecoveryCode({ flow }: RecoveryCodeProps): RecoveryCodeContext {
  const router = useRouter();
  const { ory } = useOry();
  const { register, handleSubmit, formState, setError } = useForm<RecoveryForm>();

  const onSubmit = async (values: RecoveryForm): Promise<void> => {
    if (!flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      const { data } = await ory.updateRecoveryFlow({
        flow: flow.id,
        updateRecoveryFlowBody: { code: values.code.trim(), csrf_token: csrfToken, method: 'code' },
      });

      if (data.ui != undefined ) {
        const codeErr = data?.ui?.messages?.[0]?.text;
        if (codeErr) {
          setError('code', { message: codeErr });
          toast.error(codeErr);
        }
      }
    } catch (err: any) {
      if (err?.response?.status === 422) {
        console.info(err);
        const redirectUrl = err?.response?.data?.redirect_browser_to;
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          console.error('No redirect URL found in error response');
        }
      } else {
        console.error(err);
      }
    }
  };

  return {
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
  };
}
