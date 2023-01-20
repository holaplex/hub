import { Button, Form } from '@holaplex/ui-library-react';
import { ReactElement } from 'react';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';
import Typography, { Size } from '../../components/Typography';
import Splash from '../../layouts/Splash';

export default function EmailConfirmed() {
  return (
    <Card>
      <div className="flex flex-col w-full items-center">
        <Icon.CheckInCircle className="mb-6" />
        <Typography.Header size={Size.H2}>Email confirmed</Typography.Header>
        <Typography.Header size={Size.H3} className="mt-2 text-center">
          You’ve successfully confirmed your email address and able to create your first
          organization.
        </Typography.Header>
      </div>
      <Form className="flex flex-col mt-5">
        <Button
          border="rounded"
          htmlType="submit"
          className="w-full bg-gray-100 text-primary p-2 mt-5"
        >
          Sign in
        </Button>
      </Form>
    </Card>
  );
}

interface EmailConfirmedLayoutProps {
  children: ReactElement;
}

EmailConfirmed.getLayout = function EmailConfirmedLayout({
  children,
}: EmailConfirmedLayoutProps): JSX.Element {
  return <Splash>{children}</Splash>;
};
