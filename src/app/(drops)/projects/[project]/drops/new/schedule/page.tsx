'use client';

import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Card from '../../../../../../../components/Card';
import Typography, { Size, TextColor } from '../../../../../../../components/Typography';
import { StoreApi, useStore } from 'zustand';
import { TimingSettings, DropFormState } from '../../../../../../../providers/DropFormProvider';
import { useDropForm } from '../../../../../../../hooks/useDropForm';
import { useProject } from '../../../../../../../hooks/useProject';

export default function NewDropTimingPage() {
  const router = useRouter();
  const { project } = useProject();
  const store = useDropForm() as StoreApi<DropFormState>;

  const timing = useStore(store, (store) => store.timing);
  const setTiming = useStore(store, (store) => store.setTiming);
  const { handleSubmit, register, watch } = useForm<TimingSettings>({
    defaultValues: timing || {
      selectStartDate: 'mintImmediately',
      selectEndDate: 'neverEnd',
    },
  });

  const selectStartDate = watch('selectStartDate');
  const selectEndDate = watch('selectEndDate');

  const submit = (data: TimingSettings) => {
    setTiming(data);
    router.push(`/projects/${project?.id}/drops/new/preview`);
  };

  const back = () => {
    router.push(`/projects/${project?.id}/drops/new/royalties`);
  };

  return (
    <>
      <Card className="w-[460px]">
        <Typography.Header size={Size.H2}>Drop schedule</Typography.Header>
        <Typography.Header size={Size.H3} color={TextColor.Gray}>
          Scheduled in your current timezone
        </Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          {/* Start Date */}
          <Form.Label name="Start date/time">
            <Form.RadioGroup>
              <Form.Label name="Start immediately" placement={Placement.Right}>
                <Form.RadioGroup.Radio {...register('selectStartDate')} value="mintImmediately" />
              </Form.Label>
              <Form.Label name="Specify start date/time" placement={Placement.Right}>
                <Form.RadioGroup.Radio {...register('selectStartDate')} value="specifyStartDate" />
              </Form.Label>
            </Form.RadioGroup>
          </Form.Label>
          {selectStartDate === 'specifyStartDate' && (
            <div className="flex gap-4 items-end mt-4">
              <Form.Input {...register('startDate')} type="date" className="basis-3/5" />
              <Form.Input {...register('startTime')} type="time" className="basis-2/5" />
            </div>
          )}

          {/* End Date */}
          <Form.Label name="End date/time" className="mt-8">
            <Form.RadioGroup>
              <Form.Label name="Never end" placement={Placement.Right}>
                <Form.RadioGroup.Radio {...register('selectEndDate')} value="neverEnd" />
              </Form.Label>
              <Form.Label name="Specify end date/time" placement={Placement.Right}>
                <Form.RadioGroup.Radio {...register('selectEndDate')} value="specifyEndDate" />
              </Form.Label>
            </Form.RadioGroup>
          </Form.Label>
          {selectEndDate === 'specifyEndDate' && (
            <div className="flex gap-4 items-end mt-4">
              <Form.Input {...register('endDate')} type="date" className="basis-3/5" />
              <Form.Input {...register('endTime')} type="time" className="basis-2/5" />
            </div>
          )}

          <hr className="w-full bg-stone-800 border-0 h-px my-5" />
          <div className="flex items-center justify-end gap-4">
            <Button variant="secondary" onClick={back}>
              Back
            </Button>
            <Button htmlType="submit">Next</Button>
          </div>
        </Form>
      </Card>
    </>
  );
}
