'use client';
import { useRecovery } from '../../hooks/useRecovery';
import Card from '../../components/Card';
import Typography, { Size } from '../../components/Typography';
import { useRecoveryFlow } from '../../hooks/useRecoveryFlow';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';

export default function Recovery() {
  const router = useRouter();
  const { flow, loading } = useRecoveryFlow();
  const { submit, register, handleSubmit, formState } = useRecovery(flow);

  return (
    <Card className="w-[416px]">
      <Typography.Header size={Size.H2}>Forgot password</Typography.Header>
      <Typography.Header size={Size.H3} className="mt-4">
        Enter your email address to receive a recovery code.
      </Typography.Header>
      {loading ? (
        <div className="flex flex-col gap-6 mt-4">
          <div>
            <div className="w-20 h-4 rounded-md bg-stone-950 animate-pulse" />
            <div className="w-full h-10 mt-1 rounded-md bg-stone-950 animate-pulse" />
          </div>
          <div className="flex gap-6 justify-between mt-5">
            <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
            <div className="w-full h-10 rounded-md bg-stone-950 animate-pulse" />
          </div>
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
          <div className="flex items-center gap-4">
            <Button
              className="w-full"
              disabled={formState.isSubmitting}
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="shrink-0 w-auto"
              loading={formState.isSubmitting}
              disabled={formState.isSubmitting}
            >
              Send recovery code
            </Button>
          </div>
        </Form>
      )}
    </Card>
  );
}
