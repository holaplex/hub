import { RegistrationFlow, UpdateRegistrationFlowBody } from '@ory/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleFlowError } from '../modules/ory/errors';
import ory from '../modules/ory/sdk';
import { AxiosError } from 'axios';

interface RegisterContext {
  flow: RegistrationFlow | undefined;
  csrfToken: string | undefined;
  submit: (values: UpdateRegistrationFlowBody) => Promise<void | undefined>;
  messages: {
    mainUI: string | undefined;
    error: {
      email: string | undefined;
      password: string | undefined;
    };
  };
}

function getCsrfToken(flow: RegistrationFlow): string {
  return flow.ui.nodes.filter((node) => node.attributes.name === 'csrf_token')[0].attributes.value;
}

export function useRegister(): RegisterContext {
  const router = useRouter();

  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<RegistrationFlow>();

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query;

  // In this effect we either initiate a new registration flow, or we fetch an existing registration flow.
  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getRegistrationFlow({ id: String(flowId) })
        .then(({ data }) => {
          // We received the flow - let's use its data and render the form!
          setFlow(data);
        })
        .catch(handleFlowError(router, 'registration', setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .createBrowserRegistrationFlow({
        returnTo: returnTo ? String(returnTo) : undefined,
      })
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, 'registration', setFlow));
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: UpdateRegistrationFlowBody) =>
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/registration?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .updateRegistrationFlow({
            flow: String(flow?.id),
            updateRegistrationFlowBody: values,
          })
          .then(({ data }) => {
            console.log('input values', values);
            // If we ended up here, it means we are successfully signed up!
            //
            // You can do cool stuff here, like having access to the identity which just signed up:
            console.log('This is the user session: ', data, data.identity);

            // For now however we just want to redirect home!
            return router.push(flow?.return_to || '/').then(() => {});
          })
          .catch(handleFlowError(router, 'registration', setFlow))
          .catch((err: AxiosError) => {
            console.log('input values', values);
            console.log('Register submit error', err);

            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              console.log('Validation error flow', err.response?.data);

              // Yup, it is!
              setFlow(err.response?.data);
              return;
            }

            return Promise.reject(err);
          })
      );

  const mainUI = flow ? flow.ui.messages && flow.ui.messages[0]?.text : undefined;

  const emailErr = flow
    ? flow.ui.nodes.filter((node) => node.attributes.name === 'traits.email')[0]?.messages[0]?.text
    : undefined;

  const passwordErr = flow
    ? flow.ui.nodes.filter((node) => node.attributes.name === 'password')[0]?.messages[0]?.text
    : undefined;

  return {
    flow,
    csrfToken: flow && getCsrfToken(flow),
    submit: onSubmit,
    messages: {
      mainUI,
      error: {
        email: emailErr,
        password: passwordErr,
      },
    },
  };
}
