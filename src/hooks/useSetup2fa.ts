import { SettingsFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import {
  Control,
  FormState,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { useLogout } from './useLogout';

interface TwoFactorAuthenticationSetupFrom {
  totp_code: string;
}

interface TwoFactorAuthenticationSetupContext {
  submit: (values: TwoFactorAuthenticationSetupFrom) => Promise<void>;
  register: UseFormRegister<TwoFactorAuthenticationSetupFrom>;
  handleSubmit: UseFormHandleSubmit<TwoFactorAuthenticationSetupFrom>;
  formState: FormState<TwoFactorAuthenticationSetupFrom>;
  setValue: UseFormSetValue<TwoFactorAuthenticationSetupFrom>;
  control: Control<TwoFactorAuthenticationSetupFrom, any>;
  reset: UseFormReset<TwoFactorAuthenticationSetupFrom>;
}

export function useSetup2fa(flow: SettingsFlow | undefined): TwoFactorAuthenticationSetupContext {
  const router = useRouter();
  const { ory } = useOry();
  const { logout } = useLogout();

  const { register, handleSubmit, formState, setError, setValue, control, reset } =
    useForm<TwoFactorAuthenticationSetupFrom>();

  const onSubmit = async ({ totp_code }: TwoFactorAuthenticationSetupFrom): Promise<void> => {
    if (!flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      await ory.updateSettingsFlow({
        flow: flow.id,
        updateSettingsFlowBody: {
          totp_code,
          csrf_token: csrfToken,
          method: 'totp',
        },
      });

      toast.info('2FA setup complete. Please login again to continue.');

      logout();
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
      const verificationErr = extractFlowNode('totp_code')(nodes).messages[0]?.text;

      if (verificationErr) {
        setError('totp_code', { message: verificationErr });
      }
    }
  };

  return {
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
    setValue,
    control,
    reset,
  };
}
