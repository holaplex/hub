'use client';
import Link from 'next/link';
import Card from './../../../components/Card';
import Typography, { Size } from './../../../components/Typography';
import { Button, Form } from '@holaplex/ui-library-react';
import { FetchResult, useMutation } from '@apollo/client';
import { CreateOrganization } from './../../../mutations/organization.graphql';
import { CreateOrganizationInput, Organization } from '../../../graphql.types';
import { useForm } from 'react-hook-form';

interface CreateOrganizationData {
  organization: Organization;
}

interface CreateOrganizationVariables {
  input: CreateOrganizationInput;
}

export default function CreateOrganizationPage() {
  const [createOrganization, { data, loading, error }] = useMutation<
    CreateOrganizationData,
    CreateOrganizationVariables
  >(CreateOrganization);

  const { handleSubmit, register } = useForm<CreateOrganizationInput>();

  const submit = async (data: CreateOrganizationInput) => {
    if (!data.name) {
      return;
    }

    createOrganization({
      variables: {
        input: { name: data.name },
      },
    }).then(
      (data: FetchResult<CreateOrganizationData, Record<string, any>, Record<string, any>>) => {
        console.log('Result data', data.data?.organization);
      }
    );
  };

  // const handleDrop = (file: File) => {
  //   console.log(file);
  // };

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
