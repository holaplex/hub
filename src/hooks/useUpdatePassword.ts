import {
  RecoveryFlow,
  SettingsFlow,
  UiNodeInputAttributes,
  UpdateSettingsFlowBody,
} from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { toast } from 'react-toastify';

interface UpdatePasswordForm {
  password: string;
}

interface UpdatePasswordContext {
  submit: (values: UpdatePasswordForm) => Promise<void>;
  register: UseFormRegister<UpdatePasswordForm>;
  handleSubmit: UseFormHandleSubmit<UpdatePasswordForm>;
  formState: FormState<UpdatePasswordForm>;
}

export function useUpdatePassword(flow: SettingsFlow | undefined): UpdatePasswordContext {
  const router = useRouter();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setError } = useForm<UpdatePasswordForm>();

  const onSubmit = async (values: UpdatePasswordForm): Promise<void> => {
    if (!flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      const { data } = await ory.updateSettingsFlow({
        flow: flow.id,
        updateSettingsFlowBody: { ...values, csrf_token: csrfToken, method: 'password' },
      });

      toast.info('Password updated successfully');

      router.back();
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
