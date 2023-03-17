'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { CreateProjectInput, Project } from '../../../../../graphql.types';

export default function EditProject({ project }: { project: Project }) {
  const router = useRouter();

  const { handleSubmit, register } = useForm<CreateProjectInput>({
    defaultValues: {
      name: project.name,
      organization: project.organizationId,
    },
  });
  // TODO: Add edit project mutation
  const loading = false;

  const submit = async () => {};

  const onClose = () => {
    if (loading) {
      return;
    }

    router.push('/projects');
  };
  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2} className="self-start">
          Edit project
        </Typography.Header>
        <Typography.Header size={Size.H3} className="self-start">
          Enter project name and logo.
        </Typography.Header>

        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <Form.Label name="Project name" className="text-xs text-primary">
            <Form.Input {...register('name', { required: true })} placeholder="e.g. Apple events" />
          </Form.Label>
          <Form.Error message="" />

          <Button htmlType="submit" className="w-full mt-5" disabled={loading}>
            Save changes
          </Button>

          <Button className="w-full mt-5" variant="tertiary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
        </Form>
      </Card>
    </Modal>
  );
}
