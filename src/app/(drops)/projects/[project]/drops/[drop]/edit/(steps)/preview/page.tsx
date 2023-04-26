'use client';
import { Button } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Card from '../../../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { PatchDropInput, PatchDropPayload } from '../../../../../../../../../graphql.types';
import { StoreApi, useStore } from 'zustand';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { File } from 'nft.storage';
import { PatchDrop } from './../../../../../../../../../mutations/drop.graphql';
import { combineDateTime, maybeToUtc, DateFormat } from '../../../../../../../../../modules/time';
import { useProject } from '../../../../../../../../../hooks/useProject';
import { useState } from 'react';
import { GetProjectDrops } from './../../../../../../../../../queries/drop.graphql';
import { ifElse, isNil, always } from 'ramda';
import { DropFormState } from '../../../../../../../../../providers/DropFormProvider';
import { useDropForm } from '../../../../../../../../../hooks/useDropForm';

interface PatchDropData {
  createProject: PatchDropPayload;
}

interface PatchDropVars {
  input: PatchDropInput;
}

const LAMPORTS_PER_SOL = 1_000_000_000;

async function uploadFile(file: File): Promise<{ url: string; name: string }> {
  const body = new FormData();
  body.append(file.name, file, file.name);

  try {
    const response = await fetch('/api/uploads', {
      method: 'POST',
      body,
    });
    const json = await response.json();
    return json[0];
  } catch (e: any) {
    console.error('Could not upload file', e);
    throw new Error(e);
  }
}

export default function EditDropPreviewPage() {
  const router = useRouter();
  const { project } = useProject();
  const [submitting, setSubmitting] = useState(false);
  const store = useDropForm() as StoreApi<DropFormState>;
  const detail = useStore(store, (store) => store.detail);
  const payment = useStore(store, (store) => store.payment);
  const timing = useStore(store, (store) => store.timing);

  const back = () => {
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/schedule`);
  };

  const [createDrop] = useMutation<PatchDropData, PatchDropVars>(PatchDrop, {
    refetchQueries: [{ query: GetProjectDrops, variables: { project: project?.id } }],
  });

  if (!detail || !payment || !timing) {
    toast('Incomplete drops data. Check again.');
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/details`);
    return;
  }

  let startDateTime: Date | null = null;
  if (timing.selectStartDate === 'specifyStartDate' && timing.startTime && timing.startDate) {
    const [startTimeHrs, startTimeMins] = timing.startTime.split(':');
    startDateTime = combineDateTime(
      new Date(timing.startDate),
      parseInt(startTimeHrs),
      parseInt(startTimeMins)
    );
  }

  let endDateTime: Date | null = null;
  if (timing.selectEndDate === 'specifyEndDate' && timing.endTime && timing.endDate) {
    const [endTimeHrs, endTimeMins] = timing.endTime.split(':');
    endDateTime = combineDateTime(
      new Date(timing.endDate),
      parseInt(endTimeHrs),
      parseInt(endTimeMins)
    );
  }

  const onSubmit = async () => {
    setSubmitting(true);
    let imageUrl = detail.image;
    if (detail.image instanceof File) {
      const { url: image } = await uploadFile(detail.image);
      imageUrl = image;
    }

    createDrop({
      variables: {
        input: {
          id: project?.drop?.id,
          metadataJson: {
            name: detail.name,
            symbol: detail.symbol,
            description: detail.description,
            image: imageUrl as string,
            attributes: detail.attributes.map(({ traitType, value }) => ({ traitType, value })),
          },
          creators: payment.creators,
          price: 0,
          sellerFeeBasisPoints: ifElse(
            isNil,
            always(null),
            (royalties) => parseFloat(royalties.split('%')[0]) * 100
          )(
            payment.royaltyPercentage === 'custom'
              ? payment.customRoyalty
              : payment.royaltyPercentage
          ),
          startTime: maybeToUtc(startDateTime),
          endTime: maybeToUtc(endDateTime),
        },
      },
      onCompleted: () => {
        setSubmitting(false);
        router.push(`/projects/${project?.id}/drops`);
      },
    });
  };

  return (
    <Card className="w-[372px]">
      <img
        src={detail.image instanceof File ? URL.createObjectURL(detail.image) : detail.image}
        className="w-[340px] h-[340px] self-center object-cover"
      />
      <div className="flex items-center gap-2 mt-4">
        <Typography.Header size={Size.H2}>{detail.name}</Typography.Header>
        <Typography.Header size={Size.H2} className="text-gray-400">
          - {payment.supply}
        </Typography.Header>
      </div>
      <div className="flex flex-col mt-5">
        {/* <div className="flex flex-col gap-2 bg-stone-800 rounded-md py-2 px-3">
          <span className="text-gray-400 text-xs font-medium">Price</span>
          <div className="flex items-end justify-between">
            <span className="text-base text-primary font-medium">{payment.price} SOL</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
          <span className="text-gray-600 text-xs font-medium">Estimated total value</span>
          <div className="flex items-end justify-between">
            <span className="text-base text-primary font-medium">
              {round(parseInt(payment.supply) * parseInt(payment.price))} SOL
            </span>
          </div>
        </div> */}

        <div className="flex gap-4 items-center">
          <div className="w-full flex flex-col gap-2 bg-stone-800 rounded-md py-2 px-3 mt-4">
            <span className="text-gray-400 text-xs font-medium">Start date and time</span>
            <span className="text-yellow-300 text-xs font-medium">
              {startDateTime
                ? `${format(startDateTime, DateFormat.DATE_1)}, ${format(
                    startDateTime,
                    DateFormat.TIME_1
                  )}`
                : `${format(new Date(), DateFormat.DATE_1)}, ${format(
                    new Date(),
                    DateFormat.TIME_1
                  )}`}
            </span>
          </div>
          {endDateTime && (
            <div className="w-full flex flex-col gap-2 bg-stone-800 rounded-md py-2 px-3 mt-4">
              <span className="text-gray-400 text-xs font-medium">End date and time</span>
              <span className="text-yellow-300 text-xs font-medium">
                {`${format(endDateTime, DateFormat.DATE_1)}, ${format(
                  endDateTime,
                  DateFormat.TIME_1
                )}`}
              </span>
            </div>
          )}
        </div>

        <hr className="w-full bg-stone-800 border-0 h-px my-5" />

        <div className="flex items-center justify-end gap-4">
          <Button variant="secondary" disabled={submitting} onClick={back}>
            Back
          </Button>
          <Button htmlType="submit" loading={submitting} disabled={submitting} onClick={onSubmit}>
            Update drop
          </Button>
        </div>
      </div>
    </Card>
  );
}
