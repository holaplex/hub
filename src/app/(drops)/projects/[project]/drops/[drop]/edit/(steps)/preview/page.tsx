'use client';
import { Button } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Card from '../../../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import {
  Action,
  ActionCost,
  BlockchainCost,
  CollectionCreatorInput,
  Organization,
  PatchDropInput,
  PatchDropPayload,
} from '../../../../../../../../../graphql.types';
import { StoreApi, useStore } from 'zustand';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { File } from 'nft.storage';
import { PatchDrop } from './../../../../../../../../../mutations/drop.graphql';
import { combineDateTime, maybeToUtc, DateFormat } from '../../../../../../../../../modules/time';
import { useProject } from '../../../../../../../../../hooks/useProject';
import { useState } from 'react';
import { GetProjectDrops } from './../../../../../../../../../queries/drop.graphql';
import { ifElse, isNil, always, isEmpty } from 'ramda';
import { Attribute, DropFormState } from '../../../../../../../../../providers/DropFormProvider';
import { useDropForm } from '../../../../../../../../../hooks/useDropForm';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../../../../../queries/credits.graphql';
import { uploadFile } from '../../../../../../../../../modules/upload';
import Link from 'next/link';
import clsx from 'clsx';
import { shorten } from '../../../../../../../../../modules/wallet';

interface PatchDropData {
  createProject: PatchDropPayload;
}

interface PatchDropVars {
  input: PatchDropInput;
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

export default function EditDropPreviewPage() {
  const router = useRouter();
  const { project } = useProject();
  const [submitting, setSubmitting] = useState(false);
  const store = useDropForm() as StoreApi<DropFormState>;
  const detail = useStore(store, (store) => store.detail);
  const payment = useStore(store, (store) => store.payment);
  const timing = useStore(store, (store) => store.timing);
  const [error, setError] = useState<string>();

  const back = () => {
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/schedule`);
  };

  const [patchDrop] = useMutation<PatchDropData, PatchDropVars>(PatchDrop, {
    refetchQueries: [{ query: GetProjectDrops, variables: { project: project?.id } }],
  });

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

  const createDropCredits = creditSheet
    ?.find((actionCost: ActionCost) => actionCost.action === Action.CreateDrop)
    ?.blockchains.find(
      (blockchainCost: BlockchainCost) => blockchainCost.blockchain === detail?.blockchain
    )?.credits;

  const supply = parseInt(payment.supply.replaceAll(',', ''));

  const onSubmit = async () => {
    setSubmitting(true);
    let imageUrl = detail.image;
    if (detail.image instanceof File) {
      const { url: image } = await uploadFile(detail.image);
      imageUrl = image;
    }

    patchDrop({
      variables: {
        input: {
          id: project?.drop?.id,
          metadataJson: {
            name: detail.name,
            symbol: detail.symbol,
            description: detail.description,
            image: imageUrl as string,
            attributes: detail.attributes.map(({ traitType, value }) => ({ traitType, value })),
            externalUrl: when(isEmpty, always(null))(detail.externalUrl),
            animationUrl: when(isEmpty, always(null))(detail.animationUrl),
          },
          creators: payment.creators.map(({ address, share, verified }) => ({
            address,
            share,
            verified,
          })),
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
      onError: (error: ApolloError) => {
        setSubmitting(false);
        setError(error.message);
      },
    });
  };

  return (
    <Card className="w-[906px]">
      <div className="flex gap-8">
        <div className="basis-1/3 flex flex-col gap-4 w-full">
          {detail.includeAnimationUrl && detail.animationUrl && (
            <>
              <span className="text-sm text-gray-400">Main artwork</span>
              <video
                src={detail.animationUrl}
                controls
                className="w-full aspect-video object-cover rounded-lg"
              />
            </>
          )}
          <span className="text-sm text-gray-400">
            {detail.includeAnimationUrl && detail.animationUrl ? 'Cover image' : 'Main artwork'}
          </span>
          <img
            className="w-full self-center object-contain rounded-lg"
            src={detail.image instanceof File ? URL.createObjectURL(detail.image) : detail.image}
          />
          <div className="grid grid-cols-2 gap-2">
            {detail.attributes.map((attribute: Attribute) => {
              return (
                <div
                  key={attribute.traitType}
                  className="flex flex-col gap-2 py-2 px-4 bg-stone-800 rounded-lg col-span-1"
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
            <div className="flex flex-col gap-2 py-2 px-4 bg-stone-800 rounded-lg">
              <span className="text-gray-400 text-sm">Supply</span>
              <span className="text-sm text-white">
                {payment.supply ? payment.supply : 'Unlimited'}
              </span>
            </div>
          </div>

          <hr className="w-full bg-stone-800 my-4 h-px border-0" />

          <div className="flex flex-col gap-2 text-white text-sm w-full">
            <div className="flex items-center justify-between gap-2">
              <span>Royalties</span>
              <span>{payment.royalties}</span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span>Royalties recipients</span>
              <div className="flex flex-col gap-2 justify-end">
                {payment.creators.map((creator: CollectionCreatorInput) => {
                  return (
                    <div key={creator.address}>{`${shorten(creator.address)} - ${
                      creator.share
                    }%`}</div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span>Starts</span>
              <span>
                {startDateTime
                  ? `${format(startDateTime, DateFormat.DATE_1)}, ${format(
                      startDateTime,
                      DateFormat.TIME_1
                    )}`
                  : 'Immediately'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span>Ends</span>
              <span>
                {endDateTime
                  ? `${format(endDateTime, DateFormat.DATE_1)}, ${format(
                      endDateTime,
                      DateFormat.TIME_1
                    )}`
                  : 'Never'}
              </span>
            </div>
            {detail.externalUrl && (
              <div className="flex items-center justify-between gap-2">
                <span>External URL</span>
                <span>{detail.externalUrl}</span>
              </div>
            )}
            <div className="flex items-center justify-between gap-2">
              <span>Blockchain</span>
              <span>{detail.blockchain}</span>
            </div>
          </div>

          <hr className="w-full bg-stone-800 my-4 h-px border-0" />

          {payment.supply && creditBalance && createDropCredits && (
            <div className="flex items-center gap-4 rounded-lg bg-stone-950 p-4">
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

              {createDropCredits * supply > creditBalance && (
                <Link href="/credits/buy" className="flex-none">
                  <Button>Buy credits</Button>
                </Link>
              )}
            </div>
          )}
          <div className="flex items-center justify-between gap-4 rounded-lg bg-stone-950 p-4 mt-4">
            <span className="text-gray-400 text-sm font-medium">Cost to create drop</span>
            <span className="text-white text-sm font-medium">{cost} credits</span>
          </div>

          {error && (
            <div className="text-sm font-medium text-red-500 bg-red-500/25 p-4 my-5 rounded-lg">
              {error}
            </div>
          )}

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
