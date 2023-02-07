'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Card from '../../../../../components/Card';
import { Icon } from '../../../../../components/Icon';
import Typography, { Size } from '../../../../../components/Typography';
import useFormStore, { StepThreeData } from '../../../../../store/useFormStore';

export default function CreateDropStep3() {
  const router = useRouter();
  const { stepThree, setData } = useFormStore();
  const { handleSubmit, register } = useForm<StepThreeData>({ defaultValues: stepThree || {} });
  const submit = (data: StepThreeData) => {
    setData({ step: 3, data });
    router.push('/organizations/drops/create/preview');
  };

  const back = () => {
    router.push('/organizations/drops/create/royalties');
  };

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Mint date</Typography.Header>
        <Typography.Header size={Size.H3}>
          Scheduled in your current timezone [time]
        </Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          {/* Start Date */}
          <div className="flex gap-4 items-end">
            <Form.Label
              name="Start date"
              className="text-xs mt-5 basis-6/12"
              asideComponent={<Icon.Help />}
            >
              <Form.Input placeholder="mm/dd/yyyy" />
              <Form.Error message="" />
            </Form.Label>

            <Form.Label
              name="Start time"
              className="text-xs mt-5 basis-3/12"
              asideComponent={<Icon.Help />}
            >
              <Form.Input placeholder="hh : mm" />
              <Form.Error message="" />
            </Form.Label>
            <div className="flex items-end gap-1 basis-2/12">
              <div className="bg-gray-50 rounded-md p-3 text-sm text-primary cursor-pointer">
                AM
              </div>
              <div className="bg-gray-50 rounded-md p-3 text-sm text-primary cursor-pointer">
                PM
              </div>
            </div>
            <div className="bg-gray-50 rounded-md p-3 basis-1/12">
              <Icon.Calendar className="cursor-pointer" />
            </div>
          </div>

          {/* End Date */}
          <div className="flex gap-4 items-end">
            <Form.Label
              name="End date"
              className="text-xs mt-5 basis-6/12"
              asideComponent={<Icon.Help />}
            >
              <Form.Input placeholder="mm/dd/yyyy" />
              <Form.Error message="" />
            </Form.Label>

            <Form.Label
              name="End time"
              className="text-xs mt-5 basis-3/12"
              asideComponent={<Icon.Help />}
            >
              <Form.Input placeholder="hh : mm" />
              <Form.Error message="" />
            </Form.Label>
            <div className="flex items-end gap-1 basis-2/12">
              <div className="bg-gray-50 rounded-md p-3 text-sm text-primary cursor-pointer">
                AM
              </div>
              <div className="bg-gray-50 rounded-md p-3 text-sm text-primary cursor-pointer">
                PM
              </div>
            </div>
            <div className="bg-gray-50 rounded-md p-3 basis-1/12">
              <Icon.Calendar className="cursor-pointer" />
            </div>
          </div>

          <Form.Checkbox
            {...register('mintImmediately')}
            id="mintImmediately"
            className="mt-7"
            label={
              <span className="text-xs font-medium text-primary">
                I want to start minting immediately
              </span>
            }
          />

          <Form.Checkbox
            {...register('noEndOfSales')}
            id="noEndOfSales"
            className="mt-3"
            label={
              <span className="text-xs font-medium text-primary">
                I don't need to end collection sales
              </span>
            }
          />

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
