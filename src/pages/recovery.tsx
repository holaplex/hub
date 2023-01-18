import type { NextPage } from 'next';
import Head from 'next/head';
import InputBoxHeader from '../components/elements/InputBoxHeader';
import InputText from '../components/elements/InputText';
import SubmitButton from '../components/atoms/SubmitButton';
import { useRecovery } from '../hooks/useRecovery';
import PageLink from '../components/atoms/PageLink';

const Recovery: NextPage = () => {
  const { flow, submit, register, handleSubmit, formState } = useRecovery();

  // if (!flow?.state) {
  //   return null;
  // }
  return (
    <>
      <Head>
        <title>Recover your hub account </title>
        <meta name="description" content="Hub: Recover Account" />
      </Head>
      <div className="flex flex-col h-screen items-center mt-10">
        <div className="text-2xl font-bold text-primary">Holaplex</div>
        <div className="w-[400px] h-[320px] rounded-md bg-white border border-gray-100 mt-14 p-8">
          <InputBoxHeader
            heading="Forgot password"
            subHeading="Enter your email address to receive a recovery link."
            className="mb-5"
          />
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            <InputText
              label="Email address"
              placeholder="e.g. name@example.com"
              register={register}
              fieldName="email"
              errorMessage={formState.errors.email?.message}
              className=""
            />
            <SubmitButton label="Send recovery link" className="mt-5" />
            <PageLink label="Return to sign in" url="/login" className="mt-5 flex justify-center" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Recovery;
