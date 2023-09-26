import {
  LoginFlow,
  SessionAuthenticationMethodMethodEnum,
  UiNodeInputAttributes,
} from '@ory/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { toast } from 'react-toastify';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useSession } from './useSession';

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
  const { setSession } = useSession();
  const search = useSearchParams();
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

      const response = await ory.updateLoginFlow({
        flow: flow.id,
        updateLoginFlowBody: {
          csrf_token: csrfToken,
          method: SessionAuthenticationMethodMethodEnum.Password,
          ...values,
        },
      });

      try {
        await ory.toSession();
      } catch (err: any) {
        if (err.response.data.error.id === 'session_aal2_required') {
          router.push(
            `/login/2fa${search?.has('return_to') ? `?return_to=${search.get('return_to')}` : ''}`
          );
          return;
        }
      }

      setSession(response.data.session);
    } catch (err: any) {
      const message = err.response.data.ui.messages[0].text;
      toast.error(message);

      return;
    }

    if (search?.has('return_to')) {
      router.push(search.get('return_to') as string);
      return;
    }

    try {
      const response = await fetch('/browser/login', {
        method: 'POST',
        credentials: 'same-origin',
      });

      const json: LoginResponse = await response.json();

      router.push(json.redirect_path);
    } catch (e: any) {
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
