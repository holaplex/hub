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
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';
import Divider from '../../../components/Divider';

interface CreateOrganizationData {
  createOrganization: CreateOrganizationPayload;
}

interface CreateOrganizationVariables {
  input: CreateOrganizationInput;
}

interface CreateOrganizationForm {
  name: string;
  file: File;
}

async function uploadFile(file: File): Promise<{ url: string; name: string }> {
  const body = new FormData();
  body.append(file.name, file, file.name);

  try {
    const response = await fetch('/api/uploads', {
      method: 'POST',
      body,
    });
    const json = await response.json();
    return json[0];
  } catch (e: any) {
    console.error('Could not upload file', e);
    throw new Error(e);
  }
}

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { control, register, handleSubmit, formState, setValue } =
    useForm<CreateOrganizationForm>();

  const [createOrganization, { data, loading, error }] = useMutation<
    CreateOrganizationData,
    CreateOrganizationVariables
  >(CreateOrganization);

  const onSubmit = async ({ name, file }: CreateOrganizationForm) => {
    const { url: profileImageUrl } = await uploadFile(file);
    createOrganization({
      variables: {
        input: { name, profileImageUrl },
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

      <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
        <Form.Label name="Organization name" className="text-xs">
          <Form.Input
            autoFocus
            {...register('name', { required: true })}
            placeholder="e.g. Apple"
          />
          <Form.Error message={error?.message} />
        </Form.Label>
        <Form.Label name="Organization logo" className="text-xs text-primary mt-5">
          <Controller
            name="file"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <Dropzone
                noClick
                multiple={false}
                onDrop={([file], _reject, e) => {
                  setValue('file', file as unknown as File, { shouldValidate: true });
                }}
              >
                {({ getRootProps, getInputProps, isDragActive, open }) => {
                  return (
                    <div
                      {...getRootProps()}
                      className={clsx(
                        'flex items-center justify-center border border-dashed border-gray-200 cursor-pointer rounded-md',
                        {
                          'bg-gray-100': isDragActive,
                          'p-6 text-center text-gray-500': !value,
                        }
                      )}
                    >
                      <input {...getInputProps({ onBlur, onChange })} />
                      {value ? (
                        <div className="bg-white rounded-lg p-3 overflow-hidden">
                          <Form.DragDrop.Preview file={value} />
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <p>
                            Drag & drop logo here <br />
                            Required jpeg, png or svg. Max 2mb.
                          </p>
                          <Divider.Or />
                          <Button onClick={open} variant="secondary" size="small">
                            Upload Logo
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                }}
              </Dropzone>
            )}
          />
        </Form.Label>
        <Button
          border="rounded"
          htmlType="submit"
          disabled={loading}
          loading={loading}
          className="w-full bg-primary text-white p-2 mt-5"
        >
          Create
        </Button>
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
