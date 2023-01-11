import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Flow } from '../components/ory/Flow';
import { useRecovery } from '../hooks/useRecovery';

const Recovery: NextPage = () => {
  const { flow, submit } = useRecovery();

  return (
    <>
      <Head>
        <title>Recover your hub account </title>
        <meta name="description" content="Hub: Recover Account" />
      </Head>
      <div className="flex flex-col items-center mt-10 gap-4">
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl p-4">Recover your account</span>
          <Flow onSubmit={submit} flow={flow} />
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
