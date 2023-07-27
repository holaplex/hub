'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useSearchParams } from 'next/navigation';
import Card from '../../components/Card';
import { Icon } from '../../components/Icon';
import Typography, { Size } from '../../components/Typography';
import { useEmailVerify } from '../../hooks/useEmailVerify';
import { useEmailVerifyFlow } from '../../hooks/useEmailVerifyFlow';

export default function EmailConfirm() {
  const searchParams = useSearchParams();
  const { loading, flow, updateFlow, cooldown } = useEmailVerifyFlow({
    email: searchParams?.get('email')!,
  });
  const { submit, handleSubmit, register, formState } = useEmailVerify({ flow });
  return (
    <Card className="w-[400px]">
      {loading ? (
        <>
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
        </>
      ) : (
        <>
          <div className="flex flex-col w-full items-center">
            <Icon.EmailInCircle className="mb-6" />
            <Typography.Header size={Size.H2}>Confirm your email</Typography.Header>
            <Typography.Header size={Size.H3} className="mt-2 text-center">
              We have sent a code to your registered email address to confirm your email address.
              Please enter the code sent to complete your registration.
            </Typography.Header>
          </div>
          <Form onSubmit={handleSubmit(submit)} className="flex flex-col gap-6 mt-3">
            <Form.Label name="Enter code" className="text-xs mt-5">
              <Form.Input {...register('code', { required: true })} />
            </Form.Label>
            <Form.Error message={formState.errors.code?.message} />
            <Button htmlType="submit" className="w-full mt-5" loading={loading} disabled={loading}>
              Submit code
            </Button>
            <Button
              htmlType="button"
              variant="secondary"
              className="w-full mt-2"
              onClick={updateFlow}
              disabled={cooldown > 0 || loading}
            >
              {cooldown
                ? `Request a new code after ${cooldown} seconds`
                : 'Resend confirmation code'}
            </Button>
          </Form>
        </>
      )}
    </Card>
  );
}
