'use client';
import { Button } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Card from '../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../components/Typography';
import {
  CreateDropInput,
  CreateDropPayload,
  Organization,
  ActionCost,
  Action,
} from '../../../../../../../graphql.types';
import { StoreApi, useStore } from 'zustand';
import { useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { CreateDrop } from './../../../../../../../mutations/drop.graphql';
import { combineDateTime, maybeToUtc, DateFormat } from '../../../../../../../modules/time';
import { useProject } from '../../../../../../../hooks/useProject';
import { useState } from 'react';
import { GetProjectDrops } from './../../../../../../../queries/drop.graphql';
import { Icon } from '../../../../../../../components/Icon';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { ifElse, isNil, always } from 'ramda';
import { uploadFile } from '../../../../../../../modules/upload';
import { DropFormState } from '../../../../../../../providers/DropFormProvider';
import { useDropForm } from '../../../../../../../hooks/useDropForm';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../../../queries/credits.graphql';
import BuyCredits from '../../../../../../../components/BuyCredits';

interface CreateDropData {
  createProject: CreateDropPayload;
}

interface CreateDropVars {
  input: CreateDropInput;
}

interface GetOrganizationBalanceVars {
  organization: string;
}

interface GetOrganizationCreditBalanceData {
  organization: Organization;
}

interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

export default function NewDropPreviewPage() {
  const router = useRouter();
  const { project } = useProject();
  const [submitting, setSubmitting] = useState(false);
  const store = useDropForm() as StoreApi<DropFormState>;
  const detail = useStore(store, (store) => store.detail);
  const payment = useStore(store, (store) => store.payment);
  const timing = useStore(store, (store) => store.timing);

  const creditBalanceQuery = useQuery<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>(
    GetOrganizationCreditBalance,
    {
      variables: { organization: project?.organization?.id },
    }
  );
  const creditBalance = creditBalanceQuery.data?.organization.credits?.balance as number;

  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);

  const creditSheet = creditSheetQuery.data?.creditSheet;

  const cost = creditSheet
    ?.find((cost) => cost.action === Action.CreateDrop)
    ?.blockchains?.find((blockchain) => blockchain.blockchain === detail?.blockchain)
    ?.credits as number;

  const back = () => {
    router.push(`/projects/${project?.id}/drops/new/schedule`);
  };

  const [createDrop] = useMutation<CreateDropData, CreateDropVars>(CreateDrop, {
    awaitRefetchQueries: true,
    refetchQueries: [{ query: GetProjectDrops, variables: { project: project?.id } }],
  });

  if (!detail || !payment || !timing) {
    toast('Incomplete drops data. Check again.');
    router.push(`/projects/${project?.id}/drops/new/details`);
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
          project: project?.id,
          blockchain: detail.blockchain,
          metadataJson: {
            name: detail.name,
            symbol: detail.symbol,
            description: detail.description,
            image: imageUrl as string,
            attributes: detail.attributes,
            externalUrl: detail.externalUrl,
          },
          creators: payment.creators,
          supply: parseInt(payment.supply.replaceAll(',', '')),
          price: 0,
          sellerFeeBasisPoints: ifElse(
            isNil,
            always(null),
            (royalties) => parseFloat(royalties.split('%')[0]) * 100
          )(payment.royalties),
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

        <div className="flex gap-6 items-center">
          <div className="w-full flex flex-col gap-2 bg-stone-800 rounded-md py-2 px-3 mt-4">
            <span className="text-gray-400 text-xs font-medium">Start date and time</span>
            <span className="text-white text-xs font-medium">
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
              <span className="text-white text-xs font-medium">
                {`${format(endDateTime, DateFormat.DATE_1)}, ${format(
                  endDateTime,
                  DateFormat.TIME_1
                )}`}
              </span>
            </div>
          )}
        </div>

        <hr className="w-full bg-stone-800 border-0 h-px my-4" />

        <div className="flex items-center gap-4 rounded-lg justify-between bg-stone-950 p-4 mb-4">
          <div className="flex items-center gap-2">
            <Icon.Balance />
            <div className="text-gray-400">Cost to create the drop</div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-medium">{cost} credits</span>
            {cost > creditBalance && (
              // <Link href="/credits/buy" className="flex-none">
              //   <Button icon={<Icon.Add />}>Buy credits</Button>
              // </Link>
              <BuyCredits text="Buy credits" icon={<Icon.Add />} />
            )}
          </div>
        </div>

        {cost > creditBalance && (
          <div className="flex bg-red-500 text-red-500 bg-opacity-20 mb-4 rounded-lg p-4">
            Your organization currently has {creditBalance} credits. You need {cost} credits to
            create the drop. Please purchase more credits to continue.
          </div>
        )}

        <div className="flex items-center justify-end gap-6">
          <Button variant="secondary" disabled={submitting} onClick={back}>
            Back
          </Button>
          <Button
            htmlType="submit"
            loading={submitting}
            disabled={submitting || cost > creditBalance}
            onClick={onSubmit}
          >
            {startDateTime ? 'Schedule drop' : 'Create drop'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
