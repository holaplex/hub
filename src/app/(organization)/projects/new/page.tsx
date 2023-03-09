'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';
import { useRouter } from 'next/navigation';
import { CreateProjectInput, CreateProjectPayload } from '../../../../graphql.types';
import { GetOrganizationProjects } from './../../../../queries/organization.graphql';
import { CreateProject } from './../../../../mutations/project.graphql';
import { useMutation } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import { useOrganization } from '../../../../hooks/useOrganization';
import clsx from 'clsx';
import { useCallback } from 'react';
import useUpload from '../../../../hooks/useUpload';

interface CreateProjectData {
  createProject: CreateProjectPayload;
}

interface CreateProjectVars {
  input: CreateProjectInput;
}

interface CreateProjectForm {
  name: string;
  files: File[];
}

export default function NewProjectPage() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { control, register, handleSubmit, formState, setValue } = useForm<CreateProjectForm>();
  const onDrop = useCallback(
    (files: File[]) => {
      setValue('files', files, { shouldValidate: true });
    },
    [setValue]
  );
  const { getRootProps, getInputProps, isDragActive } = useUpload(onDrop);
  const [createProject, { loading }] = useMutation<CreateProjectData, CreateProjectVars>(
    CreateProject,
    {
      refetchQueries: [
        { query: GetOrganizationProjects, variables: { organization: organization?.id } },
      ],
    }
  );

  const onSubmit = async ({ name, files }: CreateProjectForm) => {
    let profileImageUrl;
    if (files && files.length > 0) {
      const uploadResult = await uploadFile(files[0]);
      profileImageUrl = uploadResult;
      console.log('Upload result', uploadResult);
    }
    createProject({
      variables: { input: { name, organization: organization?.id, profileImageUrl } },
      onCompleted: () => {
        router.push('/projects');
      },
    });
  };

  const uploadFile = async (file: File) => {
    const body = new FormData();
    body.append(file.name, file, file.name);

    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body,
      });
      const json = await response.json();
      return json;
    } catch (e: any) {
      console.error('Could not upload file', e);
      throw new Error(e);
    }
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
              name="files"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Form.DragDrop
                  getInputProps={getInputProps}
                  getRootProps={getRootProps}
                  isDragActive={isDragActive}
                  onChange={(e: any) => onChange(e.target.value)}
                  multiple={false}
                >
                  <div
                    className={clsx(
                      'flex items-center justify-center border border-dashed border-gray-200 cursor-pointer rounded-md',
                      {
                        'bg-gray-100': isDragActive,
                        'p-6 text-center text-gray-500': !value,
                      }
                    )}
                  >
                    {value ? (
                      <div className="bg-white rounded-lg p-3 overflow-hidden">
                        {value.map((file, index) => (
                          <Form.DragDrop.Preview key={index} file={file} />
                        ))}
                      </div>
                    ) : (
                      <>
                        Drag & drop photo here <br />
                        Required jpeg, png or svg. Max 2mb.
                      </>
                    )}
                  </div>
                </Form.DragDrop>
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
