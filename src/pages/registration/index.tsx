import { useRegister } from '../../hooks/useRegister';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from '../../components/Icon';
import Splash from '../../layouts/Splash';
import Typography, { Size } from '../../components/Typography';
import { ReactElement } from 'react';
import Card from '../../components/Card';
import Divider from '../../components/Divider';
import Link from '../../components/Link';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Hub Signup',
      description: '',
    },
  };
}
export default function Registration() {
  const { flow, submit, handleSubmit, register, formState } = useRegister();

  return (
    <Card>
      <Typography.Header size={Size.ExtraLarge}>Create an account</Typography.Header>
      <Typography.Header size={Size.Small}>Sign up using your email address.</Typography.Header>
      <Form onSubmit={handleSubmit(submit)} className="flex flex-col mt-3">
        <Form.Error message={flow?.ui.messages && flow.ui.messages[0]?.text} />

        <Form.Label name="Email address" className="text-xs mt-2" />
        <Form.Input
          {...register('email', { required: true })}
          placeholder="e.g. name@example.com"
          className=""
        />
        <Form.Error message={formState.errors.email?.message} />

        <Form.Label
          name="Password"
          className="text-xs mt-5"
          asideComponent={<Link href="/recovery">Forgot password?</Link>}
        />
        <Form.Password
          {...register('password', { required: true })}
          placeholder="Create your password"
          showPasswordIcon={<Icon.ShowPassword />}
          hidePasswordIcon={<Icon.HidePassword />}
        />
        <Form.Error message={formState.errors.password?.message} />

        <Button
          border="rounded"
          htmlType="submit"
          className="w-full bg-primary text-white p-2 mt-5"
        >
          Register
        </Button>
      </Form>

      <Divider.Or className="my-4" />

      <Link href="/login" className="mt-4">
        <Button
          icon={<Icon.LightBulb className="mr-1" />}
          border="rounded"
          className="w-full bg-gray-50 py-4"
        >
          <div className="flex items-center text-gray-500 text-sm">
            Already have an account?
            <span className="flex items-center ml-1 font-medium text-sm text-primary cursor-pointer">
              Sign in
              <Icon.ArrowRight className="ml-1" />
            </span>
          </div>
        </Button>
      </Link>
    </Card>
  );
}

interface SplashProps {
  title: string;
  description: string;
  children: ReactElement;
}

Registration.getLayout = function SplashLayout({
  title,
  description,
  children,
}: SplashProps): JSX.Element {
  return (
    <Splash title={title} description={description}>
      {children}
    </Splash>
  );
};
