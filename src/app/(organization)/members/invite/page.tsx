"use client";
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../components/Card';
import Typography, { Size } from '../../../../components/Typography';
import { useRouter } from 'next/navigation';

export default function MemberInvitePage() {
  const router = useRouter();

  const onClose = () => {
    router.push('/members');
  };

  return (
    <Modal
      open={true}
      setOpen={onClose}
    >
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Invite new member to</Typography.Header>
        <Typography.Header size={Size.H3}>Enter member email address to invite.</Typography.Header>

        <Form className="flex flex-col mt-5">
          <Form.Label name="Member email address" className="text-xs text-primary">
            <Form.Input placeholder="name@example.com" />
          </Form.Label>
          <Form.Error message="" />
          <Button htmlType="submit" className="w-full mt-5">
            Send invite
          </Button>
          <Button
            variant="tertiary"
            className="w-full mt-5 "
            onClick={onClose}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
