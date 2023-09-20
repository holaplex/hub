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
import { ProfileUpdateFlowContext } from './useProfileUpdateFlow';

interface UpdatePasswordForm {
  password: string;
}

interface UpdatePasswordContext {
  submit: (values: UpdatePasswordForm) => Promise<void>;
  register: UseFormRegister<UpdatePasswordForm>;
  handleSubmit: UseFormHandleSubmit<UpdatePasswordForm>;
  formState: FormState<UpdatePasswordForm>;
}

export function useUpdatePassword(
  flowContext: ProfileUpdateFlowContext | undefined
): UpdatePasswordContext {
  const router = useRouter();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setError } = useForm<UpdatePasswordForm>();

  const flow = flowContext?.flow;

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

      toast.success('Password updated successfully');

      router.back();
    } catch (err: any) {
      if (err.response.data?.error?.id === 'session_refresh_required') {
        toast.error(err.response.data.error.reason);

        router.push('/login');
        return;
      }

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
