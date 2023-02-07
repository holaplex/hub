'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Card from '../../../../../components/Card';
import DragDropImage from '../../../../../components/DragDropImage';
import { Icon } from '../../../../../components/Icon';
import Typography, { Size } from '../../../../../components/Typography';
import useFormStore, { StepOneData } from '../../../../../store/useFormStore';

export default function CreateDropStep1() {
  const router = useRouter();
  const { stepOne, setData } = useFormStore();
  const { handleSubmit, register } = useForm<StepOneData>({ defaultValues: stepOne || {} });
  const submit = (data: StepOneData) => {
    setData({ step: 1, data });
    router.push('/organizations/drops/create/royalties');
  };

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Drop details</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <Form.Label name="Artwork" className="text-xs" asideComponent={<Icon.Help />}>
            <DragDropImage onDrop={() => {}} />
          </Form.Label>

          <div className="flex items-center gap-4">
            <Form.Label
              name="Name"
              className="text-xs mt-5 basis-3/4"
              asideComponent={<Icon.Help />}
            >
              <Form.Input
                {...register('name', { required: true })}
                autoFocus
                placeholder="e.g. Bored Ape Yatch Club"
              />
              <Form.Error message="" />
            </Form.Label>
            <Form.Label
              name="Symbol"
              className="text-xs mt-5 basis-1/4"
              asideComponent={<Icon.Help />}
            >
              <Form.Input {...register('symbol', { required: true })} placeholder="e.g. BAYC" />
              <Form.Error message="" />
            </Form.Label>
          </div>

          <Form.Label name="Blockchain" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Form.Select
              {...register('blockchain', { required: true })}
              placeholder="Select blockchain"
              options={[
                { option: 'Solana', value: 'solana' },
                { option: 'Polygon', value: 'polygon' },
              ]}
            />
          </Form.Label>
          <Form.Label name="Description" className="text-xs mt-5" asideComponent={<Icon.Help />}>
            <Form.Input
              {...register('description', { required: true })}
              placeholder="Description should have atleast 40 symbols."
            />
            <Form.Error message="" />
          </Form.Label>
          <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />
          <Button htmlType="submit" className="self-end">
            Next
          </Button>
        </Form>
      </Card>
    </>
  );
}
