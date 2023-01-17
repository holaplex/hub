import {
  RegistrationFlow,
  UpdateRegistrationFlowBody,
  UiNodeInputAttributes,
} from '@ory/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleFlowError } from '../modules/ory/errors';
import { ory } from '../modules/ory';
import { AxiosError } from 'axios';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface RegistrationForm {
  email: string;
  password: string;
}
interface RegisterContext {
  flow: RegistrationFlow | undefined;
  submit: (values: RegistrationForm) => void;
  register: UseFormRegister<RegistrationForm>;
  handleSubmit: UseFormHandleSubmit<RegistrationForm>;
  formState: FormState<RegistrationForm>;
}

export function useRegister(): RegisterContext {
  const router = useRouter();

  // The "flow" represents a registration process and contains
  // information about the form we need to render (e.g. username + password)
  const [flow, setFlow] = useState<RegistrationFlow>();

  // Get ?flow=... from the URL
  const { flow: flowId, return_to: returnTo } = router.query;

  const { register, handleSubmit, formState, setError } = useForm<RegistrationForm>();

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

  const onSubmit = (values: RegistrationForm) => {
    const csrfToken = (
      flow?.ui.nodes.filter(
        (node) => (node.attributes as UiNodeInputAttributes).name === 'csrf_token'
      )[0].attributes as UiNodeInputAttributes
    ).value;
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/registration?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .updateRegistrationFlow({
            flow: String(flow?.id),
            updateRegistrationFlowBody: {
              method: 'password',
              password: values.password,
              traits: { email: values.email },
              csrf_token: csrfToken,
            } as UpdateRegistrationFlowBody,
          })
          .then(({ data }) => {
            // If we ended up here, it means we are successfully signed up!
            //
            // You can do cool stuff here, like having access to the identity which just signed up:

            // For now however we just want to redirect home!
            return router.push(flow?.return_to || '/').then(() => {});
          })
          .catch(handleFlowError(router, 'registration', setFlow))
          .catch((err: AxiosError) => {
            // If the previous handler did not catch the error it's most likely a form validation error
            if (err.response?.status === 400) {
              // Yup, it is!
              //setFlow(err.response?.data);
              const newFlow: RegistrationFlow = err.response?.data;

              const emailErr = newFlow
                ? newFlow.ui.nodes.filter(
                    (node) => (node.attributes as UiNodeInputAttributes).name === 'traits.email'
                  )[0]?.messages[0]?.text
                : undefined;

              const passwordErr = newFlow
                ? newFlow.ui.nodes.filter(
                    (node) => (node.attributes as UiNodeInputAttributes).name === 'password'
                  )[0]?.messages[0]?.text
                : undefined;

              if (emailErr) {
                setError('email', { type: 'custom', message: emailErr });
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

  return {
    flow,
    submit: onSubmit,
    register,
    handleSubmit,
    formState,
  };
}
