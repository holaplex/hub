import { NextPage } from 'next';
import Head from 'next/head';
import InputError from '../components/atoms/InputError';
import OrDivider from '../components/atoms/OrDivider';
import InputBoxHeader from '../components/elements/InputBoxHeader';
import InputPassword from '../components/elements/InputPassword';
import InputText from '../components/elements/InputText';
import SubmitButton from '../components/atoms/SubmitButton';
import ToolTip from '../components/elements/ToolTip';
import { useRegister } from '../hooks/useRegister';

// Renders the registration page
const Registration: NextPage = () => {
  const { flow, submit, handleSubmit, register, formState } = useRegister();

  return (
    <>
      <Head>
        <title>Create account</title>
        <meta name="description" content="Hub: Signup" />
      </Head>
      <div className="flex flex-col h-screen items-center mt-10">
        <div className="text-2xl font-bold">Holaplex</div>
        <div className="w-[400px] h-[480px] rounded-md bg-white border border-gray-100 mt-14 p-8">
          <InputBoxHeader
            heading="Create an account"
            subHeading="Sign up using your email address."
            className="mb-5"
          />
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            <InputError errorMessage={flow?.ui.messages && flow.ui.messages[0]?.text} />
            <InputText
              label="Email address"
              placeholder="e.g. name@example.com"
              register={register}
              fieldName="email"
              errorMessage={formState.errors.email?.message}
              className=""
            />
            <InputPassword
              register={register}
              fieldName="password"
              placeholder="Create your password"
              errorMessage={formState.errors.password?.message}
              className="mt-5"
            />
            <SubmitButton label="Continue" className="mt-5" />
          </form>
          <OrDivider className="my-4" />
          <ToolTip
            text="Already have an account?"
            actionText="Sign in"
            actionUrl="/login"
            className="mt-4"
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
