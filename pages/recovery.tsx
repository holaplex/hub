import { Button } from '@holaplex/ui-library-react';
import { RecoveryFlowState } from '@ory/client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRecovery } from '../hooks/useRecovery';

const Recovery: NextPage = () => {
  const { flow, submit, register, handleSubmit, formState } = useRecovery();

  if (!flow?.state) {
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
          {flow?.state === RecoveryFlowState.ChooseMethod && (
            <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-2">
              Email:
              <input {...register('email', { required: true })} type="text" />
              <span className="text-red-600 text-sm">{formState.errors.email?.message}</span>
              <Button border="rounded" htmlType="submit">
                Submit
              </Button>
            </form>
          )}
          {flow?.state === RecoveryFlowState.SentEmail && (
            <span className="text-lg text-green-600">
              {flow.ui.messages && flow.ui.messages[0]?.text}
            </span>
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
