import { UiNodeInputAttributes } from '@ory/client';
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

interface Recover2faRecoveryForm {}

interface ProfileUpdateContext {
  submit: (values: Recover2faRecoveryForm) => Promise<void>;
  register: UseFormRegister<Recover2faRecoveryForm>;
  handleSubmit: UseFormHandleSubmit<Recover2faRecoveryForm>;
  formState: FormState<Recover2faRecoveryForm>;
  setValue: UseFormSetValue<Recover2faRecoveryForm>;
  control: Control<Recover2faRecoveryForm, any>;
  reset: UseFormReset<Recover2faRecoveryForm>;
}

export function use2faRecovery(
  flowContext: ProfileUpdateFlowContext | undefined
): ProfileUpdateContext {
  const router = useRouter();
  const { ory } = useOry();

  const flow = flowContext?.flow;
  const { register, handleSubmit, formState, setValue, control, reset } =
    useForm<Recover2faRecoveryForm>();

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
          lookup_secret_regenerate: true,
          csrf_token: csrfToken,
          method: 'lookup',
        },
      });

      flowContext.setFlow(response.data);

      toast.success('2FA recovery codes regenerated');
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

      const lookupSecretRegenerateErr = extractFlowNode('lookup_secret_regenerate')(nodes)
        .messages[0]?.text;

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
