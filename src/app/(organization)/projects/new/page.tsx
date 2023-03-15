'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import { CreateProjectInput, CreateProjectPayload } from '../../../../graphql.types';
import { GetOrganizationProjects } from './../../../../queries/organization.graphql';
import { CreateProject } from './../../../../mutations/project.graphql';
import { useMutation } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import { useOrganization } from '../../../../hooks/useOrganization';
import clsx from 'clsx';
import Divider from '../../../../components/Divider';


interface CreateProjectData {
  createProject: CreateProjectPayload;
}

interface CreateProjectVars {
  input: CreateProjectInput;
}

interface CreateProjectForm {
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

export default function NewProjectPage() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { control, register, handleSubmit, formState, setValue } = useForm<CreateProjectForm>();
  const [createProject, { loading }] = useMutation<CreateProjectData, CreateProjectVars>(
    CreateProject,
    {
      refetchQueries: [
        { query: GetOrganizationProjects, variables: { organization: organization?.id } },
      ],
    }
  );

  const onSubmit = async ({ name, file }: CreateProjectForm) => {
    const { url: profileImageUrl } = await uploadFile(file);

    createProject({
      variables: { input: { name, organization: organization?.id, profileImageUrl } },
      onCompleted: () => {
        router.push('/projects');
      },
    });
  };

  return (
    <Modal
      open={true}
      setOpen={() => {
        router.push('/projects');
      }}
    >
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2} className="self-start">
          Create new project
        </Typography.Header>
        <Typography.Header size={Size.H3} className="self-start">
          Enter project name and upload a logo.
        </Typography.Header>

        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
          <Form.Label name="Project name" className="text-xs text-primary">
            <Form.Input
              autoFocus
              placeholder="e.g. Apple events"
              {...register('name', { required: true })}
            />
            <Form.Error message={formState.errors.name?.message} />
          </Form.Label>
          <Form.Label name="Project logo" className="text-xs text-primary mt-5">
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
                              Drag & drop photo here <br />
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
          <Button htmlType="submit" className="w-full mt-5" loading={loading} disabled={loading}>
            Create
          </Button>
          <Button
            className="w-full mt-5"
            variant="tertiary"
            disabled={loading}
            onClick={() => {
              router.push('/projects');
            }}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
