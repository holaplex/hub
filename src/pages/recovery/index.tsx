import { useRecovery } from '../../hooks/useRecovery';
import Link from '../../components/Link';
import Splash from '../../layouts/Splash';
import { ReactElement } from 'react';
import Card from '../../components/Card';
import Typography, { Size } from '../../components/Typography';
import { Button, Form } from '@holaplex/ui-library-react';

export default function Recovery() {
  const { flow, submit, register, handleSubmit, formState } = useRecovery();

  return (
    <Card>
      <Typography.Header size={Size.H2}>Forgot password</Typography.Header>
      <Typography.Header size={Size.H3}>
        Enter your email address to receive a recovery link.
      </Typography.Header>

      <Form onSubmit={handleSubmit(submit)} className="flex flex-col mt-5">
        <Form.Label name="Email address" className="text-xs" />
        <Form.Input
          {...register('email', { required: true })}
          placeholder="e.g. name@example.com"
          className=""
        />
        <Form.Error message={formState.errors.email?.message} />

        <Button
          border="rounded"
          htmlType="submit"
          className="w-full bg-primary text-white p-2 mt-5"
        >
          Send recovery link
        </Button>
      </Form>
      <Link href="/login" className="mt-5 flex justify-center">
        Return to sign in
      </Link>
    </Card>
  );
}

interface RecoveryLayoutProps {
  children: ReactElement;
}
Recovery.getLayout = function RecoveryLayout({ children }: RecoveryLayoutProps): JSX.Element {
  return <Splash>{children}</Splash>;
};
