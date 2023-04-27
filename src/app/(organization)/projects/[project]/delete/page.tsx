'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { Icon } from '../../../../../components/Icon';

export default function DeleteProject() {
  return (
    <>
      <Modal open={true} setOpen={(open: boolean) => {}}>
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2} className="self-start">
            Delete project
          </Typography.Header>
          <Typography.Header size={Size.H3} className="self-start">
            You are deleting a project which has funds in a treasury wallet. First need to transfer
            funds to delete this project.
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <Button htmlType="submit" className="w-full mt-5">
              Transfer funds
            </Button>
            <Button variant="secondary" className="w-full mt-4" onClick={() => {}}>
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal open={false} setOpen={(open: boolean) => {}}>
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Delete project</Typography.Header>
          <Typography.Header size={Size.H3}>
            Are you sure you want to delete [Name] project and all its contents?
          </Typography.Header>

          <Form className="flex flex-col mt-5">
            <div className="flex items-start gap-2 rounded-md bg-stone-800 p-3">
              <Icon.CheckBox />
              <span className="text-xs text-gray-400 font-medium">
                I want to delete the project permanently
              </span>
            </div>
            <Button htmlType="submit" className="w-full mt-5" variant="failure">
              Delete
            </Button>
            <Button variant="secondary" className="w-full mt-4" onClick={() => {}}>
              Cancel
            </Button>
          </Form>
        </Card>
      </Modal>
    </>
  );
}
