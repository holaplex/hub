import { LoginFlow, UpdateLoginFlowBody } from '@ory/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { LogoutLink } from '../modules/ory';
import { handleFlowError, handleGetFlowError } from '../modules/ory/errors';
import ory from '../modules/ory/sdk';
import { AxiosError } from 'axios';

interface LoginContext {
  flow: LoginFlow | undefined;
  logout: () => void;
  submit: (values: UpdateLoginFlowBody) => Promise<void | undefined>;
  aal: string | string[] | undefined;
  refresh: string | string[] | undefined;
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

  // This might be confusing, but we want to show the user an option
  // to sign out if they are performing two-factor authentication!
  const onLogout = LogoutLink([aal, refresh]);

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
          console.log('setFlow', data);
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
        console.log('setFlow', data);
        setFlow(data);
      })
      .catch(handleFlowError(router, 'login', setFlow));
  }, [flowId, router, router.isReady, aal, refresh, returnTo, flow]);

  const onSubmit = (values: UpdateLoginFlowBody) =>
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
            console.log('flow after login', flow);
            if (flow?.return_to) {
              window.location.href = flow?.return_to;
              return;
            }
            router.push('/');
          })
          .then(() => {})
          .catch(handleFlowError(router, 'login', setFlow))
          .catch((err: AxiosError) => {
            console.log('AxiosError', err);
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              console.log('setFlow', err.response?.data);
              setFlow(err.response?.data);
              return;
            }

            return Promise.reject(err);
          })
      );

  return {
    flow,
    logout: onLogout,
    submit: onSubmit,
    aal,
    refresh,
  };
}
