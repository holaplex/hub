import { Button } from '@holaplex/ui-library-react';
import { RecoveryFlowState, UpdateRecoveryFlowWithLinkMethod } from '@ory/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRecovery } from '../hooks/useRecovery';

const Recovery: NextPage = () => {
  const { flow, csrfToken, submit, recoveryState, messages } = useRecovery();
  console.log('messages', messages);
  const { register, handleSubmit } = useForm<UpdateRecoveryFlowWithLinkMethod>({
    defaultValues: { csrf_token: csrfToken, email: '', method: 'link' },
  });
  if (!recoveryState) {
    return null;
  }
  console.log('flow', flow);
  return (
    <>
      <Head>
        <title>Recover your hub account </title>
        <meta name="description" content="Hub: Recover Account" />
      </Head>
      <div className="flex flex-col items-center mt-10 gap-4">
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl p-4">Recover your account</span>
          {/* <Flow onSubmit={submit} flow={flow} /> */}
          {recoveryState === RecoveryFlowState.ChooseMethod && (
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
              <input
                type="text"
                {...register('csrf_token', { required: true })}
                value={csrfToken}
              />
              Email:
              <input {...register('email', { required: true })} type="text" />
              <span className="text-red-600 text-sm">{messages.error.email}</span>
              <Button border="rounded" htmlType="submit">
                Submit
              </Button>
            </form>
          )}
          {recoveryState === RecoveryFlowState.SentEmail && (
            <span className="text-lg text-green-600">{messages.sentEmail}</span>
          )}
        </div>
        <div>
          <Link href="/" passHref>
            <span>Go back</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Recovery;
