import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';
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

export default function EmailConfirm() {
  return (
    <Card>
      <div className="flex flex-col w-full items-center">
        <Icon.EmailInCircle className="mb-6" />
        <Typography.Header size={Size.ExtraLarge}>Confirm your email</Typography.Header>
        <Typography.Header size={Size.Small} className="mt-2 text-center">
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

EmailConfirm.getLayout = function SplashLayout({
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
