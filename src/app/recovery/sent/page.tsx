'use client';
import { Button } from '@holaplex/ui-library-react';
import Card from './../../../components/Card';
import { Icon } from './../../../components/Icon';
import Link from './../../../components/Link';
import Typography, { Size } from './../../../components/Typography';
import { useRecoveryFlow } from '../../../hooks/userRecoveryFlow';

export default function EmailSent() {
  const { flow, loading } = useRecoveryFlow();

  return (
    <Card className="w-[400px]">
      <div className="flex flex-col w-full items-center">
        <Icon.EmailInCircle className="mb-6" />
        <Typography.Header size={Size.H2}>Check your email</Typography.Header>
        <Typography.Header size={Size.H3} className="mt-2 text-center">
          We have sent email to name@example.com to recover your password. Please follow the link
          provided to complete your password recovery.
        </Typography.Header>
      </div>
      {loading ? (
        <div className="mt-3 w-full h-[44px] rounded-md bg-gray-100 animate-pulse" />
      ) : (
        <a href="">
          <Button
            border="rounded"
            htmlType="submit"
            className="w-full bg-gray-100 text-primary p-2 mt-5"
          >
            Resend recovery link
          </Button>
        </a>
      )}
      <Link href="/login" className="mt-5 flex justify-center">
        Return to sign in
      </Link>
    </Card>
  );
}
