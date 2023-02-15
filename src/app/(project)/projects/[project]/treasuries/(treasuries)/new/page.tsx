'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../components/Typography';

export default function MemberDeletePage() {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2} className="self-start">
          Add wallet
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <Form.Label name="Wallet name" className="text-xs mt-5 text-primary">
            <Form.Select
              placeholder="Select wallet"
              options={[
                { option: 'Main wallet', value: 'main_wallet' },
                { option: 'Test wallet', value: 'text_wallet' },
              ]}
            />
          </Form.Label>
          <Form.Label name="Blockchain" className="text-xs mt-5 text-primary">
            <Form.Select
              placeholder="Select blockchain"
              options={[
                { option: 'Solana', value: 'solana' },
                { option: 'Polygon', value: 'polygon' },
              ]}
            />
          </Form.Label>
          <Button className="w-full mt-4" onClick={() => {}}>
            Add wallet
          </Button>
          <Button className="w-full mt-4" variant="tertiary" onClick={onClose}>
            Cancel
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
