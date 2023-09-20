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

interface TwoFactorConfirmForm {
  totp_code: string;
}

interface LoginResponse {
  redirect_path: string;
}

interface Confirm2faContext {
  submit: (values: TwoFactorConfirmForm) => Promise<void>;
  register: UseFormRegister<TwoFactorConfirmForm>;
  handleSubmit: UseFormHandleSubmit<TwoFactorConfirmForm>;
  formState: FormState<TwoFactorConfirmForm>;
}

export function useConfirm2fa(flow: LoginFlow | undefined): Confirm2faContext {
  const router = useRouter();
  const { setSession } = useSession();
  const search = useSearchParams();
  const { ory } = useOry();

  const { register, handleSubmit, formState } = useForm<TwoFactorConfirmForm>();

  const onSubmit = async ({ totp_code }: TwoFactorConfirmForm): Promise<void> => {
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
          method: SessionAuthenticationMethodMethodEnum.Totp,
          totp_code,
        },
      });

      setSession(response.data.session);
    } catch (err: any) {
      if (err.response.data?.error?.id === 'session_refresh_required') {
        toast.error(err.response.data.error.reason);

        router.push('/login');
        return;
      }

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
