import type { NextPage } from 'next';
import Head from 'next/head';
import { useLogin } from '../hooks/useLogin';
import { OrDivider } from '../components/atoms/OrDivider';
import InputText from '../components/elements/InputText';
import InputError from '../components/atoms/InputError';
import InputPassword from '../components/elements/InputPassword';
import { SubmitButton } from '../components/elements/SubmitButton';
import Link from 'next/link';
import Bulb from '../components/svgs/Bulb';
import ArrowRight from '../components/svgs/ArrowRight';

const Login: NextPage = () => {
  const { flow, submit, logout, aal, refresh, register, handleSubmit, formState } = useLogin();

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name="description" content="Hub - Sign in" />
      </Head>
      <div className="flex flex-col h-screen items-center mt-10">
        <div className="text-2xl font-bold text-primary">Holaplex</div>
        <div className="w-[400px] h-[480px] rounded-md bg-white border border-gray-100 mt-14 p-8">
          <div className="font-semibold text-xl text-primary">Sign in</div>
          <div className="text-sm mt-2 mb-5 text-gray-600">
            Use your email or socials to sign in.
          </div>
          <form onSubmit={handleSubmit(submit)} className="flex flex-col">
            <InputError errorMessage={flow?.ui.messages && flow.ui.messages[0]?.text} />
            <InputText
              label="Email address"
              placeholder="e.g. name@example.com"
              register={register}
              fieldName="identifier"
              errorMessage={formState.errors.identifier?.message}
              className=""
            />
            <InputPassword
              register={register}
              fieldName="password"
              errorMessage={formState.errors.password?.message}
              className="mt-4"
            />
            <SubmitButton label="Sign in" className="mt-5" />
          </form>
          <OrDivider className="my-4" />
          <div className="bg-gray-50 px-4 py-4 mt-4 rounded-md flex items-center text-gray-500">
            <Bulb className="mr-1" />
            <span className="text-sm">
              Dont have an account?
              <Link
                href="/registration"
                passHref
                className="ml-1 font-medium text-primary cursor-pointer"
              >
                Create account
              </Link>
            </span>
            <ArrowRight className="ml-1" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
