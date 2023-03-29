'use client';

import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Card from '../../../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import useCreateDropStore, {
  StepThreeData,
} from '../../../../../../../../../hooks/useCreateDropStore';
import { useProject } from '../../../../../../../../../hooks/useProject';

export default function NewDropTimingPage() {
  const router = useRouter();
  const { project } = useProject();
  const { stepThree, setData } = useCreateDropStore();
  const { handleSubmit, register } = useForm<StepThreeData>({ defaultValues: stepThree || {} });
  const submit = (data: StepThreeData) => {
    setData({ step: 3, data });
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/preview`);
  };

  const back = () => {
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/royalties`);
  };

  return (
    <>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Mint date</Typography.Header>
        <Typography.Header size={Size.H3}>Scheduled in your current timezone</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          {/* Start Date */}
          <div className="flex gap-4 items-end">
            <Form.Label name="Start date" className="text-xs mt-5 basis-3/5">
              <Form.Input {...register('startDate')} type="date" />
              <Form.Error message="" />
            </Form.Label>

            <Form.Label name="Start time" className="text-xs mt-5 basis-2/5">
              <Form.Input {...register('startTime')} type="time" />
              <Form.Error message="" />
            </Form.Label>
          </div>

          {/* End Date */}
          <div className="flex gap-4 items-end">
            <Form.Label name="End date" className="text-xs mt-5 basis-3/5">
              <Form.Input {...register('endDate')} type="date" />
              <Form.Error message="" />
            </Form.Label>

            <Form.Label name="End time" className="text-xs mt-5 basis-2/5">
              <Form.Input {...register('endTime')} type="time" />
              <Form.Error message="" />
            </Form.Label>
          </div>

          <Form.Checkbox
            {...register('startNow')}
            id="mintImmediately"
            className="mt-7"
            label={
              <span className="text-xs font-medium text-primary">
                I want to start minting immediately
              </span>
            }
          />

          <Form.Checkbox
            {...register('noEndTime')}
            id="noEndOfSales"
            className="mt-3"
            label={
              <span className="text-xs font-medium text-primary">
                I do not need to end collection sales
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
