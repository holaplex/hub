'use client';
import { useLogin } from './../../../hooks/useLogin';
import { Button, Form } from '@holaplex/ui-library-react';
import { Icon } from './../../../components/Icon';
import Typography, { Size } from './../../../components/Typography';
import Card from './../../../components/Card';
import { useLoginFlow } from './../../../hooks/useLoginFlow';
import { useConfirm2fa } from './../../../hooks/useConfirm2fa';
import { AuthenticatorAssuranceLevel } from '@ory/client';

export default function Login() {
  const { loading, flow } = useLoginFlow(AuthenticatorAssuranceLevel.Aal2);
  const confirm2fa = useConfirm2fa(flow);

  return (
    <Card className="w-[400px]">
      <div className="flex flex-col text-center gap-4">
        <span className="bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
          <Icon.Lock stroke="stroke-white" />
        </span>
        <Typography.Header size={Size.H2} className="text-center">
          Two factor authentication
        </Typography.Header>
        <Typography.Paragraph className="text-gray-400 text-sm text-center">
          Two factor authentication is enabled for your account. Please enter the code from your
          authentication app.
        </Typography.Paragraph>
        {loading ? (
          <>
            <div>
              <div className="flex justify-between mb-1">
                <div className="w-14 h-4 rounded-md bg-stone-800 animate-pulse" />
              </div>
              <div className="mb-1 w-full h-10 rounded-md bg-stone-800 animate-pulse" />
            </div>
            <div className="mt-3 w-full h-[44px] rounded-md bg-stone-800 animate-pulse" />>
            </>
        ) : (
          <Form
            onSubmit={confirm2fa.handleSubmit(confirm2fa.submit)}
            className="flex flex-col gap-6"
          >
            <Form.Label name="Verify code" className="text-xs">
              <Form.Input
                {...confirm2fa.register('totp_code', {
                  required: true,
                  minLength: 6,
                  maxLength: 6,
                })}
                autoFocus
                placeholder="Enter your code"
              />
            </Form.Label>
            <Button
              htmlType="submit"
              className="w-full"
              loading={confirm2fa.formState.isSubmitting}
              disabled={confirm2fa.formState.isSubmitting}
            >
              Submit code
            </Button>
          </Form>
        )}
      </div>
    </Card>
  );
}
