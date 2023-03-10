'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { usePathname, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
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
    defaultValues: stepTwo || { creators: [{ address: '', share: 100 }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'creators',
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
          {fields.map((field, index) => (
            <div className="flex gap-4" key={field.id}>
              <Form.Label
                name="Wallet"
                className="text-xs mt-5 basis-3/4"
                asideComponent={<Icon.Help />}
              >
                <Form.Input
                  {...register(`creators.${index}.address`)}
                  placeholder="Paste royalty wallet address"
                />
                <Form.Error message="" />
              </Form.Label>

              <Form.Label
                name="Royalties"
                className="text-xs mt-5 basis-1/4"
                asideComponent={<Icon.Help />}
              >
                <Form.Input
                  {...register(`creators.${index}.share`)}
                  placeholder="e.g. 10%"
                  defaultValue={index === 0 ? 100 : Number()}
                />
                <Form.Error message="" />
              </Form.Label>

              {fields.length > 1 && (
                <div
                  className="rounded-md border border-gray-100 bg-gray-50 p-3 self-end cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <Icon.Close />
                </div>
              )}
            </div>
          ))}

          <Button
            className="mt-4 self-start"
            variant="secondary"
            onClick={() => append({ address: '', share: Number() })}
          >
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
