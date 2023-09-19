'use client';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { always, when, isNil } from 'ramda';
import { useForm, useFieldArray } from 'react-hook-form';
import Card from './../../../../../../../../../components/Card';
import { StoreApi, useStore } from 'zustand';
import { Blockchain, AssetType, CreatorInput } from './../../../../../../../../../graphql.types';
import {
  PaymentSettings,
  DropFormState,
  RoyaltiesDestination,
  RoyaltiesShortcut,
} from './../../../../../../../../../providers/DropFormProvider';
import { Icon } from './../../../../../../../../../components/Icon';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { useProject } from '../../../../../../../../../hooks/useProject';
import { useDropForm } from '../../../../../../../../../hooks/useDropForm';

export default function EditDropRoyaltiesPage() {
  const router = useRouter();
  const { project } = useProject();
  const store = useDropForm() as StoreApi<DropFormState>;
  const payment = useStore(store, (store) => store.payment);
  const type = useStore(store, (store) => store.type);
  const setPayment = useStore(store, (store) => store.setPayment);

  const wallet = project?.treasury?.wallets?.find((wallet) => {
    switch (type?.blockchain.id) {
      case Blockchain.Solana:
        return wallet.assetId === AssetType.Sol;
      case Blockchain.Polygon:
        return wallet.assetId === AssetType.Matic;
      case Blockchain.Ethereum:
        return wallet.assetId === AssetType.Eth;
    }
  });

  const { handleSubmit, register, control, watch, formState } = useForm<PaymentSettings>({
    defaultValues: payment || {
      creators: [{ address: '', share: 100 }],
    },
  });

  const royaltiesDestination = watch('royaltiesDestination');
  const royaltiesShortcut = watch('royaltiesShortcut');
  const creators = watch('creators');
  const supply = when(isNil, always('Unlimited'))(type?.supply);

  const submit = (data: PaymentSettings) => {
    if (data.royaltiesDestination === RoyaltiesDestination.ProjectTreasury) {
      data.creators = [{ address: wallet?.address as string, share: 100 }];
    }

    if (data.royaltiesShortcut !== RoyaltiesShortcut.Custom) {
      data.royalties = data.royaltiesShortcut as string;
    }

    data.creators = data.creators.map(({ address, share = 100 }) => {
      const creator: CreatorInput = {
        address,
        share: typeof share === 'string' ? parseInt(share) : share,
      };

      if (address == wallet?.address) {
        creator.verified = true;
      }

      return creator;
    });

    setPayment(data);
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/schedule`);
  };

  const back = () => {
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/details`);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'creators',
    rules: {
      required: true,
      validate: (creators) => {
        switch (type?.blockchain.id) {
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
          (acc: number, creator: CreatorInput) =>
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
          {supply}

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
                  <div className="mt-5 basis-3/4 self-baseline">
                    <Form.Label name="Wallet" className="text-xs">
                      <Form.Input
                        {...register(`creators.${index}.address`, {
                          required: 'Please enter a wallet address',
                        })}
                        placeholder="Paste royalty wallet address"
                      />
                    </Form.Label>
                    <Form.Error
                      message={
                        formState.errors.creators
                          ? formState.errors.creators[index]?.address?.message
                          : ''
                      }
                    />
                  </div>

                  <Form.Label name="Royalties" className="text-xs mt-5 basis-1/4 self-baseline">
                    <Form.Input
                      {...register(`creators.${index}.share`)}
                      type="number"
                      placeholder="e.g. 10%"
                      disabled={type?.blockchain.id === Blockchain.Polygon}
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
              {type?.blockchain.id === Blockchain.Solana && (
                <Button
                  className="mt-4 self-start"
                  variant="secondary"
                  onClick={() => append({ address: '', share: Number() })}
                >
                  Add wallet
                </Button>
              )}
              <Form.Error message={formState.errors.creators?.root?.message} />
            </>
          )}

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
