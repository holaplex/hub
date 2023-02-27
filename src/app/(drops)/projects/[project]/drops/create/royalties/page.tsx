'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { usePathname, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import Card from '../../../../../../../components/Card';
import { Icon } from '../../../../../../../components/Icon';
import Typography, { Size } from '../../../../../../../components/Typography';
import useCreateDropStore, { StepTwoData } from '../../../../../../../store/useCreateDropStore';

export default function CreateDropStep2() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[2] : null;
  const { stepTwo, setData } = useCreateDropStore();
  const { handleSubmit, register, control } = useForm<StepTwoData>({
    defaultValues: stepTwo || {},
  });

  const submit = (data: StepTwoData) => {
    setData({ step: 2, data });
    router.push(`/projects/${slug}/drops/create/timing`);
  };

  const back = () => {
    router.push(`/projects/${slug}/drops/create/details`);
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
            <Form.Select value={{ option: 'Treasury Wallet 1', value: 'tw1' }} onChange={() => {}}>
              <Form.Select.Button>Treasury Wallet 1</Form.Select.Button>
              <Form.Select.Options>
                {[
                  { option: 'Treasury Wallet 1', value: 'tw1' },
                  { option: 'Treasury Wallet 2', value: 'tw2' },
                ].map((i) => (
                  <Form.Select.Option value={i} key={i.value}>
                    <>{i.option}</>
                  </Form.Select.Option>
                ))}
              </Form.Select.Options>
            </Form.Select>

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

          <Form.Checkbox
            {...register('royaltyInTreasuryWallet')}
            id="royaltyInTreasuryWallet"
            label={
              <span className="text-xs font-medium text-primary">
                I want to receive all royalties to the selected treasury wallet
              </span>
            }
          />

          <div className="flex gap-4">
            <Form.Label
              name="Wallet"
              className="text-xs mt-5 basis-3/4"
              asideComponent={<Icon.Help />}
            >
              <Form.Input placeholder="Paste royalty wallet address" />
              <Form.Error message="" />
            </Form.Label>

            <Form.Label
              name="Royalties"
              className="text-xs mt-5 basis-1/4"
              asideComponent={<Icon.Help />}
            >
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
            <Form.Input {...register('secondarySaleSellerFeePercent')} placeholder="e.g. 2.5%" />
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
