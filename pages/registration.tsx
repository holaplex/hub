import type { NextPage } from 'next';
import Head from 'next/head';
import { Flow } from '../components/ory/Flow';
import { useRegister } from '../hooks/useRegister';

// Renders the registration page
const Registration: NextPage = () => {
  const { flow, submit } = useRegister();
  console.log('flow', flow);
  return (
    <>
      <Head>
        <title>Create account - Ory NextJS Integration Example</title>
        <meta name="description" content="Hub: Signup" />
      </Head>
      <div className="flex flex-col items-center mt-10 gap-4">
        <div className="flex flex-col items-center">
          <span className="font-bold text-2xl p-4">Create account</span>
          <Flow onSubmit={submit} flow={flow} />
        </div>
      </div>
    </>
  );
};

export default Registration;
