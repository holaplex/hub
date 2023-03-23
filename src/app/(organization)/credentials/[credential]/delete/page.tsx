'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';

export default function DeleteCredential() {
  return (
    <Modal open={false} setOpen={(open: boolean) => {}}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Delete access token</Typography.Header>
        <Typography.Header size={Size.H3}>
          Are you sure you want to delete [name] access token and all its contents? You will not be
          able to recover this access token or its contents. This operation can not be undone.
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <Button htmlType="submit" className="w-full mt-5" variant="failure">
            Delete
          </Button>
          <Button variant="tertiary" className="w-full mt-5 " onClick={() => {}}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
