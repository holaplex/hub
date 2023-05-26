import { SettingsFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import {
  FormState,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form';
import { toast } from 'react-toastify';

interface RecoveryForm {
  password: string;
  confirmPassword: string;
}

interface RecoveryCodeContext {
  submit: (values: RecoveryForm) => Promise<void>;
  register: UseFormRegister<RecoveryForm>;
  handleSubmit: UseFormHandleSubmit<RecoveryForm>;
  formState: FormState<RecoveryForm>;
  watch: UseFormWatch<RecoveryForm>;
}

export function useRecoveryPassword(flow: SettingsFlow | undefined): RecoveryCodeContext {
  const router = useRouter();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setError, watch } = useForm<RecoveryForm>();

  const onSubmit = async (values: RecoveryForm): Promise<void> => {
    if (!flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      const result = await ory.updateSettingsFlow({
        flow: flow.id,
        updateSettingsFlowBody: {
          password: values.password,
          csrf_token: csrfToken,
          method: 'password',
        },
      });
      toast.info('Password updated successfully');

      router.push('/projects');
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
    watch,
  };
}
