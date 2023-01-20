import { Button, Form } from '@holaplex/ui-library-react';
import { ReactElement } from 'react';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';
import Typography, { Size } from '../../components/Typography';
import Splash from '../../layouts/Splash';

export default function EmailConfirm() {
  return (
    <Card>
      <div className="flex flex-col w-full items-center">
        <Icon.EmailInCircle className="mb-6" />
        <Typography.Header size={Size.H2}>Confirm your email</Typography.Header>
        <Typography.Header size={Size.H3} className="mt-2 text-center">
          We’ve sent email to name@example.com to confirm your email address. Please follow the link
          provided to complete your registration.
        </Typography.Header>
      </div>
      <Form className="flex flex-col mt-5">
        <Button
          border="rounded"
          htmlType="submit"
          className="w-full bg-gray-100 text-primary p-2 mt-5"
        >
          Resend confirmation email
        </Button>
      </Form>
    </Card>
  );
}

interface EmailConfirmLayoutProps {
  children: ReactElement;
}

EmailConfirm.getLayout = function EmailConfirmLayout({
  children,
}: EmailConfirmLayoutProps): JSX.Element {
  return <Splash>{children}</Splash>;
};
