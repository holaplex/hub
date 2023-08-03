import { UiNodeInputAttributes, VerificationFlow } from '@ory/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { extractFlowNode } from '../modules/ory';
import { useOry } from './useOry';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { toast } from 'react-toastify';

interface EmailVerifyForm {
  code: string;
}

interface LoginResponse {
  redirect_path: string;
}

interface EmailVerifyContext {
  submit: (values: EmailVerifyForm) => Promise<void>;
  register: UseFormRegister<EmailVerifyForm>;
  handleSubmit: UseFormHandleSubmit<EmailVerifyForm>;
  formState: FormState<EmailVerifyForm>;
}

interface EmailVerifyProps {
  flow: VerificationFlow | undefined;
}

export function useEmailVerify({ flow }: EmailVerifyProps): EmailVerifyContext {
  const router = useRouter();
  const { ory } = useOry();
  const search = useSearchParams();

  const { register, handleSubmit, formState, setError } = useForm<EmailVerifyForm>();

  const onSubmit = async ({ code }: EmailVerifyForm): Promise<void> => {
    if (!flow) {
      return;
    }
    try {
      const csrfToken = (
        extractFlowNode('csrf_token')(flow.ui.nodes).attributes as UiNodeInputAttributes
      ).value;

      const response = await ory.updateVerificationFlow({
        flow: flow.id,
        updateVerificationFlowBody: {
          code: code.trim(),
          csrf_token: csrfToken,
          method: 'code',
        },
      });

      const [message] = response?.data.ui.messages ?? [];

      if (message?.type === 'success') {
        toast.success(message.text);
      } else {
        toast.error(message.text);
        return;
      }

      try {
        if (search?.has('return_to')) {
          router.push(search.get('return_to') as string);
          return;
        } else {
          router.push('/organizations');
        }

        const response = await fetch('/browser/login', {
          method: 'POST',
          credentials: 'same-origin',
        });

        const json: LoginResponse = await response.json();
        router.push(json.redirect_path);
      } catch (e: any) {
        toast.warn(
          'Unable to forward you to an organization. Please select or create an organization.'
        );

        router.push('/organizations');
      }
    } catch (err: any) {
      const {
        response: {
          data: {
            ui: { nodes },
          },
        },
      } = err;
      const codeErr = extractFlowNode('code')(nodes).messages[0]?.text;

      if (codeErr) {
        setError('code', { message: codeErr });
      }
    }
  };

  return {
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
  };
}
