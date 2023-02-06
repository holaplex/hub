'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Card from '../../../../../components/Card';
import { Icon } from '../../../../../components/Icon';
import Typography, { Size } from '../../../../../components/Typography';
import useFormStore, { StepTwoData } from '../../../../../store/useFormStore';

export default function CreateDropStep2() {
  const router = useRouter();
  const { stepTwo, setData } = useFormStore();
  console.log('step 2 data', stepTwo);
  const { handleSubmit, register } = useForm<StepTwoData>({ defaultValues: stepTwo || {} });

  const submit = (data: StepTwoData) => {
    setData({ step: 2, data });
    router.push('/organizations/drops/create/timing');
  };

  const back = () => {
    router.push('/organizations/drops/create/details');
  };

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Payment & royalties</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <div className="flex gap-4">
            <Form.Label name="Max supply" className="text-xs mt-5" asideComponent={<Icon.Help />}>
              <Form.Input
                {...register('maxSupply', { required: true })}
                autoFocus
                placeholder="e.g. 10,000"
              />
              <Form.Error message="" />
            </Form.Label>

            <Form.Label name="Price in SOL" className="text-xs mt-5" asideComponent={<Icon.Help />}>
              <Form.Input {...register('solPrice', { required: true })} placeholder="e.g. 100" />
              <Form.Error message="" />
            </Form.Label>
          </div>

          <Form.Label name="Treasury" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Form.Input
              {...register('treasuryWallet', { required: true })}
              type="range"
              placeholder="Select treasury"
            />
            <Form.Error message="" />
          </Form.Label>

          <div className="flex gap-2 items-start bg-gray-50 rounded-md p-3 mt-2">
            <Icon.Balance />
            <span className="text-gray-500 text-xs font-medium">
              Make sure you have enough tokens for a fee in your treasruty wallet. Estimated minting
              price should be <span className="text-primary">[Price]</span>
            </span>
          </div>

          <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

          <span className="text-sm text-primary font-medium">Royalties</span>

          {/* TODO: Add checkbox to ui-library */}
          <div className="flex gap-2 mt-4">
            <input {...register('royaltyInTreasuryWallet')} type="checkbox" />
            <span className="text-xs font-medium text-primary">
              I want to receive all royalties to the selected treasury wallet
            </span>
          </div>

          <div className="flex gap-4">
            <Form.Label name="Wallet" className="text-xs mt-5" asideComponent={<Icon.Help />}>
              <Form.Input placeholder="Paste royalty wallet address" />
              <Form.Error message="" />
            </Form.Label>

            <Form.Label name="Royalties" className="text-xs mt-5" asideComponent={<Icon.Help />}>
              <Form.Input placeholder="e.g. 10%" />
              <Form.Error message="" />
            </Form.Label>
          </div>

          <Button className="mt-4 self-start" variant="secondary">
            Add wallet
          </Button>

          <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

          <span className="text-sm text-primary font-medium">
            Secondary sale royalties <span className="text-gray-500">(optional)</span>
          </span>

          <Form.Label name="Seller fee" className="text-xs mt-3" asideComponent={<Icon.Help />}>
            <Form.Input
              {...register('secondarySaleSellerFeePercent', { required: true })}
              placeholder="e.g. 2.5%"
            />
            <Form.Error message="" />
          </Form.Label>

          <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />
          <div className="flex items-center justify-between">
            <Button className="self-start" variant="tertiary" onClick={back}>
              Back
            </Button>
            <Button htmlType="submit" className="self-end">
              Next
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
}
