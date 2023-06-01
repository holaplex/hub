'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRecoveryPassword } from '../../../hooks/useRecoveryPassword';
import { useRecoveryPasswordFlow } from '../../../hooks/useRecoveryPasswordFlow';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email')!;
  const flowId = searchParams?.get('flow')!;
  const { flow, loading } = useRecoveryPasswordFlow({ flowId });
  const { submit, register, handleSubmit, formState, watch } = useRecoveryPassword(flow);

  const onClose = () => {
    router.back();
  };

  return (
    <Card className="w-[422px]">
      {loading ? (
        <>
          <div className="bg-stone-800 animate-pulse h-6 w-24 rounded-md" />
          <div className="bg-stone-800 animate-pulse h-4 w-56 rounded-md mt-5" />
          <div className="bg-stone-800 animate-pulse h-4 w-20 rounded-md mt-5" />
          <div className="bg-stone-800 animate-pulse h-10 w-full rounded-md mt-2" />
          <div className="bg-stone-800 animate-pulse h-4 w-full rounded-md mt-5" />
          <div className="bg-stone-800 animate-pulse h-4 w-full rounded-md mt-1" />
          <div className="flex gap-6 items-center mt-5">
            <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
            <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
          </div>
        </>
      ) : (
        <>
          <Typography.Header size={Size.H2}>Reset password</Typography.Header>
          <div className="text-sm text-gray-400 mt-5">Enter a new password for {email}</div>

          <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
            <Form.Label name="Password" className="text-xs ">
              <Form.Input
                {...register('password', {
                  required: 'Please enter a new password.',
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/,
                    message:
                      'Password must include at least one capital letter, lowercase letter, number, special symbol and be at least 8 characters.',
                  },
                })}
                autoFocus
                type="password"
                placeholder="Enter a new password"
              />
              <Form.Error message={formState.errors.password?.message} />
            </Form.Label>

            <span className="text-xs text-gray-400 mt-5">
              Include at least one capital letter, lowercase letter, number, special symbol and be
              at least 8 characters.
            </span>

            <Form.Label name="Confirm Password" className="text-xs mt-5">
              <Form.Input
                {...register('confirmPassword', {
                  required: 'Please re-enter the password.',
                  validate: (value: string) => {
                    if (watch('password') != value) {
                      return 'Password and confirm password do not match.';
                    }
                  },
                })}
                type="password"
                placeholder="Re-enter the password"
              />
            </Form.Label>
            <Form.Error message={formState.errors.confirmPassword?.message} />

            <hr className="w-full bg-stone-800 border-0 h-px my-5" />

            <div className="flex items-center gap-6">
              <Button
                variant="secondary"
                className="w-full"
                onClick={onClose}
                disabled={formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className="shrink-0 w-auto"
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
              >
                Update password
              </Button>
            </div>
          </Form>
        </>
      )}
    </Card>
  );
}
