import InputBoxHeader from '../components/elements/InputBoxHeader';
import InputError from '../components/atoms/InputError';
import InputPassword from '../components/elements/InputPassword';
import SubmitButton from '../components/atoms/SubmitButton';
import ToolTip from '../components/ToolTip';
import OrDivider from '../components/OrDivider';
import { useLogin } from '../hooks/useLogin';
import { NextPage } from 'next';
import InputText from '../components/elements/InputText';
import HubEntryLayout from '../layouts/HubEntryLayout';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from '../components/Icon';

const Login: NextPage = () => {
  const { flow, submit, register, handleSubmit, formState } = useLogin();

  return (
    <HubEntryLayout title="Hub: Login" description="">
      <HubEntryLayout.GeneralHeader
        heading="Sign in"
        subHeading="Use your email or socials to sign in."
        className="mt-5"
      />
      <HubEntryLayout.FormContainer className="mt-5">
        <Form onSubmit={handleSubmit(submit)} className="flex flex-col">
          <Form.Error message={flow?.ui.messages && flow.ui.messages[0]?.text} />

          <Form.Label name="Email address" className="" />
          <Form.Input placeholder="e.g. name@example.com" className="p-2" />

          <Form.Label name="Password" className="" />
          <Form.Password
            placeholder="Enter your password"
            showPasswordIcon={<Icon.ShowPassword />}
            hidePasswordIcon={<Icon.HidePassword />}
            className="mt-5"
          />

          <Button
            border="rounded"
            htmlType="submit"
            className="w-full bg-primary text-white p-2 mt-5"
          >
            Sign in
          </Button>
        </Form>
      </HubEntryLayout.FormContainer>

      <HubEntryLayout.OrDivider className="my-4" />

      <HubEntryLayout.ToolTip
        text="Dont have an account?"
        actionText="Create account"
        actionUrl="/registration"
        className="mt-4"
      />
    </HubEntryLayout>
  );
};

export default Login;
