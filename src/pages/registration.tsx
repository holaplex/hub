import { NextPage } from 'next';
import InputError from '../components/atoms/InputError';
import OrDivider from '../components/OrDivider';
import InputBoxHeader from '../components/elements/InputBoxHeader';
import InputPassword from '../components/elements/InputPassword';
import InputText from '../components/elements/InputText';
import SubmitButton from '../components/atoms/SubmitButton';
import ToolTip from '../components/ToolTip';
import { useRegister } from '../hooks/useRegister';
import HubEntryLayout from '../layouts/HubEntryLayout';

// Renders the registration page
const Registration: NextPage = () => {
  const { flow, submit, handleSubmit, register, formState } = useRegister();

  return (
    <HubEntryLayout title="Hub: Create account" description="">
      <>
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
      </>
    </HubEntryLayout>
  );
};

export default Registration;
