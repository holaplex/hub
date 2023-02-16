'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';
import { useRouter } from 'next/navigation';

export default function NewProjectPage() {
  const router = useRouter();

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

        <Form className="flex flex-col mt-5">
          <Form.Label name="Project name" className="text-xs text-primary">
            <Form.Input placeholder="e.g. Apple events" />
          </Form.Label>

          <Form.Error message="" />

          <Button htmlType="submit" className="w-full mt-5">
            Create
          </Button>
          <Button className="w-full mt-5" variant="tertiary" onClick={() => {}}>
            Cancel
          </Button>
          {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
        </Form>
      </Card>
    </Modal>
  );
}
