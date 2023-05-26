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
import { format } from 'date-fns';
import add from 'date-fns/add';
import { combineDateTime, DateFormat } from '../../../../../../../modules/time';

export default function NewDropTimingPage() {
  const router = useRouter();
  const { project } = useProject();
  const store = useDropForm() as StoreApi<DropFormState>;

  const timing = useStore(store, (store) => store.timing);
  const setTiming = useStore(store, (store) => store.setTiming);
  const now = new Date();
  const thirtyDays = add(now, { days: 30 });
  const { handleSubmit, register, watch, formState, setError } = useForm<TimingSettings>({
    defaultValues: timing || {
      selectStartDate: 'mintImmediately',
      startDate: format(now, DateFormat.DATE_3),
      startTime: format(now, DateFormat.TIME_2),
      selectEndDate: 'neverEnd',
      endDate: format(thirtyDays, DateFormat.DATE_3),
      endTime: format(thirtyDays, DateFormat.TIME_2),
    },
  });

  const selectStartDate = watch('selectStartDate');
  const selectEndDate = watch('selectEndDate');

  const submit = (data: TimingSettings) => {
    let startDateTime: Date = new Date();
    if (data.selectStartDate === 'specifyStartDate' && data.startTime && data.startDate) {
      const [startTimeHrs, startTimeMins] = data.startTime.split(':');
      startDateTime = combineDateTime(
        new Date(data.startDate),
        parseInt(startTimeHrs),
        parseInt(startTimeMins)
      );

      if (startDateTime < new Date()) {
        setError('selectStartDate', {
          message: 'Start date/time cannot be before current date/time.',
        });
        return;
      }
    }

    let endDateTime: Date | null;
    if (data.selectEndDate === 'specifyEndDate' && data.endDate && data.endTime) {
      const [endTimeHrs, endTimeMins] = data.endTime.split(':');
      endDateTime = combineDateTime(
        new Date(data.endDate),
        parseInt(endTimeHrs),
        parseInt(endTimeMins)
      );

      if (endDateTime < startDateTime) {
        setError('selectEndDate', {
          message: 'End date/time cannot be before start date/time.',
        });
        return;
      }
    }

    setTiming(data);
    router.push(`/projects/${project?.id}/drops/new/preview`);
  };

  const back = () => {
    router.push(`/projects/${project?.id}/drops/new/royalties`);
  };

  return (
    <>
      <Card className="w-[364px]">
        <Typography.Header size={Size.H2}>Drop schedule</Typography.Header>
        <Typography.Header size={Size.H3} color={TextColor.Gray}>
          Scheduled in your current timezone
        </Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          {/* Start Date */}
          <Form.Label name="Start date/time" className="text-xs">
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
            <div className="flex gap-6 items-start mt-4">
              <div className="flex flex-col gap-1">
                <Form.Input
                  {...register('startDate', {
                    validate: (value, { selectStartDate }) => {
                      if (selectStartDate === 'specifyStartDate' && !value) {
                        return 'Please select a start date.';
                      }
                    },
                  })}
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  className="basis-3/5"
                />
                <Form.Error message={formState.errors.startDate?.message} />
              </div>
              <div className="flex flex-col gap-1">
                <Form.Input
                  {...register('startTime', {
                    validate: (value, { selectStartDate }) => {
                      if (selectStartDate === 'specifyStartDate' && !value) {
                        return 'Please select a start time.';
                      }
                    },
                  })}
                  type="time"
                  className="basis-2/5"
                />
                <Form.Error message={formState.errors.startTime?.message} />
              </div>
            </div>
          )}
          <Form.Error message={formState.errors.selectStartDate?.message} />

          {/* End Date */}
          <Form.Label name="End date/time" className="mt-8 text-xs">
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
            <div className="flex gap-6 mt-4 items-start">
              <div className="flex flex-col gap-1">
                <Form.Input
                  {...register('endDate', {
                    validate: (value, { selectEndDate }) => {
                      if (selectEndDate === 'specifyEndDate' && !value) {
                        return 'Please select an end date.';
                      }
                    },
                  })}
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  className="basis-3/5"
                />
                <Form.Error message={formState.errors.endDate?.message} />
              </div>
              <div className="flex flex-col gap-1">
                <Form.Input
                  {...register('endTime', {
                    validate: (value, { selectEndDate }) => {
                      if (selectEndDate === 'specifyEndDate' && !value) {
                        return 'Please select an end time.';
                      }
                    },
                  })}
                  type="time"
                  className="basis-2/5"
                />

                <Form.Error message={formState.errors.endTime?.message} />
              </div>
            </div>
          )}
          <Form.Error message={formState.errors.selectEndDate?.message} />

          <hr className="w-full bg-stone-800 border-0 h-px my-5" />
          <div className="flex items-center justify-end gap-6">
            <Button variant="secondary" onClick={back} disabled={formState.isSubmitting}>
              Back
            </Button>
            <Button
              htmlType="submit"
              loading={formState.isSubmitting}
              disabled={formState.isSubmitting}
            >
              Next
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
}
