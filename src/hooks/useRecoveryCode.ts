import { RecoveryFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

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
  email: string;
}

export function useRecoveryCode({ flow, email }: RecoveryCodeProps): RecoveryCodeContext {
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
        updateRecoveryFlowBody: { ...values, email, csrf_token: csrfToken, method: 'code' },
      });

      router.push('/recovery/reset?flow=' + data.id + '&email=' + email);
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes },
          },
        },
      } = err;
      const codeErr = extractFlowNode('code')(nodes).messages[0]?.text;

      if (codeErr) {
        setError('code', { message: codeErr });
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
