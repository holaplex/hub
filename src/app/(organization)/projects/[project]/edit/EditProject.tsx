'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Divider from '../../../../../components/Divider';
import Typography, { Size } from '../../../../../components/Typography';
import {
  EditProjectInput,
  EditProjectPayload,
  Project,
  InputMaybe,
} from '../../../../../graphql.types';
import { useOrganization } from '../../../../../hooks/useOrganization';
import { uploadFile } from '../../../../../modules/upload';
import { GetProject } from '../../../../../queries/project.graphql';
import { GetOrganizationProjects } from '../../../../../queries/organization.graphql';
import { EditProject as EditProjectMutation } from './../../../../../mutations/project.graphql';

interface GetProjectData {
  project: Project;
}

interface GetProjectVars {
  project: string;
}

interface EditProjectVars {
  input: EditProjectInput;
}

interface EditProjectData {
  editProject: EditProjectPayload;
}
interface EditProjectForm {
  name: string;
  profileImage: string | File | undefined;
}

export default function EditProject({ project }: { project: string }) {
  const router = useRouter();
  const { organization } = useOrganization();

  const { control, register, handleSubmit, formState, setValue, reset } =
    useForm<EditProjectForm>();

  const projectQuery = useQuery<GetProjectData, GetProjectVars>(GetProject, {
    variables: { project },
  });

  const projectData = projectQuery.data?.project;

  const onClose = () => {
    router.push('/projects');
  };

  const [editProject, editProjectResult] = useMutation<EditProjectData, EditProjectVars>(
    EditProjectMutation,
    {
      awaitRefetchQueries: true,
      refetchQueries: [
        { query: GetOrganizationProjects, variables: { organization: organization?.id } },
      ],
    }
  );

  const loading = editProjectResult.loading || formState.isSubmitting;

  const submit = async ({ name, profileImage }: EditProjectForm) => {
    let profileImageUrl = profileImage;

    if (profileImage instanceof File) {
      const { url } = await uploadFile(profileImage);
      profileImageUrl = url;
    }

    editProject({
      variables: {
        input: {
          id: project,
          name,
          profileImageUrl: profileImageUrl as InputMaybe<string>,
        },
      },
      onCompleted: () => {
        toast.success('Your project was successfully updated.');
        router.push('/projects');
      },
    });
  };

  useEffect(() => {
    if (projectData) {
      reset({
        name: projectData.name,
        profileImage: projectData?.profileImageUrl as string | undefined,
      });
    }
  }, [reset, projectData]);

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        {projectQuery.loading ? (
          <>
            <div className="bg-gray-100 animate-pulse h-6 w-24 rounded-md" />
            <div className="bg-gray-100 animate-pulse h-4 w-40 rounded-md mt-2" />
            <div className="bg-gray-100 animate-pulse h-4 w-20 rounded-md mt-5" />
            <div className="bg-gray-100 animate-pulse h-10 w-full rounded-md mt-2" />
            <div className="bg-gray-100 animate-pulse h-4 w-20 rounded-md mt-5" />
            <div className="bg-gray-100 animate-pulse h-44 w-full rounded-md mt-2" />
            <div className="bg-gray-100 animate-pulse h-10 w-full rounded-md mt-5" />
            <div className="bg-gray-100 animate-pulse h-10 w-full rounded-md mt-5" />
          </>
        ) : (
          <>
            <Typography.Header size={Size.H2} className="self-start">
              Edit project
            </Typography.Header>
            <Typography.Header size={Size.H3} className="self-start">
              Enter project name and logo.
            </Typography.Header>

            <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
              <Form.Label name="Project name" className="text-xs text-primary">
                <Form.Input
                  autoFocus
                  placeholder="e.g. Apple events"
                  {...register('name', { required: 'Please enter a name.' })}
                />
                <Form.Error message={formState.errors.name?.message} />
              </Form.Label>

              <Form.Label name="Project logo" className="text-xs text-primary mt-5">
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
                disabled={loading}
                loading={loading}
              >
                Update project
              </Button>

              <Button
                className="w-full mt-5"
                variant="tertiary"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </Form>
          </>
        )}
      </Card>
    </Modal>
  );
}
