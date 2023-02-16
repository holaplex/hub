'use client';
import Link from 'next/link';
import Card from './../../../components/Card';
import Typography, { Size } from './../../../components/Typography';
import { Button, Form } from '@holaplex/ui-library-react';
import { FetchResult, useMutation } from '@apollo/client';
import { CreateOrganization } from './../../../mutations/organization.graphql';
import {
  CreateOrganizationInput,
  CreateOrganizationPayload,
  Organization,
} from '../../../graphql.types';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface CreateOrganizationData {
  createOrganization: CreateOrganizationPayload;
}

interface CreateOrganizationVariables {
  input: CreateOrganizationInput;
}

export default function CreateOrganizationPage() {
  const [createOrganization, { data, loading, error }] = useMutation<
    CreateOrganizationData,
    CreateOrganizationVariables
  >(CreateOrganization);
  const router = useRouter();

  const { handleSubmit, register } = useForm<CreateOrganizationInput>();

  const submit = async ({ name }: CreateOrganizationInput) => {
    createOrganization({
      variables: {
        input: { name },
      },
      onCompleted: async ({ createOrganization: { organization } }) => {
        const response = await fetch(`/browser/organizations/${organization.id}/select`, {
          method: 'POST',
        });

        const json: { redirect_path: string } = await response.json();

        router.push(json.redirect_path);
      },
    });
  };

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Create an organization</Typography.Header>
      <Typography.Header size={Size.H3}>Enter your organization information.</Typography.Header>

      <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
        <Form.Label name="Organization name" className="text-xs">
          <Form.Input {...register('name', { required: true })} placeholder="e.g. Apple" />
        </Form.Label>
        <Form.Error message={error?.message} />

        <Button
          border="rounded"
          htmlType="submit"
          disabled={loading}
          loading={loading}
          className="w-full bg-primary text-white p-2 mt-5"
        >
          Create
        </Button>
        {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
      </Form>
      <span className="flex-wrap text-gray-500 text-xs mt-2">
        By pressing &quot;Create an aсcount&quot;, I agree to Holaplex{' '}
        <Link href="" className="text-primary">
          Terms of Use
        </Link>{' '}
        and{' '}
        <Link href="" className="text-primary">
          Privacy Policy.
        </Link>
      </span>
    </Card>
  );
}
