'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../../components/Typography';

export default function MemberDeletePage() {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2} className="self-start">
          Edit wallet
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <Form.Label name="Wallet name" className="text-xs text-primary">
            <Form.Input />
          </Form.Label>
          <Button htmlType="submit" className="w-full mt-4">
            Update
          </Button>
          <Button variant="tertiary" className="w-full mt-5 " onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
