import type { NextPage } from 'next';
import InputBoxHeader from '../components/elements/InputBoxHeader';
import InputText from '../components/elements/InputText';
import SubmitButton from '../components/atoms/SubmitButton';
import { useRecovery } from '../hooks/useRecovery';
import PageLink from '../components/PageLink';
import HubEntryLayout from '../layouts/HubEntryLayout';

const Recovery: NextPage = () => {
  const { flow, submit, register, handleSubmit, formState } = useRecovery();

  // if (!flow?.state) {
  //   return null;
  // }
  return (
    <HubEntryLayout title="Forgot password?" description="Recover your hub account">
      <>
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
      </>
    </HubEntryLayout>
  );
};

export default Recovery;
