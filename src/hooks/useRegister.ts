import { RegistrationFlow, UiNodeInputAttributes } from '@ory/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { toast } from 'react-toastify';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

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

      await ory.updateRegistrationFlow({
        flow: flow.id,
        updateRegistrationFlowBody: {
          method: 'password',
          password,
          traits: { email, name },
          csrf_token: csrfToken,
        },
      });

      router.push(
        `/login${search.has('return_to') ? `?return_to=${search.get('return_to')}` : ''}`
      );
      toast.success('Welcome to the Hub. Please sign to continue.');
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes },
          },
        },
      } = err;
      const passwordErr = extractFlowNode('password')(nodes).messages[0]?.text;
      const emailErr = extractFlowNode('traits.email')(nodes).messages[0]?.text;

      if (passwordErr) {
        setError('password', { message: passwordErr });
      }

      if (emailErr) {
        setError('email', { message: emailErr });
      }
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
