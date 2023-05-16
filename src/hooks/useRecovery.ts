import { RecoveryFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface RecoveryForm {
  email: string;
}

interface RecoveryContext {
  submit: (values: RecoveryForm) => Promise<void>;
  register: UseFormRegister<RecoveryForm>;
  handleSubmit: UseFormHandleSubmit<RecoveryForm>;
  formState: FormState<RecoveryForm>;
}

export function useRecovery(flow: RecoveryFlow | undefined): RecoveryContext {
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
        updateRecoveryFlowBody: { ...values, csrf_token: csrfToken, method: 'code' },
      });

      router.push('/password/reset?flow=' + data.id + '&email=' + values.email + '&method=code');
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes },
          },
        },
      } = err;
      const emailErr = extractFlowNode('email')(nodes).messages[0]?.text;

      if (emailErr) {
        setError('email', { message: emailErr });
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
