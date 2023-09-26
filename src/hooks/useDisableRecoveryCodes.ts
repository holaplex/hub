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
import { ProfileUpdateFlowContext } from './useProfileUpdateFlow';

interface DisableRecoveryCodesForm {}

interface ConfirmRecoveryCodeContext {
  submit: (values: DisableRecoveryCodesForm) => Promise<void>;
  register: UseFormRegister<DisableRecoveryCodesForm>;
  handleSubmit: UseFormHandleSubmit<DisableRecoveryCodesForm>;
  formState: FormState<DisableRecoveryCodesForm>;
  setValue: UseFormSetValue<DisableRecoveryCodesForm>;
  control: Control<DisableRecoveryCodesForm, any>;
  reset: UseFormReset<DisableRecoveryCodesForm>;
}

export function useDisableRecoveryCodes(
  flowContext: ProfileUpdateFlowContext | undefined
): ConfirmRecoveryCodeContext {
  const router = useRouter();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setValue, control, reset } =
    useForm<DisableRecoveryCodesForm>();

  const flow = flowContext?.flow;

  const onSubmit = async (): Promise<void> => {
    if (!flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      const response = await ory.updateSettingsFlow({
        flow: flow.id,
        updateSettingsFlowBody: {
          lookup_secret_disable: true,
          csrf_token: csrfToken,
          method: 'lookup',
        },
      });

      flowContext.setFlow(response.data);

      toast.success('2FA recovery codes disabled.');
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
      const lookupSecretRegenerateErr =
        extractFlowNode('lookup_secret_disable')(nodes).messages[0]?.text;

      toast.error(lookupSecretRegenerateErr);
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
