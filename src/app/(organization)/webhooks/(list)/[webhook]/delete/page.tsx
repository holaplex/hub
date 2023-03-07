'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../../components/Card';
import Typography, { Size } from '../../../../../../components/Typography';

export default function MemberDeletePage() {
  const router = useRouter();

  const onClose = () => {
    router.push('/members');
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Delete webhook?</Typography.Header>
        <Typography.Header size={Size.H3}>
          Are you sure you want to delete [Name] webhook and all its contents?
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <Button htmlType="submit" className="w-full mt-5" variant="failure">
            Delete
          </Button>
          <Button variant="tertiary" className="w-full mt-5 " onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
