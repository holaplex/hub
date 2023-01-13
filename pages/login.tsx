import type { NextPage } from 'next';
import Head from 'next/head';
import { useLogin } from '../hooks/useLogin';
import { useForm } from 'react-hook-form';
import { UpdateLoginFlowWithPasswordMethod } from '@ory/client';
import { Button } from '@holaplex/ui-library-react';

const Login: NextPage = () => {
  const { flow, csrfToken, submit, logout, aal, refresh, messages } = useLogin();
  const { register, handleSubmit } = useForm<UpdateLoginFlowWithPasswordMethod>({
    defaultValues: { csrf_token: csrfToken, identifier: '', password: '', method: 'password' },
  });
  console.log('csrf token', csrfToken);
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
          {/* <Flow onSubmit={submit} flow={flow} /> */}
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
            <span className="text-red-600 text-sm">{messages.mainUI}</span>
            <input type="text" {...register('csrf_token', { required: true })} value={csrfToken} />
            Id:
            <input {...register('identifier', { required: true })} type="text" />
            <span className="text-red-600 text-sm">{messages.error.email}</span>
            Password:
            <input {...register('password', { required: true })} type="password" />
            <span className="text-red-600 text-sm">{messages.error.password}</span>
            <Button border="rounded" htmlType="submit">
              Login
            </Button>
          </form>
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
