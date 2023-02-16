'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { useRouter } from 'next/navigation';
import { Icon } from '../../../../../components/Icon';

export default function MemberDeletePage() {
  const router = useRouter();

  const onClose = () => {
    router.push('/members');
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Do you really want to delete [name]?</Typography.Header>
        <Typography.Header size={Size.H3}>This action cannot be reversed.</Typography.Header>

        <Form className="flex flex-col mt-5">
          <div className="flex items-start gap-2 rounded-md bg-gray-50 p-3">
            <Icon.Info />
            <span className="text-xs text-gray-500 font-medium">
              The member will be deprived of access to the project
            </span>
          </div>
          <Button htmlType="submit" className="w-full mt-5" variant="failure">
            Delete member
          </Button>
          <Button variant="tertiary" className="w-full mt-5" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
