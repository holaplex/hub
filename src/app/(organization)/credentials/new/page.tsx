'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { pipe, not, isNil } from 'ramda';
import Card from '../../../../components/Card';
import { Icon } from '../../../../components/Icon';
import Typography, { Size, TextColor } from '../../../../components/Typography';
import { CreateCredential } from './../../../../mutations/credential.graphql';
import { GetOrganizationCredentials } from './../../../../queries/credentials.graphql';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { convertLocalTime } from '../../../../modules/time';
import { DateFormat, formatDateString } from '../../../../modules/time';
import { useRouter } from 'next/navigation';
import { CreateCredentialInput, CreateCredentialPayload } from '../../../../graphql.types';
import { useOrganization } from '../../../../hooks/useOrganization';
import Link from 'next/link';
import useClipboard from '../../../../hooks/useClipboard';

interface CredentialForm {
  name: string;
}

interface CreateCredentialData {
  createCredential: CreateCredentialPayload;
}

interface CreateCredentialVars {
  input: CreateCredentialInput;
}

export default function GenerateToken() {
  const { organization } = useOrganization();
  const router = useRouter();
  const [createCredential, { data, loading }] = useMutation<
    CreateCredentialData,
    CreateCredentialVars
  >(CreateCredential, {
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: GetOrganizationCredentials, variables: { organization: organization?.id } },
    ],
  });
  const { register, handleSubmit } = useForm<CredentialForm>();
  const { copied, copyText } = useClipboard(
    data?.createCredential.accessToken.accessToken as string
  );

  const onSubmit = ({ name }: CredentialForm) => {
    createCredential({
      variables: {
        input: {
          name,
          organization: organization?.id as string,
        },
      },
    });
  };

  return (
    <Modal open={true} setOpen={() => router.push('/credentials')}>
      <Card className="w-[492px] text-left">
        {pipe(isNil, not)(data) ? (
          <>
            <Typography.Header size={Size.H2} className="self-start">
              Token
            </Typography.Header>
            <Typography.Paragraph className="py-4 text-subtletext">
              Make sure to copy the token now as you will not be able to see it again
            </Typography.Paragraph>
            <div className="flex gap-2">
              <div className="shrink px-4 py-3 bg-highlightcell rounded-md truncate">
                {data?.createCredential.accessToken.accessToken}
              </div>
              <button
                onClick={copyText}
                className="flex-none aspect-square rounded-md w-12 flex items-center justify-center bg-highlightcell"
              >
                {copied ? <Icon.Check /> : <Icon.Copy />}
              </button>
            </div>
            <aside className="text-sm text-gray-500 mt-1">
              {data?.createCredential.accessToken.expiresAt &&
                `Expires at ${format(
                  convertLocalTime(data?.createCredential.accessToken.expiresAt),
                  DateFormat.TIME_1
                )}, ${format(
                  convertLocalTime(data?.createCredential.accessToken.expiresAt),
                  DateFormat.DATE_1
                )}`}
            </aside>
            <Button
              className="mt-2"
              variant="tertiary"
              size="large"
              block
              onClick={() => {
                router.push('/credentials');
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H2}>Generate token</Typography.Header>
            <Typography.Header size={Size.H3} color={TextColor.SubtleText}>
              Fill required details to generate access token.
            </Typography.Header>
            <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
              <Form.Label name="Name" className="text-xs mt-4">
                <Form.Input {...register('name')} autoFocus placeholder="e.g. Service A" />
                <Form.Error message="" />
              </Form.Label>
              <hr className="w-full bg-divider my-4 h-px border-0" />
              <div className="flex items-center justify-between">
                <Link href="/credentials">
                  <Button className="self-start" variant="secondary" disabled={loading}>
                    Cancel
                  </Button>
                </Link>
                <Button htmlType="submit" className="self-end" loading={loading} disabled={loading}>
                  Generate token
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>
    </Modal>
  );
}
