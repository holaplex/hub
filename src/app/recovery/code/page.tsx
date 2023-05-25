'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import { Icon } from '../../../components/Icon';
import Typography, { Size } from '../../../components/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoveryCode } from '../../../hooks/useRecoveryCode';
import { useRecoveryCodeFlow } from '../../../hooks/useRecoveryCodeFlow';

export default function RecoveryCode() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email')!;
  const flowId = searchParams.get('flowId')!;
  const { flow, loading } = useRecoveryCodeFlow({ flowId });
  const { submit, register, handleSubmit, formState } = useRecoveryCode({ flow, email });

  return (
    <Card className="w-[416px]">
      {loading ? (
        <div className="flex flex-col w-full items-center">
          <div className="bg-stone-800 animate-pulse h-20 w-20 rounded-full mt-5 " />
          <div className="bg-stone-800 animate-pulse h-10 w-28 rounded-md mt-5" />
          <div className="bg-stone-800 animate-pulse h-20 w-full rounded-md mt-5 px-5" />
          <div className="mt-5 w-full">
            <div className="w-20 h-4 rounded-md bg-stone-800 animate-pulse" />
            <div className="w-full h-10 mt-1 rounded-md bg-stone-800 animate-pulse" />
          </div>
          <div className="flex w-full gap-6 items-center mt-5">
            <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
            <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full items-center">
            <Icon.EmailInCircle className="mb-6" fill="#2B2B2B" />
            <Typography.Header size={Size.H2}>Check your email</Typography.Header>
            <Typography.Header size={Size.H3} className="mt-2 text-center">
              We have sent email to <span className="text-white">{email}</span> to recover your
              password. Please enter the code provided to complete your password recovery.
            </Typography.Header>
          </div>

          <Form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 mt-3">
            <Form.Label name="Enter code" className="text-xs mt-5">
              <Form.Input {...register('code', { required: true })} />
              <Form.Error message={formState.errors.code?.message} />
            </Form.Label>
            <div className="flex items-center gap-4 mt-5">
              <Button className="w-full" variant="secondary" onClick={() => router.back()}>
                Edit email
              </Button>
              <Button htmlType="submit" className="w-full">
                Submit code
              </Button>
            </div>
          </Form>
        </>
      )}
    </Card>
  );
}
