import { LoginFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { toast } from 'react-toastify';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface LoginForm {
  identifier: string;
  password: string;
}

interface LoginResponse {
  redirect_path: string;
}

interface LoginContext {
  submit: (values: LoginForm) => Promise<void>;
  register: UseFormRegister<LoginForm>;
  handleSubmit: UseFormHandleSubmit<LoginForm>;
  formState: FormState<LoginForm>;
}

export function useLogin(flow: LoginFlow | undefined): LoginContext {
  const router = useRouter();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setError } = useForm<LoginForm>();

  const onSubmit = async (values: LoginForm): Promise<void> => {
    if (!flow) {
      return;
    }

    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      await ory.updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody: {
          csrf_token: csrfToken,
          method: 'password',
          ...values,
        },
      });
    } catch (err: any) {
      const message = err.response.data.ui.messages[0].text;
      toast.error(message);

      return;
    }

    try {
      const response = await fetch('/browser/login', {
        method: 'POST',
        credentials: 'same-origin',
      });

      const json: LoginResponse = await response.json();

      router.push(json.redirect_path);
    } catch(e: any) {
      toast.error(
        'Unable to forward you to an organization. Please select or create an organization.'
      );

      router.push('/organizations');
    }
  };

  return {
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
  };
}
