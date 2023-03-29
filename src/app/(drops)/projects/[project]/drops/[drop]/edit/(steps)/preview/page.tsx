'use client';
import { Button } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Card from '../../../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { CreateDropInput, CreateDropPayload } from '../../../../../../../../../graphql.types';
import useCreateDropStore from '../../../../../../../../../hooks/useCreateDropStore';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { CreateDrop } from './../../../../../../../../mutations/drop.graphql';
import { combineDateTime, maybeToUtc, DateFormat } from '../../../../../../../../../modules/time';
import { useProject } from '../../../../../../../../../hooks/useProject';
import { useState } from 'react';
import { GetProjectDrops } from './../../../../../../../../queries/drop.graphql';
import { ifElse, isNil, always } from 'ramda';

interface CreateDropData {
  createProject: CreateDropPayload;
}

interface CreateDropVars {
  input: CreateDropInput;
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

export default function NewDropPreviewPage() {
  const router = useRouter();
  const { project } = useProject();
  const [submitting, setSubmitting] = useState(false);
  const { stepOne, stepTwo, stepThree } = useCreateDropStore();

  const back = () => {
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/timing`);
  };

  const [createDrop] = useMutation<CreateDropData, CreateDropVars>(CreateDrop, {
    refetchQueries: [{ query: GetProjectDrops, variables: { project: project?.id } }],
  });

  if (!stepOne || !stepTwo || !stepThree) {
    toast('Incomplete drops data. Check again.');
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/details`);
    return;
  }

  let startDateTime: Date | null = null;
  if (!stepThree.startNow && stepThree.startTime && stepThree.startDate) {
    const [startTimeHrs, startTimeMins] = stepThree.startTime.split(':');
    startDateTime = combineDateTime(
      new Date(stepThree.startDate),
      parseInt(startTimeHrs),
      parseInt(startTimeMins)
    );
  }

  let endDateTime: Date | null = null;
  if (!stepThree.noEndTime && stepThree.endTime && stepThree.endDate) {
    const [endTimeHrs, endTimeMins] = stepThree.endTime.split(':');
    endDateTime = combineDateTime(
      new Date(stepThree.endDate),
      parseInt(endTimeHrs),
      parseInt(endTimeMins)
    );
  }

  const onSubmit = async () => {
    setSubmitting(true);
    let imageUrl = stepOne.image;
    if (stepOne.image instanceof File) {
      const { url: image } = await uploadFile(stepOne.image);
      imageUrl = image;
    }

    createDrop({
      variables: {
        input: {
          project: project?.id,
          blockchain: stepOne.blockchain.id,
          metadataJson: {
            name: stepOne.name,
            symbol: stepOne.symbol,
            description: stepOne.description,
            image: imageUrl as string,
            attributes: stepOne.attributes,
          },
          creators: stepTwo.creators,
          supply: parseInt(stepTwo.supply),
          price: 0,
          sellerFeeBasisPoints: ifElse(
            isNil,
            always(null),
            (royalties) => parseInt(royalties.split('%')[0]) * 100
          )(stepTwo.royalties),
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
        src={stepOne.image instanceof File ? URL.createObjectURL(stepOne.image) : stepOne.image}
        className="w-[340px] h-[340px] self-center object-cover"
      />
      <div className="flex items-center gap-2 mt-4">
        <Typography.Header size={Size.H2}>{stepOne.name}</Typography.Header>
        <Typography.Header size={Size.H2} className="text-gray-500">
          - {stepTwo.supply}
        </Typography.Header>
      </div>
      <div className="flex flex-col mt-5">
        {/* <div className="flex flex-col gap-2 bg-gray-50 rounded-md py-2 px-3">
          <span className="text-gray-600 text-xs font-medium">Price</span>
          <div className="flex items-end justify-between">
            <span className="text-base text-primary font-medium">{stepTwo.price} SOL</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
          <span className="text-gray-600 text-xs font-medium">Estimated total value</span>
          <div className="flex items-end justify-between">
            <span className="text-base text-primary font-medium">
              {round(parseInt(stepTwo.supply) * parseInt(stepTwo.price))} SOL
            </span>
          </div>
        </div> */}

        <div className="flex gap-4 items-center">
          <div className="w-full flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
            <span className="text-gray-600 text-xs font-medium">Start date and time</span>
            <span className="text-primary text-xs font-medium">
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
            <div className="w-full flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
              <span className="text-gray-600 text-xs font-medium">End date and time</span>
              <span className="text-primary text-xs font-medium">
                {`${format(endDateTime, DateFormat.DATE_1)}, ${format(
                  endDateTime,
                  DateFormat.TIME_1
                )}`}
              </span>
            </div>
          )}
        </div>

        <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />

        <div className="flex items-center justify-between">
          <Button className="self-start" variant="tertiary" disabled={submitting} onClick={back}>
            Back
          </Button>
          <Button htmlType="submit" loading={submitting} disabled={submitting} onClick={onSubmit}>
            {startDateTime ? 'Schedule mint' : 'Start mint'}
          </Button>
        </div>
      </div>
    </Card>
  );
}