import { Button, Form } from '@holaplex/ui-library-react';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { useRouter } from 'next/navigation';
import Dropzone from 'react-dropzone';
import { CreateProjectInput, CreateProjectPayload } from '../../../graphql.types';
import { GetOrganizationProjects } from './../../../queries/organization.graphql';
import { CreateProject } from './../../../mutations/project.graphql';
import { ApolloError, useMutation } from '@apollo/client';
import { Controller, useForm } from 'react-hook-form';
import { useOrganization } from '../../../hooks/useOrganization';
import clsx from 'clsx';
import Divider from '../../../components/Divider';
import { uploadFile } from '../../../modules/upload';
import { toast } from 'react-toastify';

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

export default function NewProject() {
  const router = useRouter();
  const { organization } = useOrganization();
  const { control, register, handleSubmit, formState, setValue } = useForm<CreateProjectForm>();
  const [createProject, { loading }] = useMutation<CreateProjectData, CreateProjectVars>(
    CreateProject,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GetOrganizationProjects, variables: { organization: organization?.id } },
      ],
    }
  );

  const onSubmit = async ({ name, file }: CreateProjectForm) => {
    let profileImageUrl;
    if (file) {
      const { uri } = await uploadFile(file);
      profileImageUrl = uri;
    }

    createProject({
      variables: { input: { name, organization: organization?.id, profileImageUrl } },
      onCompleted: () => {
        router.push('/projects');
      },
      onError: (error: ApolloError) => {
        toast.error(error.message);
      },
      awaitRefetchQueries: true,
    });
  };

  return (
    <div className="w-max mx-auto">
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2} className="self-start">
          Create new project
        </Typography.Header>
        <Typography.Header size={Size.H3} className="self-start">
          Enter project name and upload a logo.
        </Typography.Header>

        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(onSubmit)}>
          <Form.Label name="Project name" className="text-xs text-white">
            <Form.Input
              autoFocus
              placeholder="e.g. Apple events"
              {...register('name', { required: true })}
            />
            <Form.Error message={formState.errors.name?.message} />
          </Form.Label>
          <Form.Label name="Project logo" className="text-xs text-white mt-5">
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
          <Button
            htmlType="submit"
            className="w-full mt-5"
            loading={loading || formState.isSubmitting}
            disabled={loading || formState.isSubmitting}
          >
            Create
          </Button>
          <Button
            className="w-full mt-4"
            variant="secondary"
            disabled={loading || formState.isSubmitting}
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </div>
  );
}
