import { Button } from '@holaplex/ui-library-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRegister } from '../hooks/useRegister';

// Renders the registration page
const Registration: NextPage = () => {
  const { flow, submit, handleSubmit, register, formState } = useRegister();

  return (
    <>
      <Head>
        <title>Create account - Ory NextJS Integration Example</title>
        <meta name="description" content="Hub: Signup" />
      </Head>
      <div className="flex flex-col items-center mt-10 gap-4">
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl p-4">Create account</span>
          {/* <Flow onSubmit={submit} flow={flow} /> */}
          <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
            <span className="text-red-600 text-sm">
              {flow?.ui.messages && flow.ui.messages[0]?.text}
            </span>
            Id:
            <input {...register('email', { required: true })} type="text" />
            <span className="text-red-600 text-sm">{formState.errors.email?.message}</span>
            Password:
            <input {...register('password', { required: true })} type="password" />
            <span className="text-red-600 text-sm">{formState.errors.password?.message}</span>
            <Button border="rounded" htmlType="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Registration;
