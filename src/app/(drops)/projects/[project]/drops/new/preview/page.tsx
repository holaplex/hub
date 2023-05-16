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
  CollectionCreatorInput,
  BlockchainCost,
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
import { Attribute, DropFormState } from '../../../../../../../providers/DropFormProvider';
import { useDropForm } from '../../../../../../../hooks/useDropForm';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../../../queries/credits.graphql';
import clsx from 'clsx';

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

  const createDropCredits = creditSheet
    ?.find((actionCost: ActionCost) => actionCost.action === Action.CreateDrop)
    ?.blockchains.find(
      (blockchainCost: BlockchainCost) => blockchainCost.blockchain === detail?.blockchain
    )?.credits;

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

  const supply = parseInt(payment.supply.replaceAll(',', ''));

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
            animationUrl: detail.includeAnimationUrl ? detail.animationUrl : undefined,
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
    <Card className="w-[906px]">
      <div className="flex gap-8">
        <div className="basis-1/3 flex flex-col gap-4 w-full">
          <span className="text-sm text-gray-400">Main artwork</span>
          <img
            src={detail.image instanceof File ? URL.createObjectURL(detail.image) : detail.image}
            className="w-[340px] h-[340px] self-center object-cover"
          />
          <div className="grid-cols-2 gap-2">
            {detail.attributes.map((attribute: Attribute) => {
              return (
                <div
                  key={attribute.traitType}
                  className="flex flex-col gap-2 py-2 px-4 bg-stone-800"
                >
                  <span className="text-gray-400 text-sm">{attribute.traitType}</span>
                  <span className="text-sm text-white">{attribute.value}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="basis-2/3 flex flex-col w-full">
          <span className="text-sm text-gray-400">{detail.symbol}</span>
          <Typography.Header size={Size.H2} className="mt-2">
            {detail.name}
          </Typography.Header>

          <div className="flex gap-4 justify-between">
            <span className="text-sm text-gray-400">{detail.description}</span>
            <div className="flex flex-col gap-2 py-2 px-4 bg-stone-800">
              <span className="text-gray-400 text-sm">Supply</span>
              <span className="text-sm text-white">
                {payment.supply ? payment.supply : 'Unlimited'}
              </span>
            </div>
          </div>

          <hr className="w-full bg-stone-800 my-4 h-px border-0" />

          <div className="flex flex-col gap-2 text-white text-sm w-full">
            <div className="flex items-center justify-between gap-2">
              <>Royalties</>
              {payment.royalties}
            </div>
            <div className="flex items-center justify-between gap-2">
              <>Royalties recipients</>
              <div className="flex flex-col gap-2 justify-end">
                {payment.creators.map((creator: CollectionCreatorInput) => {
                  return (
                    <div key={creator.address}>{`${creator.address} - ${creator.share}%`}</div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <>Starts</>
              {startDateTime
                ? `${format(startDateTime, DateFormat.DATE_1)}, ${format(
                    startDateTime,
                    DateFormat.TIME_1
                  )}`
                : 'Immediately'}
            </div>
            <div className="flex items-center justify-between gap-2">
              <>Ends</>
              {endDateTime
                ? `${format(endDateTime, DateFormat.DATE_1)}, ${format(
                    endDateTime,
                    DateFormat.TIME_1
                  )}`
                : 'Never'}
            </div>
            <div className="flex items-center justify-between gap-2">
              <>External URL</>
              {detail.externalUrl}
            </div>
            <div className="flex items-center justify-between gap-2">
              <>Blockchain</>
              {detail.blockchain}
            </div>
          </div>

          <hr className="w-full bg-stone-800 my-4 h-px border-0" />

          {payment.supply && creditBalance && createDropCredits && (
            <div className="flex items-center gap-4 rounded-lg bg-stone-950 p-4">
              <div className="flex items-center gap-2">
                <Icon.Balance />
                <div className="text-gray-400 text-sm font-medium">
                  Based on estimated usage you will need about{' '}
                  <span className="text-white">{createDropCredits * supply}</span> credits to create
                  wallets and mint {payment.supply} NFTs. You currently have{' '}
                  <span
                    className={clsx({
                      'text-red-500': createDropCredits * supply > creditBalance,
                      'text-green-400': createDropCredits * supply <= creditBalance,
                    })}
                  >
                    {creditBalance}
                  </span>{' '}
                  credits.
                </div>
              </div>
              {createDropCredits * supply > creditBalance && (
                <Link href="/credits/buy" className="flex-none">
                  <Button>Buy credits</Button>
                </Link>
              )}
            </div>
          )}
          <div className="flex items-center justify-between gap-4 rounded-lg bg-stone-950 p-4">
            <span className="text-gray-400 text-sm font-medium">Cost to create drop</span>
            <span className="text-white text-sm font-medium">{cost} credits</span>
          </div>
          <div className="flex items-center justify-end gap-6 mt-4">
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
      </div>
    </Card>
  );
}
