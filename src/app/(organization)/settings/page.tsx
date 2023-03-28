'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form } from '@holaplex/ui-library-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from '../../../components/Card';
import Divider from '../../../components/Divider';
import Typography, { Size } from '../../../components/Typography';
import {
  EditOrganizationInput,
  EditOrganizationPayload,
  InputMaybe,
} from './../../../graphql.types';
import { uploadFile } from '../../../modules/upload';
import { EditOrganization as EditOrganizationMutation } from './../../../mutations/organization.graphql';
import { GetOrganizationBasicInfo } from './../../../queries/organization.graphql';
import { useOrganization } from '../../../hooks/useOrganization';

interface EditOrganizationData {
  editOrganization: EditOrganizationPayload;
}

interface EditOrganizationVars {
  input: EditOrganizationInput;
}

interface EditOrganizationForm {
  name: string;
  profileImage: File | string | undefined;
}

export default function OrganizationSettingsPage() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { control, register, handleSubmit, reset, setValue, formState } =
    useForm<EditOrganizationForm>({
      defaultValues: {
        name: organization?.name,
        profileImage: organization?.profileImageUrl as string | undefined,
      },
    });

  const [editOrganization, { data, loading, error }] = useMutation<
    EditOrganizationData,
    EditOrganizationVars
  >(EditOrganizationMutation, {
    refetchQueries: [
      { query: GetOrganizationBasicInfo, variables: { organization: organization?.id } },
    ],
  });

  const submit = async ({ name, profileImage }: EditOrganizationForm) => {
    let profileImageUrl = profileImage;

    if (profileImage instanceof File) {
      const { url } = await uploadFile(profileImage);
      profileImageUrl = url;
    }

    editOrganization({
      variables: {
        input: {
          id: organization?.id,
          name,
          profileImageUrl: profileImageUrl as InputMaybe<string>,
        },
      },
      onCompleted: async () => {
        toast('Your organization was successfully updated.');
        router.push('/projects');
      },
    });
  };

  return (
    <article className="flex flex-col p-4">
      <Typography.Header size={Size.H2}>Settings</Typography.Header>
      <Card className="w-[400px] place-self-center mt-4">
        <Typography.Header size={Size.H3}>Update your organization information.</Typography.Header>

        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
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
              name="profileImage"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => (
                <Dropzone
                  noClick
                  multiple={false}
                  onDrop={([file], _reject, e) => {
                    setValue('profileImage', file as unknown as File, { shouldValidate: true });
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
                        <input {...getInputProps({ onBlur })} />
                        {value ? (
                          <div className="bg-white rounded-lg p-3 overflow-hidden">
                            <Form.DragDrop.Preview value={value} />
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
            disabled={loading || formState.isSubmitting}
            loading={loading || formState.isSubmitting}
            className="w-full bg-primary text-white p-2 mt-5"
          >
            Update settings
          </Button>
        </Form>
      </Card>
    </article>
  );
}
