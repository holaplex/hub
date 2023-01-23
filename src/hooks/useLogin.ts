import { LoginFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { ory, extractFlowNode } from '../modules/ory';
import { toast } from 'react-toastify';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
}

interface LoginContext {
  submit: (values: LoginForm) => Promise<void>;
  register: UseFormRegister<LoginForm>;
  handleSubmit: UseFormHandleSubmit<LoginForm>;
  formState: FormState<LoginForm>;
}

export function useLogin(flow: LoginFlow | undefined): LoginContext {
  const router = useRouter();

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
          identifier: 'email',
          method: 'password',
          ...values,
        },
      });

      router.push('/organizations');
    } catch (err: any) {
      const message = err.response.data.ui.messages[0].text;
      toast.error(message);
    }
  };

  return {
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
  };
}
