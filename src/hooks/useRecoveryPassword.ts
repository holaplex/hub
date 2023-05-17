import { RecoveryFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface RecoveryForm {
  password: string;
}

interface RecoveryCodeContext {
  submit: (values: RecoveryForm) => Promise<void>;
  register: UseFormRegister<RecoveryForm>;
  handleSubmit: UseFormHandleSubmit<RecoveryForm>;
  formState: FormState<RecoveryForm>;
}

export function useRecoveryPassword(flow: RecoveryFlow | undefined): RecoveryCodeContext {
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

      const { data } = await ory.updateSettingsFlow({
        flow: flow.id,
        updateSettingsFlowBody: { ...values, csrf_token: csrfToken, method: 'code' },
      });

      router.push('/login');
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes },
          },
        },
      } = err;
      const passwordErr = extractFlowNode('code')(nodes).messages[0]?.text;

      if (passwordErr) {
        setError('password', { message: passwordErr });
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
