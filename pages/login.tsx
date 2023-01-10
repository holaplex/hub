import { LoginFlow, UpdateLoginFlowBody } from '@ory/client';
import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ory from '../modules/ory/sdk';

import { handleGetFlowError, handleFlowError } from '../modules/ory/errors';
import { LogoutLink } from '../modules/ory';
import { Flow } from '../modules/ory/ui';

const Login: NextPage = () => {
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
              setFlow(err.response?.data);
              return;
            }

            return Promise.reject(err);
          })
      );

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Hub - Sign in" />
      </Head>
      <div className="flex flex-col items-center mt-10 gap-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-2xl p-4">
            {(() => {
              if (flow?.refresh) {
                return 'Confirm Action';
              } else if (flow?.requested_aal === 'aal2') {
                return 'Two-Factor Authentication';
              }
              return 'Sign In';
            })()}
          </div>
          <Flow onSubmit={onSubmit} flow={flow} />
        </div>
        {aal || refresh ? (
          <div>
            <button data-testid="logout-link" onClick={onLogout}>
              Log out
            </button>
          </div>
        ) : (
          <>
            <div>
              <Link href="/registration" passHref>
                <button>Create account</button>
              </Link>
            </div>
            <div>
              <Link href="/recovery" passHref>
                <button>Recover your account</button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Login;
