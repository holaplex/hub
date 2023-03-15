'use client';
import { Button } from '@holaplex/ui-library-react';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Card from '../../../../../../../components/Card';
import { Icon } from '../../../../../../../components/Icon';
import Typography, { Size } from '../../../../../../../components/Typography';
import { Blockchain, CreateDropInput, CreateDropPayload } from '../../../../../../../graphql.types';
import useCreateDropStore from '../../../../../../../hooks/useCreateDropStore';
import { useMutation } from '@apollo/client';
import { round } from '../../../../../../../modules/math';
import { CreateDrop } from './../../../../../../../mutations/drop.graphql';
import { combineDateTime } from '../../../../../../../modules/time';

interface NewDropPreviewProps {
  params: { project: string };
}
interface CreateDropData {
  createProject: CreateDropPayload;
}

interface CreateDropVars {
  input: CreateDropInput;
}

const LAMPORTS_PER_SOL = 1_000_000_000;

export default function NewDropPreviewPage({ params: { project } }: NewDropPreviewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[2] : null;
  const { stepOne, stepTwo, stepThree } = useCreateDropStore();

  const back = () => {
    router.push(`/projects/${slug}/drops/create/timing`);
  };

  const [createDrop, { loading }] = useMutation<CreateDropData, CreateDropVars>(CreateDrop);

  if (!stepOne || !stepTwo || !stepThree) {
    toast('Incomplete drops data. Check again.');
    router.push(`/projects/${slug}/drops/new/details`);
    return;
  }

  let startDateTime: Date;
  if (!stepThree.startNow) {
    const [startTimeHrs, startTimeMins] = stepThree.startTime!.toString().split(':');
    startDateTime = combineDateTime(
      new Date(stepThree.startDate!),
      Number(startTimeHrs),
      Number(startTimeMins)
    );
    console.log('start time', stepThree.startTime);
    console.log('start date and time combined', startDateTime);
  }

  let endDateTime: Date;
  if (!stepThree.noEndTime) {
    const [endTimeHrs, endTimeMins] = stepThree.endTime!.toString().split(':');
    endDateTime = combineDateTime(
      new Date(stepThree.endDate!),
      Number(endTimeHrs),
      Number(endTimeMins)
    );
  }

  const onSubmit = async () => {
    createDrop({
      variables: {
        input: {
          project,
          blockchain: stepOne.blockchain.id,
          metadataJson: {
            name: stepOne.name,
            symbol: stepOne.symbol,
            description: stepOne.description,
            image: 'https://abc.xyz', // TODO:
            attributes: stepOne.attributes,
          },
          creators: stepTwo.creators,
          supply: parseInt(stepTwo.supply),
          price: parseInt(stepTwo.price) * LAMPORTS_PER_SOL,
          sellerFeeBasisPoints: stepTwo.secondarySaleSellerFeePercent * 100,
          startTime: startDateTime,
          endTime: endDateTime,
        },
      },
      onCompleted: () => {
        router.push(`/projects/${slug}/drops`);
      },
    });
  };

  return (
    <>
      <Card className="w-[372px]">
        <Icon.EmptyAvatar className="w-[340px] h-[340px] self-center" />
        <div className="flex items-center gap-2 mt-4">
          <Typography.Header size={Size.H2}>{stepOne.name}</Typography.Header>
          <Typography.Header size={Size.H2} className="text-gray-500">
            #1-{stepTwo.supply}
          </Typography.Header>
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-col gap-2 bg-gray-50 rounded-md py-2 px-3">
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
          </div>

          <div className="flex gap-4 items-center">
            {!stepThree.startTime && (
              <div className="w-full flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
                <span className="text-gray-600 text-xs font-medium">Start date and time</span>
                <span className="text-primary text-xs font-medium">
                  {`${stepThree?.startDate}, ${stepThree?.startTime}`}
                </span>
              </div>
            )}
            {!stepThree.noEndTime && (
              <div className="w-full flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
                <span className="text-gray-600 text-xs font-medium">End date and time</span>
                <span className="text-primary text-xs font-medium">
                  {`${stepThree?.endDate}, ${stepThree?.endTime}`}
                </span>
              </div>
            )}
          </div>

          <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />

          <div className="flex items-center justify-between">
            <Button className="self-start" variant="tertiary" disabled={loading} onClick={back}>
              Back
            </Button>
            <Button htmlType="submit" className="self-end" loading={loading} disabled={loading} onClick={() => onSubmit()}>
              {stepThree.startNow ? 'Start mint' : 'Schedule mint'}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
