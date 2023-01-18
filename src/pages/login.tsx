import InputBoxHeader from '../components/elements/InputBoxHeader';
import InputError from '../components/atoms/InputError';
import InputPassword from '../components/elements/InputPassword';
import SubmitButton from '../components/atoms/SubmitButton';
import ToolTip from '../components/elements/ToolTip';
import OrDivider from '../components/atoms/OrDivider';
import { useLogin } from '../hooks/useLogin';
import { NextPage } from 'next';
import InputText from '../components/elements/InputText';
import HubEntryLayout from '../components/layouts/HubEntryLayout';

const Login: NextPage = () => {
  const { flow, submit, register, handleSubmit, formState } = useLogin();

  return (
    <HubEntryLayout title="Hub: Login" description="">
      <>
        <InputBoxHeader
          heading="Sign in"
          subHeading="Use your email or socials to sign in."
          className="mb-5"
        />
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
            placeholder="Enter your password"
            errorMessage={formState.errors.password?.message}
            className="mt-5"
          />
          <SubmitButton label="Sign in" className="mt-5" />
        </form>
        <OrDivider className="my-4" />
        <ToolTip
          text="Dont have an account?"
          actionText="Create account"
          actionUrl="/registration"
          className="mt-4"
        />
      </>
    </HubEntryLayout>
  );
};

export default Login;
