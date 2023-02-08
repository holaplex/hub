'use client';
import { Button } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Card from '../../../../../../components/Card';
import { Icon } from '../../../../../../components/Icon';
import Typography, { Size } from '../../../../../../components/Typography';
import useCreateDropStore from '../../../../../../store/useCreateDropStore';

export default function CreateDropPreview() {
  const router = useRouter();
  const { stepOne, stepTwo, stepThree } = useCreateDropStore();

  const back = () => {
    router.push('/organizations/drops/create/timing');
  };

  if (!stepOne || !stepTwo || !stepThree) {
    toast('Incomplete drops data. Check again.');
    router.push('/organizations/drops/create/details');
    return;
  }

  return (
    <>
      <Card className="w-[372px]">
        <Icon.EmptyAvatar className="w-[340px] h-[340px] self-center" />
        <div className="flex items-center gap-2 mt-4">
          <Typography.Header size={Size.H2}>{stepOne.name}</Typography.Header>
          <Typography.Header size={Size.H2} className="text-gray-500">
            #1-{stepTwo.maxSupply}
          </Typography.Header>
        </div>
        <div className="flex flex-col mt-5">
          <div className="flex flex-col gap-2 bg-gray-50 rounded-md py-2 px-3">
            <span className="text-gray-600 text-xs font-medium">Price</span>
            <div className="flex items-end justify-between">
              <span className="text-base text-primary font-medium">{stepTwo.solPrice} SOL</span>
              {/* TODO: Calculate exact usd value using a conversion api */}
              <span className="text-primary text-xs font-medium">
                ~ 731.438940 <span className="text-gray-600">USD</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
            <span className="text-gray-600 text-xs font-medium">Estimated total value</span>
            <div className="flex items-end justify-between">
              <span className="text-base text-primary font-medium">
                {stepTwo.maxSupply * stepTwo.solPrice} SOL
              </span>
              <span className="text-primary text-xs font-medium">
                ~ 7434000.00 <span className="text-gray-600">USD</span>
              </span>
            </div>
          </div>

          <div className="flex gap-4 items-center">
            {!stepThree.mintImmediately && (
              <div className="w-full flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
                <span className="text-gray-600 text-xs font-medium">Start date and time</span>
                <span className="text-primary text-xs font-medium">
                  {stepThree?.startDate}, {stepThree?.startTime}
                </span>
              </div>
            )}
            {!stepThree.noEndOfSales && (
              <div className="w-full flex flex-col gap-2 border-2 border-gray-100 rounded-md py-2 px-3 mt-4">
                <span className="text-gray-600 text-xs font-medium">End date and time</span>
                <span className="text-primary text-xs font-medium">
                  {stepThree?.endDate}, {stepThree?.endTime}
                </span>
              </div>
            )}
          </div>

          <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />

          <div className="flex items-center justify-between">
            <Button className="self-start" variant="tertiary" onClick={back}>
              Back
            </Button>
            <Button htmlType="submit" className="self-end">
              {stepThree.mintImmediately ? 'Start mint' : 'Schedule mint'}
            </Button>
          </div>
        </div>
      </Card>
    </>
  );
}
