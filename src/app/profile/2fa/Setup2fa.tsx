'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter } from 'next/navigation';
import { useProfileUpdateFlow } from '../../../hooks/useProfileUpdateFlow';
import { useSetup2fa } from '../../../hooks/useSetup2fa';
import { useClipboard } from '@holaplex/ui-library-react';
import { extractFlowNodeAttribute } from '../../../modules/ory';
import { Icon } from '../../../components/Icon';
import { UiNodeImageAttributes, UiNodeTextAttributes } from '@ory/client';

const extractTotpQrCode = extractFlowNodeAttribute('totp_qr');
const extractTotpSecretCode = extractFlowNodeAttribute('totp_secret_key');

export default function Setup2fa() {
  const router = useRouter();
  const { flow, loading } = useProfileUpdateFlow();
  const { submit, register, handleSubmit, formState } = useSetup2fa(flow);

  const onClose = () => {
    router.push(`/profile/edit`);
  };

  const totpQrCode = extractTotpQrCode(flow?.ui?.nodes || [])?.attributes as UiNodeImageAttributes;
  const totpSecretCode = extractTotpSecretCode(flow?.ui?.nodes || [])
    ?.attributes as UiNodeTextAttributes;
  const { copied, copyText } = useClipboard(totpSecretCode?.text?.text as string);

  return (
    <Card className="w-[502px] m-auto text-center gap-4 flex flex-col">
      {loading ? (
        <>
          <div className="bg-stone-800 animate-pulse w-[256px] h-[256px] rounded-md m-auto" />

          <div className="bg-stone-800 animate-pulse h-6 w-56 rounded-md m-auto" />
          <div className="flex flex-col gap-2 justify-center">
            <div className="bg-stone-800 animate-pulse h-4 w-full rounded-md m-auto" />
            <div className="bg-stone-800 animate-pulse h-4 w-28 rounded-md m-auto" />
          </div>
          <div className="flex gap-2 mx-auto">
            <div className="w-[350px] h-14 mt-1 rounded-md bg-stone-800 animate-pulse" />
            <div className="w-14 h-14 flex-none mt-1 rounded-md bg-stone-800 animate-pulse" />
          </div>
          <div className="w-full">
            <div className="w-16 h-4 rounded-md bg-stone-800 animate-pulse" />
            <div className="w-full h-10 mt-1 rounded-md bg-stone-800 animate-pulse" />
          </div>
          <div className="flex gap-6 items-center mt-4">
            <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
            <div className="bg-stone-800 animate-pulse h-10 rounded-md basis-1/2" />
          </div>
        </>
      ) : (
        <>
          <img src={totpQrCode.src} alt="QR code" className="w-[256px] h-[256px] mx-auto" />
          <Typography.Header size={Size.H2} className="text-center">
            Authenticator app QR code
          </Typography.Header>
          <Typography.Paragraph className="text-gray-400">
            Below is your authenticator app secret. Use it if you can not scan the QR code.
          </Typography.Paragraph>
          <div className="flex gap-2 mx-auto">
            <div className="shrink border px-4 py-3 bg-stone-900 border-stone-800 rounded-md truncate">
              {totpSecretCode.text.text}
            </div>
            <button
              onClick={copyText}
              className="flex-none aspect-square rounded-md w-12 flex items-center justify-center bg-stone-800 text-gray-400"
            >
              {copied ? <Icon.Check /> : <Icon.Copy />}
            </button>
          </div>
          <Form className="flex flex-col" onSubmit={handleSubmit(submit)}>
            <Form.Label name="Verify code" className="text-xs basis-1/2">
              <Form.Input
                {...register('totp_code', {
                  required: 'Please enter 2FA verification code.',
                })}
                autoFocus
                type="text"
                placeholder="Enter verification code"
              />
            </Form.Label>
            <Form.Error message={formState.errors.totp_code?.message} />

            <hr className="w-full bg-stone-800 border-0 h-px my-5" />

            <div className="flex items-center gap-6">
              <Button
                variant="secondary"
                className="w-full basis-1/2"
                disabled={formState.isSubmitting}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className="w-full basis-1/2"
                loading={formState.isSubmitting}
                disabled={formState.isSubmitting}
              >
                Enable 2FA
              </Button>
            </div>
          </Form>
        </>
      )}
    </Card>
  );
}
