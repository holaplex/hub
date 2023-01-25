import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { Dispatch, SetStateAction } from 'react';
import Card from './Card';
import Typography, { Size } from './Typography';

interface CreateProjectProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>> | ((open: boolean) => void);
}

export default function CreateProject({ open, setOpen }: CreateProjectProps) {
  return (
    <Modal open={open} setOpen={setOpen}>
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

          <Button
            border="rounded"
            htmlType="submit"
            className="w-full bg-primary text-white p-3 mt-5 text-xs font-semibold "
          >
            Create
          </Button>
          <Button
            border="rounded"
            className="w-full bg-white text-black p-3 mt-5 text-xs font-semibold"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
        </Form>
      </Card>
    </Modal>
  );
}
