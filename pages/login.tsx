import type { NextPage } from 'next';
import Head from 'next/head';
import { useLogin } from '../hooks/useLogin';
import { Flow } from '../components/ory/Flow';

const Login: NextPage = () => {
  const { flow, submit, logout, aal, refresh } = useLogin();
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
          <Flow onSubmit={submit} flow={flow} />
        </div>
        {/* {(aal || refresh) ?? (
          <div>
            <button data-testid="logout-link" onClick={logout}>
              Log out
            </button>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Login;
