'use client';
import Link from './../../../components/Link';
import Card from './../../../components/Card';
import Typography, { Size } from './../../../components/Typography';
import { Button, Form } from '@holaplex/ui-library-react';
import { useMutation } from '@apollo/client';
import { CreateOrganization } from './../../../mutations/organization.graphql';
import { CreateOrganizationInput, CreateOrganizationPayload } from '../../../graphql.types';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import clsx from 'clsx';
import Divider from '../../../components/Divider';
import { uploadFile } from '../../../modules/upload';

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

export default function CreateOrganizationPage() {
  const router = useRouter();
  const { control, register, handleSubmit, formState, setValue } =
    useForm<CreateOrganizationForm>();

  const [createOrganization, { data, loading, error }] = useMutation<
    CreateOrganizationData,
    CreateOrganizationVariables
  >(CreateOrganization);

  const onSubmit = async ({ name, file }: CreateOrganizationForm) => {
    let profileImageUrl;
    if (file) {
      const { uri } = await uploadFile(file);
      profileImageUrl = uri;
    }

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
        </Form.Label>
        <Form.Error message={error?.message} />
        <Form.Label name="Organization logo" className="text-xs text-white mt-5">
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
                        'flex items-center justify-center border border-dashed border-stone-800 cursor-pointer rounded-md p-6 text-center text-gray-400',
                        {
                          'bg-stone-950': isDragActive,
                        }
                      )}
                    >
                      <input {...getInputProps({ onBlur })} />
                      {value ? (
                        <Form.DragDrop.Preview value={value} />
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
          htmlType="submit"
          disabled={loading || formState.isSubmitting}
          loading={loading || formState.isSubmitting}
          className="w-full bg-primary text-white p-2 mt-5"
        >
          Create
        </Button>
      </Form>
    </Card>
  );
}
