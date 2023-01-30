'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import Typography, { Size } from '../../../components/Typography';

export default function EmailConfirm() {
  return (
    <Card className="w-[400px]">
      <div className="flex flex-col w-full items-center">
        <Icon.EmailInCircle className="mb-6" />
        <Typography.Header size={Size.H2}>Confirm your email</Typography.Header>
        <Typography.Header size={Size.H3} className="mt-2 text-center">
          We’ve sent email to name@example.com to confirm your email address. Please follow the link
          provided to complete your registration.
        </Typography.Header>
      </div>
      <Form className="flex flex-col mt-5">
        <Button htmlType="submit" variant="secondary" className="w-full mt-5">
          Resend confirmation email
        </Button>
      </Form>
    </Card>
  );
}
