'use client';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import Card from '../../../../../../../components/Card';
import {
  Blockchain,
  AssetType,
  CollectionCreatorInput,
  Organization,
  ActionCost,
  Action,
  BlockchainCost,
} from '../../../../../../../graphql.types';
import Typography, { Size } from '../../../../../../../components/Typography';
import { useProject } from '../../../../../../../hooks/useProject';
import { StoreApi, useStore } from 'zustand';
import {
  PaymentSettings,
  DropFormState,
  RoyaltiesShortcut,
  RoyaltiesDestination,
} from '../../../../../../../providers/DropFormProvider';
import { Icon } from './../../../../../../../components/Icon';
import { useDropForm } from '../../../../../../../hooks/useDropForm';
import { useQuery } from '@apollo/client';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../../../queries/credits.graphql';
import clsx from 'clsx';

interface GetOrganizationBalanceVars {
  organization: string;
}

interface GetOrganizationCreditBalanceData {
  organization: Organization;
}

interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

export default function NewDropRoyaltiesPage() {
  const router = useRouter();
  const { project } = useProject();
  const store = useDropForm() as StoreApi<DropFormState>;
  const detail = useStore(store, (store) => store.detail);
  const payment = useStore(store, (store) => store.payment);
  const setPayment = useStore(store, (store) => store.setPayment);

  const creditBalanceQuery = useQuery<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>(
    GetOrganizationCreditBalance,
    {
      variables: { organization: project?.organization?.id },
    }
  );
  const creditBalance = creditBalanceQuery.data?.organization.credits?.balance;

  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);

  const creditSheet = creditSheetQuery.data?.creditSheet;

  const wallet = project?.treasury?.wallets?.find((wallet) => {
    switch (detail?.blockchain) {
      case Blockchain.Solana:
        return wallet.assetId === AssetType.SolTest || wallet.assetId === AssetType.Sol;
      case Blockchain.Polygon:
        return wallet.assetId === AssetType.MaticTest || wallet.assetId === AssetType.Matic;
      case Blockchain.Ethereum:
        return wallet.assetId === AssetType.EthTest || wallet.assetId === AssetType.Eth;
    }
  });

  const { handleSubmit, register, control, watch, formState } = useForm<PaymentSettings>({
    defaultValues: payment || {
      royaltiesDestination: RoyaltiesDestination.ProjectTreasury,
      royaltiesShortcut: RoyaltiesShortcut.Zero,
      creators: [{ address: '', share: 100 }],
    },
  });

  const royaltiesDestination = watch('royaltiesDestination');
  const royaltiesShortcut = watch('royaltiesShortcut');
  const creators = watch('creators');
  const supply = parseInt(watch('supply')?.replaceAll(',', '')) || false;

  const createDropCredits = creditSheet
    ?.find((actionCost: ActionCost) => actionCost.action === Action.MintEdition)
    ?.blockchains.find(
      (blockchainCost: BlockchainCost) => blockchainCost.blockchain === detail?.blockchain
    )?.credits;

  const submit = (data: PaymentSettings) => {
    if (data.royaltiesDestination === RoyaltiesDestination.ProjectTreasury) {
      data.creators = [{ address: wallet?.address as string, share: 100 }];
    }

    if (data.royaltiesShortcut !== RoyaltiesShortcut.Custom) {
      data.royalties = data.royaltiesShortcut as string;
    }

    data.creators = data.creators.map(({ address, share = 100 }) => {
      const creator: CollectionCreatorInput = {
        address,
        share: typeof share === 'string' ? parseInt(share) : share,
      };

      if (address === wallet?.address) {
        creator.verified = true;
      }

      return creator;
    });

    setPayment(data);
    router.push(`/projects/${project?.id}/drops/new/schedule`);
  };

  const back = () => {
    router.push(`/projects/${project?.id}/drops/new/details`);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'creators',
    rules: {
      required: true,
      validate: (creators) => {
        switch (detail?.blockchain) {
          case Blockchain.Solana:
            if (creators.length > 5) {
              return 'Can only set up to 5 creators.';
            }
            break;
          case Blockchain.Polygon || Blockchain.Ethereum:
            if (creators.length > 1) {
              return 'Can only set 1 creator.';
            }
            break;
        }

        const total = creators.reduce(
          (acc: number, creator: CollectionCreatorInput) =>
            acc + parseInt(creator.share as unknown as string),
          0
        );

        return total === 100 || 'Creator shares must sum to 100.';
      },
    },
  });

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Supply</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <div className="flex flex-col gap-2">
            <Form.Label name="Specify how many editions will be available" className="text-xs mt-5">
              <Form.Input {...register('supply')} autoFocus placeholder="e.g. 10,000" />
            </Form.Label>
            {supply && creditBalance && createDropCredits && (
              <div className="flex items-center gap-4 rounded-lg bg-stone-950 p-4">
                <div className="flex items-center gap-2">
                  <Icon.Balance />
                  <div className="text-gray-400 text-xs font-medium">
                    You will need <span className="text-white">{createDropCredits * supply}</span>{' '}
                    credits to mint {supply} NFTs. You currently have{' '}
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
                  <form action="/browser/credits/purchase" method="POST">
                    <Button icon={<Icon.Add />} htmlType="submit">
                      Buy more credits
                    </Button>
                  </form>
                )}
              </div>
            )}
          </div>

          <Typography.Header size={Size.H2} className="mt-6 mb-8">
            Royalties
          </Typography.Header>

          <Form.Label name="Royalty percentage" className="text-xs">
            <Form.RadioGroup>
              <Form.Label
                name="0%"
                htmlFor="0"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('royaltiesShortcut')}
                  id="0"
                  value={RoyaltiesShortcut.Zero}
                  className="hidden peer"
                />
              </Form.Label>
              <Form.Label
                name="2.5%"
                htmlFor="2.5"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('royaltiesShortcut')}
                  id="2.5"
                  value={RoyaltiesShortcut.TwoPointFive}
                  className="hidden peer"
                />
              </Form.Label>
              <Form.Label
                name="5%"
                htmlFor="5"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('royaltiesShortcut')}
                  id="5"
                  value={RoyaltiesShortcut.Five}
                  className="hidden peer"
                />
              </Form.Label>
              <Form.Label
                name="10%"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('royaltiesShortcut')}
                  id="10"
                  value={RoyaltiesShortcut.Ten}
                  className="hidden peer"
                />
              </Form.Label>
              <Form.Label
                name="Custom"
                htmlFor="custom"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('royaltiesShortcut')}
                  id="custom"
                  value={RoyaltiesShortcut.Custom}
                  className="hidden peer"
                />
              </Form.Label>
            </Form.RadioGroup>
          </Form.Label>
          {royaltiesShortcut === RoyaltiesShortcut.Custom && (
            <>
              <Form.Input
                {...register('royalties', {
                  required: royaltiesShortcut === RoyaltiesShortcut.Custom,
                  validate: (royalties) => {
                    if (!royalties) {
                      return true;
                    }

                    const amount = royalties.split('%')[0];

                    return (
                      parseFloat(amount) <= 100 ||
                      'Royalty percentage must be equal to or under a 100%'
                    );
                  },
                })}
                className="mt-2"
                placeholder="e.g. 12.5%"
              />
              <Form.Error message={formState.errors.royalties?.message} />
            </>
          )}
          <Form.Label name="Destination for royalties received" className="mt-8 text-xs">
            <Form.RadioGroup>
              <Form.Label name="Use project treasury" placement={Placement.Right}>
                <Form.RadioGroup.Radio
                  {...register('royaltiesDestination')}
                  value={RoyaltiesDestination.ProjectTreasury}
                />
              </Form.Label>
              <Form.Label name="Specify wallet address" placement={Placement.Right}>
                <Form.RadioGroup.Radio
                  {...register('royaltiesDestination')}
                  value={RoyaltiesDestination.Creators}
                />
              </Form.Label>
            </Form.RadioGroup>
          </Form.Label>

          {royaltiesDestination === RoyaltiesDestination.Creators && (
            <>
              {fields.map((field, index) => (
                <div className="flex gap-6" key={field.id}>
                  <Form.Label name="Wallet" className="text-xs mt-5 basis-3/4">
                    <Form.Input
                      {...register(`creators.${index}.address`)}
                      placeholder="Paste royalty wallet address"
                    />
                  </Form.Label>

                  <Form.Label name="Royalties" className="text-xs mt-5 basis-1/4">
                    <Form.Input
                      {...register(`creators.${index}.share`)}
                      type="number"
                      placeholder="e.g. 10%"
                    />
                  </Form.Label>
                  {creators.length > 1 && (
                    <div
                      className="rounded-md bg-stone-900 hover:bg-stone-800 p-3 self-end cursor-pointer"
                      onClick={() => remove(index)}
                    >
                      <Icon.Close stroke="stroke-white" />
                    </div>
                  )}
                </div>
              ))}
              <Button
                className="mt-4 self-start"
                variant="secondary"
                onClick={() => append({ address: '', share: Number() })}
              >
                Add wallet
              </Button>
              <Form.Error message={formState.errors.creators?.root?.message} />
            </>
          )}

          <hr className="w-full bg-stone-800 border-0 h-px my-5" />

          <div className="flex items-center justify-end gap-6">
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
