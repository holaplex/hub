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
          Transfer tokens
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <Form.Label name="Wallet name" className="text-xs text-primary">
            <Form.Input />
          </Form.Label>
          <Form.Label
            name="Amount"
            className="text-xs text-primary mt-5"
            asideComponent={
              <div
                className="text-primary font-semibold text-xs cursor-pointer"
                onClick={() => {
                  console.log('Max clicked');
                }}
              >
                MAX
              </div>
            }
          >
            <Form.Input />
          </Form.Label>
          <div className="flex items-center gap-1 text-xs font-medium">
            <span className="text-gray-500">Balance:</span>
            <span className="text-primary">0.456 SOL</span>
          </div>
          <Form.Error message="" />
          <Form.Label name="To wallet address" className="text-xs text-primary mt-5">
            <Form.Input />
          </Form.Label>
          <Form.Error message="" />

          <Button htmlType="submit" className="w-full mt-5">
            Transfer
          </Button>
          <Button className="w-full mt-5" variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
