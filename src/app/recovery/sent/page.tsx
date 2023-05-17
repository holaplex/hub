'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from './../../../components/Card';
import { Icon } from './../../../components/Icon';
import Typography, { Size } from './../../../components/Typography';
import { useRouter } from 'next/navigation';
import { useRecoveryCode } from '../../../hooks/useRecoveryCode';
import { useRecoveryCodeFlow } from '../../../hooks/useRecoveryCodeFlow';

interface EmailSentProps {
  params: { flow: string; email: string };
}

export default function EmailSent({ params: { email, flow: flowId } }: EmailSentProps) {
  const router = useRouter();
  const { flow, loading } = useRecoveryCodeFlow({ flowId });
  const { submit, register, handleSubmit, formState } = useRecoveryCode({ flow, email });

  return (
    <Card className="w-[416px]">
      <div className="flex flex-col w-full items-center">
        <Icon.EmailInCircle className="mb-6" />
        <Typography.Header size={Size.H2}>Check your email</Typography.Header>
        <Typography.Header size={Size.H3} className="mt-2 text-center">
          We have sent email to {email} to recover your password. Please enter the code provided to
          complete your password recovery.
        </Typography.Header>
      </div>

      <Form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 mt-3">
        <Form.Label name="Enter code" className="text-xs">
          <Form.Input {...register('code', { required: true })} />
          <Form.Error message={formState.errors.code?.message} />
        </Form.Label>
        <div className="flex items-center gap-4 mt-5">
          <Button className="w-full" variant="secondary" onClick={() => router.back()}>
            Edit email
          </Button>
          <Button htmlType="submit" variant="secondary" className="w-full">
            Submit code
          </Button>
        </div>
      </Form>
    </Card>
  );
}
