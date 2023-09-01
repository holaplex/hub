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
import { uploadFile } from '../modules/upload';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { GetUser } from './../queries/user.graphql';
import { useSession } from './useSession';
import { useProfileUpdateFlow, ProfileUpdateFlowContext } from './useProfileUpdateFlow';
import { useLogout } from './useLogout';

interface Unlink2faForm {}

interface ProfileUpdateContext {
  submit: (values: Unlink2faForm) => Promise<void>;
  register: UseFormRegister<Unlink2faForm>;
  handleSubmit: UseFormHandleSubmit<Unlink2faForm>;
  formState: FormState<Unlink2faForm>;
  setValue: UseFormSetValue<Unlink2faForm>;
  control: Control<Unlink2faForm, any>;
  reset: UseFormReset<Unlink2faForm>;
  flowContext: ProfileUpdateFlowContext;
}

export function useProfileUnlink2fa(): ProfileUpdateContext {
  const flowContext = useProfileUpdateFlow();
  const router = useRouter();
  const { ory } = useOry();
  const { setSession } = useSession();
  const { logout } = useLogout();
  const flow = flowContext.flow;

  const { register, handleSubmit, formState, setError, setValue, control, reset } =
    useForm<Unlink2faForm>();

  const onSubmit = async ({}: Unlink2faForm): Promise<void> => {
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
          totp_unlink: true,
          csrf_token: csrfToken,
          method: 'unlink_2fa',
        },
      });

      toast.success(
        '2FA was unlinked successfully. Remember to remove the authenticator app. You must log back in to continue.'
      );

      logout();
    } catch (err: any) {
      console.error(err);
      const message = err.response.data.ui.messages[0].text;
      toast.error(message);
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
    flowContext,
  };
}
