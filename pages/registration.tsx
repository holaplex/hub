import { Button } from '@holaplex/ui-library-react';
import { UpdateRegistrationFlowBody } from '@ory/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { useRegister } from '../hooks/useRegister';

// Renders the registration page
const Registration: NextPage = () => {
  const { flow, submit, csrfToken, messages } = useRegister();
  console.log('Flow', flow);
  const { register, handleSubmit } = useForm<UpdateRegistrationFlowBody>({
    defaultValues: {
      csrf_token: csrfToken,
      traits: { email: '' },
      password: '',
      method: 'password',
    },
  });
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
            <span className="text-red-600 text-sm">{messages.mainUI}</span>
            <input type="text" {...register('csrf_token', { required: true })} value={csrfToken} />
            Id:
            <input {...register('traits.email', { required: true })} type="text" />
            <span className="text-red-600 text-sm">{messages.error.email}</span>
            Password:
            <input {...register('password', { required: true })} type="password" />
            <span className="text-red-600 text-sm">{messages.error.password}</span>
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
