import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';
import Link from '../../components/Link';
import Typography, { Size } from '../../components/Typography';
import Splash, { SplashProps } from '../../layouts/Splash';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Hub Recovery',
      description: '',
    },
  };
}

export default function EmailConfirmed() {
  return (
    <Card>
      <div className="flex flex-col w-full items-center">
        <Icon.CheckInCircle className="mb-6" />
        <Typography.Header size={Size.ExtraLarge}>Email confirmed</Typography.Header>
        <Typography.Header size={Size.Small} className="mt-2 text-center">
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

EmailConfirmed.getLayout = function SplashLayout({
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
