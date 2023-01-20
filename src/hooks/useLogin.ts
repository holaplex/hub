import {
  LoginFlow,
  UpdateLoginFlowBody,
  UpdateLoginFlowWithPasswordMethod,
  UiNodeInputAttributes,
} from '@ory/client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ory, handleFlowError, handleGetFlowError } from '../modules/ory';
import { AxiosError } from 'axios';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useLogout } from './useLogout';

interface LoginContext {
  flow: LoginFlow | undefined;
  logout: () => void;
  submit: (values: UpdateLoginFlowBody) => Promise<void | undefined>;
  aal: string | null;
  refresh: string | null;
  register: UseFormRegister<UpdateLoginFlowWithPasswordMethod>;
  handleSubmit: UseFormHandleSubmit<UpdateLoginFlowWithPasswordMethod>;
  formState: FormState<UpdateLoginFlowWithPasswordMethod>;
}

export function useLogin(): LoginContext {
  const [flow, setFlow] = useState<LoginFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = searchParams.get('return_to');
  const flowId = searchParams.get('flow');
  const refresh = searchParams.get('refresh');
  const aal = searchParams.get('all');

  const { register, handleSubmit, formState, setError } =
    useForm<UpdateLoginFlowWithPasswordMethod>({
      defaultValues: { identifier: '', password: '', method: 'password' },
    });

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const { logout } = useLogout();

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getLoginFlow({ id: String(flowId) })
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleGetFlowError(router, 'login', setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .createBrowserLoginFlow({
        refresh: Boolean(refresh),
        aal: aal ? String(aal) : undefined,
        returnTo: returnTo ? String(returnTo) : undefined,
      })
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, 'login', setFlow));
  }, [flowId, router, aal, refresh, returnTo, flow]);

  const onSubmit = async (values: UpdateLoginFlowBody) => {
    const csrfToken = (
      flow?.ui.nodes.filter(
        (node) => (node.attributes as UiNodeInputAttributes).name === 'csrf_token'
      )[0].attributes as UiNodeInputAttributes
    ).value;

    router.replace(`/login?flow=${flow?.id}`);
    ory
      .updateLoginFlow({
        flow: String(flow?.id),
        updateLoginFlowBody: { ...values, csrf_token: csrfToken },
      })
      // We logged in successfully! Let's bring the user home.
      .then(() => {
        if (flow?.return_to) {
          window.location.href = flow?.return_to;
          return;
        }
        router.push('/');
      })
      .then(() => {})
      .catch(handleFlowError(router, 'login', setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          const newFlow: LoginFlow = err.response?.data;

          const emailErr = newFlow
            ? newFlow.ui.nodes.filter(
                (node) => (node.attributes as UiNodeInputAttributes).name === 'identifier'
              )[0]?.messages[0]?.text
            : undefined;

          const passwordErr = newFlow
            ? newFlow.ui.nodes.filter(
                (node) => (node.attributes as UiNodeInputAttributes).name === 'password'
              )[0]?.messages[0]?.text
            : undefined;

          if (emailErr) {
            setError('identifier', { type: 'custom', message: emailErr });
          } else if (passwordErr) {
            setError('password', { type: 'custom', message: passwordErr });
          } else {
            setFlow(newFlow);
          }
          return;
        }

        return Promise.reject(err);
      });
  };

  return {
    flow,
    logout,
    submit: onSubmit,
    aal,
    refresh,
    register,
    handleSubmit,
    formState,
  };
}
