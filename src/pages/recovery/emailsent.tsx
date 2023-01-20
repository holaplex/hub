import { Button, Form } from '@holaplex/ui-library-react';
import { ReactElement } from 'react';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';
import Link from '../../components/Link';
import Typography, { Size } from '../../components/Typography';
import { useRecovery } from '../../hooks/useRecovery';
import Splash from '../../layouts/Splash';

export default function EmailSent() {
  const { flow, submit, register, handleSubmit, formState } = useRecovery();

  return (
    <Card>
      <div className="flex flex-col w-full items-center">
        <Icon.EmailInCircle className="mb-6" />
        <Typography.Header size={Size.H2}>Check your email</Typography.Header>
        <Typography.Header size={Size.H3} className="mt-2 text-center">
          We’ve sent email to name@example.com to recover your password. Please follow the link
          provided to complete your password recovery.
        </Typography.Header>
      </div>
      <Form onSubmit={handleSubmit(submit)} className="flex flex-col mt-5">
        <Button
          border="rounded"
          htmlType="submit"
          className="w-full bg-gray-100 text-primary p-2 mt-5"
        >
          Resend recovery link
        </Button>
      </Form>
      <Link href="/login" className="mt-5 flex justify-center">
        Return to sign in
      </Link>
    </Card>
  );
}

interface EmailSentLayoutProps {
  children: ReactElement;
}

EmailSent.getLayout = function EmailSentLayout({ children }: EmailSentLayoutProps): JSX.Element {
  return <Splash>{children}</Splash>;
};
