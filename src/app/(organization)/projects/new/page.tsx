'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';
import { useRouter } from 'next/navigation';
import { CreateProjectInput, CreateProjectPayload } from '../../../../graphql.types';
import { GetOrganizationProjects } from './../../../../queries/organization.graphql';
import { CreateProject } from './../../../../mutations/project.graphql';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useOrganization } from '../../../../hooks/useOrganization';

interface CreateProjectData {
  createProject: CreateProjectPayload;
}

interface CreateProjectVars {
  input: CreateProjectInput;
}

interface CreateProjectForm {
  name: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<CreateProjectForm>();
  const { organization } = useOrganization();
  const [createProject, { loading }] = useMutation<CreateProjectData, CreateProjectVars>(
    CreateProject,
    {
      refetchQueries: [
        { query: GetOrganizationProjects, variables: { organization: organization?.id } },
      ],
    }
  );

  const onSubmit = ({ name }: CreateProjectForm) => {
    createProject({
      variables: { input: { name, organization: organization?.id } },
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
            <Form.Input autoFocus placeholder="e.g. Apple events" {...register('name', { required: true })} />
            <Form.Error message={formState.errors.name?.message} />
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
          {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
        </Form>
      </Card>
    </Modal>
  );
}