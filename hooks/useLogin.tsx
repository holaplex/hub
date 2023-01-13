import { LoginFlow, UpdateLoginFlowBody, UpdateLoginFlowWithPasswordMethod } from '@ory/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleFlowError, handleGetFlowError } from '../modules/ory/errors';
import ory from '../modules/ory/sdk';
import { AxiosError } from 'axios';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { useLogout } from './useLogout';

interface LoginContext {
  flow: LoginFlow | undefined;
  logout: () => void;
  submit: (values: UpdateLoginFlowBody) => Promise<void | undefined>;
  aal: string | string[] | undefined;
  refresh: string | string[] | undefined;
  register: UseFormRegister<UpdateLoginFlowWithPasswordMethod>;
  handleSubmit: UseFormHandleSubmit<UpdateLoginFlowWithPasswordMethod>;
  formState: FormState<UpdateLoginFlowWithPasswordMethod>;
}

export function useLogin(): LoginContext {
  const [flow, setFlow] = useState<LoginFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
  const {
    return_to: returnTo,
    flow: flowId,
    // Refresh means we want to refresh the session. This is needed, for example, when we want to update the password
    // of a user.
    refresh,
    // AAL = Authorization Assurance Level. This implies that we want to upgrade the AAL, meaning that we want
    // to perform two-factor authentication/verification.
    aal,
  } = router.query;

  const csrfToken =
    flow &&
    flow.ui.nodes.filter((node) => node.attributes.name === 'csrf_token')[0].attributes.value;

  const { register, handleSubmit, formState, setError } =
    useForm<UpdateLoginFlowWithPasswordMethod>({
      defaultValues: { csrf_token: csrfToken, identifier: '', password: '', method: 'password' },
    });

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const { logout } = useLogout([aal, refresh]);

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
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
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow]);

  const onSubmit = async (values: UpdateLoginFlowBody) => {
    values.csrf_token = csrfToken;
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/login?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .updateLoginFlow({
            flow: String(flow?.id),
            updateLoginFlowBody: values,
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
                ? newFlow.ui.nodes.filter((node) => node.attributes.name === 'identifier')[0]
                    ?.messages[0]?.text
                : undefined;

              const passwordErr = newFlow
                ? newFlow.ui.nodes.filter((node) => node.attributes.name === 'password')[0]
                    ?.messages[0]?.text
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
          })
      );
  };

  const mainUI = flow ? flow.ui.messages && flow.ui.messages[0]?.text : undefined;

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
