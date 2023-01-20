import { useLogin } from '../hooks/useLogin';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from '../components/Icon';
import Splash from '../layouts/Splash';
import Typography, { Size } from '../components/Typography';
import { ReactElement } from 'react';
import Card from '../components/Card';
import Divider from '../components/Divider';
import Link from '../components/Link';

export default function Login() {
  const { flow, submit, register, handleSubmit, formState } = useLogin();

  return (
    <Card>
      <Typography.Header size={Size.H2}>Sign in</Typography.Header>
      <Typography.Header size={Size.H3}>Use your email or socials to sign in.</Typography.Header>
      <Form onSubmit={handleSubmit(submit)} className="flex flex-col mt-3">
        <Form.Error message={flow?.ui.messages && flow.ui.messages[0]?.text} />

        <Form.Label name="Email address" className="text-xs mt-2" />
        <Form.Input
          {...register('identifier', { required: true })}
          placeholder="e.g. name@example.com"
          className=""
        />
        <Form.Error message={formState.errors.identifier?.message} />

        <Form.Label
          name="Password"
          className="text-xs mt-5"
          asideComponent={<Link href="/recovery">Forgot password?</Link>}
        />
        <Form.Password
          {...register('password', { required: true })}
          placeholder="Enter your password"
          showPasswordIcon={<Icon.ShowPassword />}
          hidePasswordIcon={<Icon.HidePassword />}
        />
        <Form.Error message={formState.errors.password?.message} />

        <Button
          border="rounded"
          htmlType="submit"
          className="w-full bg-primary text-white p-2 mt-5"
        >
          Sign in
        </Button>
      </Form>

      <Divider.Or className="my-4" />

      <Link href="/registration" className="mt-4">
        <Button
          icon={<Icon.LightBulb className="mr-1" />}
          border="rounded"
          className="w-full bg-gray-50 py-4"
        >
          <div className="flex items-center text-gray-500 text-sm">
            Dont have an account?
            <span className="flex items-center ml-1 font-medium text-sm text-primary cursor-pointer">
              Create account
              <Icon.ArrowRight className="ml-1" />
            </span>
          </div>
        </Button>
      </Link>
    </Card>
  );
}

interface LoginLayoutProps {
  children: ReactElement;
}

Login.getLayout = function LoginLayout({ children }: LoginLayoutProps): JSX.Element {
  return <Splash>{children}</Splash>;
};
