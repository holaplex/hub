import { RegistrationFlow, UiNodeInputAttributes, UiText } from '@ory/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { useSession } from './useSession';
import { toast } from 'react-toastify';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface LoginResponse {
  redirect_path: string;
}

interface RegistrationForm {
  email: string;
  password: string;
  name: { first: string; last: string };
}
interface RegisterContext {
  flow: RegistrationFlow | undefined;
  submit: (values: RegistrationForm) => void;
  register: UseFormRegister<RegistrationForm>;
  handleSubmit: UseFormHandleSubmit<RegistrationForm>;
  formState: FormState<RegistrationForm>;
}

export function useRegister(flow: RegistrationFlow | undefined): RegisterContext {
  const router = useRouter();
  const search = useSearchParams();
  const { setSession } = useSession();
  const { ory } = useOry();

  const { register, handleSubmit, formState, setError } = useForm<RegistrationForm>();

  const onSubmit = async ({ email, password, name }: RegistrationForm): Promise<void> => {
    if (!flow) {
      return;
    }

    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      const response = await ory.updateRegistrationFlow({
        flow: flow.id,
        updateRegistrationFlowBody: {
          method: 'password',
          password,
          traits: { email, name },
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
    flow,
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
  };
}
