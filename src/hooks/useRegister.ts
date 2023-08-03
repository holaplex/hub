import { RegistrationFlow, UiNodeInputAttributes, ContinueWithVerificationUi, UiText } from '@ory/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { useSession } from './useSession';
import { toast } from 'react-toastify';
import {
  Control,
  FormState,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { uploadFile } from '../modules/upload';

interface LoginResponse {
  redirect_path: string;
}

interface RegistrationForm {
  email: string;
  password: string;
  name: { first: string; last: string };
  file?: File;
}
interface RegisterContext {
  flow: RegistrationFlow | undefined;
  submit: (values: RegistrationForm) => void;
  register: UseFormRegister<RegistrationForm>;
  handleSubmit: UseFormHandleSubmit<RegistrationForm>;
  formState: FormState<RegistrationForm>;
  control: Control<RegistrationForm, any>;
  setValue: UseFormSetValue<RegistrationForm>;
}

export function useRegister(flow: RegistrationFlow | undefined): RegisterContext {
  const router = useRouter();
  const search = useSearchParams();
  const { setSession } = useSession();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setError, control, setValue } =
    useForm<RegistrationForm>();

  const onSubmit = async ({ email, password, name, file }: RegistrationForm): Promise<void> => {
    let response;
    if (!flow) {
      return;
    }

    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      let profileImage;
      if (file) {
        const { url } = await uploadFile(file);
        profileImage = url;
      }

      response = await ory.updateRegistrationFlow({
        flow: flow.id,

        updateRegistrationFlowBody: {
          method: 'password',
          password,
          traits: { email, name, profile_image: profileImage },
          csrf_token: csrfToken,
        },
      });

      setSession(response.data.session);
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes, messages },
          },
        },
      } = err;

      ((messages as UiText[]) || []).forEach((message) => {
        toast(message.text, { type: message.type });
      });

      const passwordErr = extractFlowNode('password')(nodes).messages[0]?.text;
      const emailErr = extractFlowNode('traits.email')(nodes).messages[0]?.text;

      if (passwordErr) {
        setError('password', { message: passwordErr });
      }

      if (emailErr) {
        setError('email', { message: emailErr });
      }
      return;
    }
    const continueWith = response?.data.continue_with?.[0] as ContinueWithVerificationUi;
    let flowId = continueWith?.flow?.id;
    let afterLoginPath;
    if (flowId) {
      afterLoginPath = `/verification?flow=${flowId}&email=${encodeURIComponent(email)}`;
    }
    if (search?.has('return_to')) {
      afterLoginPath = `${afterLoginPath}&return_to=${encodeURIComponent(
        search.get('return_to')!
      )}`;
    }
    router.push(afterLoginPath || '/login');
  };

  return {
    flow,
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
    control,
    setValue,
  };
}
