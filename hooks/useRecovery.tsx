import { RecoveryFlow, RecoveryFlowState, UpdateRecoveryFlowBody } from '@ory/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { handleFlowError } from '../modules/ory/errors';
import ory from '../modules/ory/sdk';
import { AxiosError } from 'axios';

interface RecoveryContext {
  flow: RecoveryFlow | undefined;
  recoveryState: RecoveryFlowState | undefined;
  csrfToken: string | undefined;
  submit: (values: UpdateRecoveryFlowBody) => Promise<void | undefined>;
  messages: {
    sentEmail: string | undefined;
    error: {
      email: string | undefined;
    };
  };
}

function getCsrfToken(flow: RecoveryFlow): string {
  return flow.ui.nodes.filter((node) => node.attributes.name === 'csrf_token')[0].attributes.value;
}

export function useRecovery(): RecoveryContext {
  const [flow, setFlow] = useState<RecoveryFlow>();

  // Get ?flow=... from the URL
  const router = useRouter();
  const { flow: flowId, return_to: returnTo } = router.query;

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

  const onSubmit = (values: UpdateRecoveryFlowBody) =>
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
                setFlow(err.response?.data);
                return;
            }

            throw err;
          })
      );

  const sentEmail =
    flow && flow.state === RecoveryFlowState.SentEmail
      ? flow.ui.messages && flow.ui.messages[0]?.text
      : undefined;

  const emailErr =
    flow && flow.state === RecoveryFlowState.ChooseMethod
      ? flow.ui.nodes.filter((node) => node.attributes.name === 'email')[0]?.messages[0]?.text
      : undefined;

  return {
    flow,
    recoveryState: flow?.state,
    csrfToken: flow && getCsrfToken(flow),
    submit: onSubmit,
    messages: {
      sentEmail,
      error: {
        email: emailErr,
      },
    },
  };
}
