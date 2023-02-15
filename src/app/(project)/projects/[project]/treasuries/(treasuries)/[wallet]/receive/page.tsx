'use client';
import { Button, Form, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../../../../components/Card';
import { Icon } from '../../../../../../../../components/Icon';
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
          Receive tokens
        </Typography.Header>

        <Form className="flex flex-col mt-5">
          <Form.Label name="Wallet" className="text-xs mt-5 text-primary">
            <Form.Select
              placeholder="Select wallet"
              options={[
                { option: 'Main wallet', value: 'main_wallet' },
                { option: 'Test wallet', value: 'text_wallet' },
              ]}
            />
          </Form.Label>

          <Form.Error message="" />
          <div className="flex bg-gray-50 rounded-md p-3 mt-5">
            <Icon.EmptyAvatar className="w-32 aspect-square" />
            <div className="w-full flex flex-col justify-between items-start">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-600">Wallet address</span>
                <span className="text-sm text-primary">0xA91...a2#9</span>
              </div>
              <Button icon={<Icon.Copy stroke="#ffffff" />} className="w-full mt-4">
                Copy address
              </Button>
            </div>
          </div>

          <Button className="w-full mt-5" variant="tertiary" onClick={onClose}>
            Close
          </Button>
        </Form>
      </Card>
    </Modal>
  );
}
