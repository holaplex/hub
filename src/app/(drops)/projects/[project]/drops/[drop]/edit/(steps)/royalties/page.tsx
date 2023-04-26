'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import Card from '../../../../../../../../../components/Card';
import { Icon } from '../../../../../../../../../components/Icon';
import { pipe, isNil, not } from 'ramda';
import { StoreApi, useStore } from 'zustand';
import {
  Blockchain,
  AssetType,
  CollectionCreatorInput,
} from '../../../../../../../../../graphql.types';
import {
  PaymentSettings,
  DropFormState,
} from '../../../../../../../../../providers/DropFormProvider';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { useProject } from '../../../../../../../../../hooks/useProject';
import { useDropForm } from '../../../../../../../../../hooks/useDropForm';

export default function NewDropRoyaltiesPage() {
  const router = useRouter();
  const { project } = useProject();
  const store = useDropForm() as StoreApi<DropFormState>;
  const detail = useStore(store, (store) => store.detail);
  const payment = useStore(store, (store) => store.payment);
  const setPayment = useStore(store, (store) => store.setPayment);

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

  const { handleSubmit, register, control, watch, formState, reset } = useForm<PaymentSettings>({
    defaultValues: payment || {
      treasuryAllRoyalties: true,
      creators: [{ address: wallet?.address, share: 100, verified: true }],
    },
  });

  const royalties = watch('royalties');

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
          case Blockchain.Polygon || Blockchain.Ethereum:
            if (creators.length > 1) {
              return 'Can only set 1 creator.';
            }
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

  const treasuryAllRoyalties = watch('treasuryAllRoyalties');

  const submit = (data: PaymentSettings) => {
    if (data.treasuryAllRoyalties) {
      data.creators = [{ address: wallet?.address as string, share: 100 }];
    }

    data.creators = data.creators.map(({ address, share }) => {
      const creator: CollectionCreatorInput = { address, share };

      if (address == wallet?.address) {
        creator.verified = true;
      }

      return creator;
    });

    setPayment(data);
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/timing`);
  };

  const back = () => {
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/details`);
  };

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Payment & royalties</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <div className="flex gap-4">
            <Form.Label name="Max supply" className="text-xs mt-5">
              <span className="text-lg">{project?.drop?.collection.supply}</span>
            </Form.Label>

            {/* <Form.Label name="Price in SOL" className="text-xs mt-5" >
              <Form.Input
                {...register('price', { required: true })}
                type="number"
                placeholder="e.g. 100"
              />
              <Form.Error message="" />
            </Form.Label> */}
          </div>

          <hr className="w-full bg-stone-800 my-4" color="#e6e6e6" />

          <span className="text-sm text-white font-medium">Royalties</span>
          <Form.Checkbox
            {...register('treasuryAllRoyalties')}
            id="royaltyInTreasuryWallet"
            label={
              <span className="text-xs font-medium text-white">
                I want to receive all royalties to the selected treasury wallet
              </span>
            }
          />
          {fields.map((field, index) => (
            <div className="flex gap-4" key={field.id}>
              <Form.Label name="Wallet" className="text-xs mt-5 basis-3/4">
                <Form.Input
                  {...register(`creators.${index}.address`)}
                  placeholder="Paste royalty wallet address"
                  disabled={treasuryAllRoyalties}
                />
              </Form.Label>

              <Form.Label name="Royalties" className="text-xs mt-5 basis-1/4">
                <Form.Input
                  {...register(`creators.${index}.share`)}
                  type="number"
                  placeholder="e.g. 10%"
                  disabled={treasuryAllRoyalties}
                />
              </Form.Label>

              {fields.length > 1 && (
                <div
                  className="rounded-md border border-gray-100 bg-gray-50 p-3 self-end cursor-pointer"
                  onClick={() => remove(index)}
                >
                  <Icon.Close />
                </div>
              )}
            </div>
          ))}

          {!treasuryAllRoyalties && (
            <Button
              className="mt-4 self-start"
              variant="secondary"
              onClick={() => append({ address: '', share: Number() })}
            >
              Add wallet
            </Button>
          )}

          <Form.Error message={formState.errors.creators?.root?.message} />

          <hr className="w-full bg-stone-800 my-4" color="#e6e6e6" />

          <span className="text-sm text-white font-medium">
            Secondary sale royalties <span className="text-gray-400">(optional)</span>
          </span>

          

          <Form.Label name="Seller fee" className="text-xs mt-3">
            <Form.Input
              {...register('royalties', {
                required: pipe(isNil, not)(royalties),
                validate: (royalties) => {
                  if (!royalties) {
                    return true;
                  }

                  const amount = royalties.split('%')[0];

                  return parseInt(amount) <= 100 || 'Seller fee must be equal to or under a 100%';
                },
              })}
              placeholder="e.g. 2.5%"
            />
            <Form.Error message={formState.errors.royalties?.message} />
          </Form.Label>

          <hr className="w-full bg-stone-800 my-5" color="#e6e6e6" />
          <div className="flex items-center justify-between">
            <Button className="self-start" variant="tertiary" onClick={back}>
              Back
            </Button>
            <Button htmlType="submit" className="self-end">
              Next
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
}
