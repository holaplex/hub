'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { usePathname, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import Card from '../../../../../../../components/Card';
import DragDropImage from '../../../../../../../components/DragDropImage';
import { Icon } from '../../../../../../../components/Icon';
import Typography, { Size } from '../../../../../../../components/Typography';
import useCreateDropStore, { StepOneData } from '../../../../../../../store/useCreateDropStore';

export default function CreateDropStep1() {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[2] : null;
  const { stepOne, setData } = useCreateDropStore();
  const { handleSubmit, register } = useForm<StepOneData>({ defaultValues: stepOne || {} });
  const submit = (data: StepOneData) => {
    setData({ step: 1, data });
    router.push(`/projects/${slug}/drops/create/royalties`);
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
            <Controller
              name="blockchain"
              render={({ field: { value, onChange } }) => {
                return (
                  <Form.Select value={value} onChange={onChange}>
                    <Form.Select.Button placeholder="Select blockchain">
                      {value.value}
                    </Form.Select.Button>
                    <Form.Select.Options>
                      {[
                        { option: 'Solana', value: 'solana' },
                        { option: 'Polygon (Coming Soon)', value: 'polygon' },
                      ].map((i) => (
                        <Form.Select.Option value={i} key={i.value}>
                          <>{i.option}</>
                        </Form.Select.Option>
                      ))}
                    </Form.Select.Options>
                  </Form.Select>
                );
              }}
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
