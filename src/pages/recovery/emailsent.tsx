import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';
import Link from '../../components/Link';
import Typography, { Size } from '../../components/Typography';
import { useRecovery } from '../../hooks/useRecovery';
import Splash, { SplashProps } from '../../layouts/Splash';

export async function getServerSideProps() {
  return {
    props: {
      title: 'Hub Recovery',
      description: '',
    },
  };
}

export default function EmailSent() {
  const { flow, submit, register, handleSubmit, formState } = useRecovery();

  return (
    <Card>
      <div className="flex flex-col w-full items-center">
        <Icon.EmailInCircle className="mb-6" />
        <Typography.Header size={Size.ExtraLarge}>Check your email</Typography.Header>
        <Typography.Header size={Size.Small} className="mt-2 text-center">
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

EmailSent.getLayout = function SplashLayout({
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
