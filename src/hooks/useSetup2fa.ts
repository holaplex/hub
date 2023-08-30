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
import { useSession } from './useSession';

interface TwoFactorAuthenticationSetupFrom {
  verification: string;
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
  const { session, setSession } = useSession();
  const router = useRouter();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setError, setValue, control, reset } =
    useForm<TwoFactorAuthenticationSetupFrom>();

  const onSubmit = async ({ verification }: TwoFactorAuthenticationSetupFrom): Promise<void> => {
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
          totp_code: verification,
          csrf_token: csrfToken,
          method: 'totp',
        },
      });

      try {
        const sessionResponse = await ory.toSession();

        setSession(sessionResponse.data);
      } catch (e: any) {
        toast.error('Failed to refresh session.');
        return;
      }

      toast.info('2FA setup complete.');

      router.push(`/profile/edit`);
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes },
          },
        },
      } = err;
      const verificationErr = extractFlowNode('verification')(nodes).messages[0]?.text;

      if (verificationErr) {
        setError('verification', { message: verificationErr });
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
