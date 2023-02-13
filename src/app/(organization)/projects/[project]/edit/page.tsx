"use client";
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';

export default function EditProject() {
  return (
    <Modal
      open={true}
      setOpen={() => {}}
    >
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2} className="self-start">
          Edit project
        </Typography.Header>
        <Typography.Header size={Size.H3} className="self-start">
          Enter project name and logo.
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <Form.Label name="Project name" className="text-xs text-primary">
            <Form.Input placeholder="e.g. Apple events" />
          </Form.Label>

          <Form.Error message="" />

          <Button htmlType="submit" className="w-full mt-5">
            Save changes 
          </Button>
          <Button
            className="w-full mt-5"
            variant="tertiary"
            onClick={() => {}}
          >
            Cancel
          </Button>
          {/* <DragDropImage onDrop={handleDrop} className="mt-5" /> */}
        </Form>
      </Card>
    </Modal>
  );
}
