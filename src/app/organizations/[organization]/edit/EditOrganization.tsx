'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from '../../../../components/Card';
import Divider from '../../../../components/Divider';
import Typography, { Size } from '../../../../components/Typography';
import {
  EditOrganizationInput,
  EditOrganizationPayload,
  Organization,
} from '../../../../graphql.types';
import { downloadFromUrl } from '../../../../modules/downloadFile';
import { uploadFile } from '../../../../modules/upload';
import { EditOrganization as EditOrganizationMutation } from './../../../../mutations/organization.graphql';
import { GetOrganizationBasicInfo } from './../../../../queries/organization.graphql';

interface EditOrganizationData {
  editOrganization: EditOrganizationPayload;
}

interface EditOrganizationVars {
  input: EditOrganizationInput;
}

interface GetOrgData {
  organization: Organization;
}

interface GetOrgVars {
  organization: string;
}

interface EditOrganizationForm {
  name: string;
  file: File;
}

export default function EditOrganization({ organization }: { organization: string }) {
  const router = useRouter();

  const { control, register, handleSubmit, reset, setValue } = useForm<EditOrganizationForm>();

  const orgQuery = useQuery<GetOrgData, GetOrgVars>(GetOrganizationBasicInfo, {
    variables: { organization },
  });

  const orgData = orgQuery.data?.organization;

  const [editOrganization, { data, loading, error }] = useMutation<
    EditOrganizationData,
    EditOrganizationVars
  >(EditOrganizationMutation);

  const submit = async ({ name, file }: EditOrganizationForm) => {
    let profileImageUrl;
    if (file) {
      const { url } = await uploadFile(file);
      profileImageUrl = url;
    }

    editOrganization({
      variables: {
        input: {
          id: organization,
          name,
          profileImageUrl,
        },
      },
      onCompleted: async ({ editOrganization: { organization } }) => {
        toast('Your organization was successfully updated.');
        router.push('/projects');
      },
    });
  };

  useEffect(() => {
    const fetchFile = async (url: string) => {
      const file = await downloadFromUrl(url);
      reset({
        file,
      });
    };
    if (orgData) {
      if (orgData.profileImageUrl) {
        fetchFile(orgData.profileImageUrl);
      }
      reset({
        name: orgData.name,
      });
    }
  }, [reset, orgData]);

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Edit organization</Typography.Header>
      <Typography.Header size={Size.H3}>Enter your organization information.</Typography.Header>

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
                      <input {...getInputProps({ onBlur })} />
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
          Save changes
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
