'use client';
import { useRecovery } from '../../hooks/useRecovery';
import Link from '../../components/Link';
import { ReactElement } from 'react';
import Card from '../../components/Card';
import Typography, { Size, TextColor } from '../../components/Typography';
import { useRecoveryFlow } from '../../hooks/userRecoveryFlow';
import { Button, Form } from '@holaplex/ui-library-react';

export default function Recovery() {
  const { flow, loading } = useRecoveryFlow();
  const { submit, register, handleSubmit, formState } = useRecovery(flow);

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Forgot password</Typography.Header>
      <Typography.Header size={Size.H3} color={TextColor.SubtleText}>
        Enter your email address to receive a recovery link.
      </Typography.Header>
      {loading ? (
        <div className="flex flex-col gap-4 mt-3">
          <div>
            <div className="mb-1 w-20 h-4 rounded-md bg-loadingui animate-pulse" />
            <div className="mb-1 w-full h-10 rounded-md bg-loadingui animate-pulse" />
          </div>
          <div className="mt-3 w-full h-[44px] rounded-md bg-loadingui animate-pulse" />
        </div>
      ) : (
        <Form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 mt-3">
          <Form.Label name="Email address" className="text-xs">
            <Form.Input
              {...register('email', { required: true })}
              placeholder="e.g. name@example.com"
            />
            <Form.Error message={formState.errors.email?.message} />
          </Form.Label>

          <Button
            htmlType="submit"
            className="w-full"
            loading={formState.isSubmitting}
            disabled={formState.isSubmitting}
          >
            Send recovery link
          </Button>
        </Form>
      )}
      <Link href="/login" className="mt-5 flex justify-center">
        Return to sign in
      </Link>
    </Card>
  );
}
