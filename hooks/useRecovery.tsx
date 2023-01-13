import {
  RecoveryFlow,
  RecoveryFlowState,
  UpdateRecoveryFlowBody,
  UpdateRecoveryFlowWithLinkMethod,
} from '@ory/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleFlowError } from '../modules/ory/errors';
import ory from '../modules/ory/sdk';
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

  const csrfToken =
    flow &&
    flow.ui.nodes.filter((node) => node.attributes.name === 'csrf_token')[0].attributes.value;

  const { register, handleSubmit, formState, setError } = useForm<UpdateRecoveryFlowWithLinkMethod>(
    {
      defaultValues: { csrf_token: csrfToken, email: '', method: 'link' },
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
    values.csrf_token = csrfToken;
    router
      // On submission, add the flow ID to the URL but do not navigate. This prevents the user loosing
      // his data when she/he reloads the page.
      .push(`/recovery?flow=${flow?.id}`, undefined, { shallow: true })
      .then(() =>
        ory
          .updateRecoveryFlow({
            flow: String(flow?.id),
            updateRecoveryFlowBody: values,
          })
          .then(({ data }) => {
            console.log('input values', values);

            // Form submission was successful, show the message to the user!
            setFlow(data);
          })
          .catch(handleFlowError(router, 'recovery', setFlow))
          .catch((err: AxiosError) => {
            console.log('error', err);
            switch (err.response?.status) {
              case 400:
                console.log('validation error flow', err.response?.data);
                // Status code 400 implies the form validation had an error
                //setFlow(err.response?.data);
                const newFlow: RecoveryFlow = err.response?.data;
                const emailErr =
                  newFlow && newFlow.state === RecoveryFlowState.ChooseMethod
                    ? newFlow.ui.nodes.filter((node) => node.attributes.name === 'email')[0]
                        ?.messages[0]?.text
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
