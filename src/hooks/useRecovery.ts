import {
  RecoveryFlow,
  RecoveryFlowState,
  UpdateRecoveryFlowBody,
  UpdateRecoveryFlowWithLinkMethod,
  UiNodeInputAttributes,
} from '@ory/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ory, handleFlowError } from '../modules/ory';
import { AxiosError } from 'axios';
import { FormState, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';

interface RecoveryContext {
  flow: RecoveryFlow | undefined;
  submit: (values: UpdateRecoveryFlowBody) => void;
  register: UseFormRegister<UpdateRecoveryFlowWithLinkMethod>;
  handleSubmit: UseFormHandleSubmit<UpdateRecoveryFlowWithLinkMethod>;
  formState: FormState<UpdateRecoveryFlowWithLinkMethod>;
}

export function useRecovery(): RecoveryContext {
  const [flow, setFlow] = useState<RecoveryFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;

  const { register, handleSubmit, formState, setError } = useForm<UpdateRecoveryFlowWithLinkMethod>(
    {
      defaultValues: { email: '', method: 'link' },
    }
  );

  useEffect(() => {
    // If the router is not ready yet, or we already have a flow, do nothing.
    if (!router.isReady || flow) {
      return;
    }

    // If ?flow=.. was in the URL, we fetch it
    if (flowId) {
      ory
        .getRecoveryFlow({ id: String(flowId) })
        .then(({ data }) => {
          setFlow(data);
        })
        .catch(handleFlowError(router, 'recovery', setFlow));
      return;
    }

    // Otherwise we initialize it
    ory
      .createBrowserRecoveryFlow()
      .then(({ data }) => {
        setFlow(data);
      })
      .catch(handleFlowError(router, 'recovery', setFlow))
      .catch((err: AxiosError) => {
        // If the previous handler did not catch the error it's most likely a form validation error
        if (err.response?.status === 400) {
          // Yup, it is!
          setFlow(err.response?.data);
          return;
        }
        return Promise.reject(err);
      });
  }, [flowId, router, router.isReady, returnTo, flow]);

  const onSubmit = (values: UpdateRecoveryFlowBody) => {
    const csrfToken = (
      flow?.ui.nodes.filter(
        (node) => (node.attributes as UiNodeInputAttributes).name === 'csrf_token'
      )[0].attributes as UiNodeInputAttributes
    ).value;

    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/recovery?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .updateRecoveryFlow({
            flow: String(flow?.id),
            updateRecoveryFlowBody: { ...values, csrf_token: csrfToken },
          })
          .then(({ data }) => {
            // Form submission was successful, show the message to the user!
            setFlow(data);
          })
          .catch(handleFlowError(router, 'recovery', setFlow))
          .catch((err: AxiosError) => {
            switch (err.response?.status) {
              case 400:
                // Status code 400 implies the form validation had an error
                //setFlow(err.response?.data);
                const newFlow: RecoveryFlow = err.response?.data;
                const emailErr =
                  newFlow && newFlow.state === RecoveryFlowState.ChooseMethod
                    ? newFlow.ui.nodes.filter(
                        (node) => (node.attributes as UiNodeInputAttributes).name === 'email'
                      )[0]?.messages[0]?.text
                    : undefined;
                if (emailErr) {
                  setError('email', { type: 'custom', message: emailErr });
                } else {
                  setFlow(newFlow);
                }
                return;
            }

            throw err;
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
