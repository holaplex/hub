'use client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import Card from '../../../../../../../../../components/Card';
import { Icon } from '../../../../../../../../../components/Icon';
import { pipe, isNil, not } from 'ramda';
import {
  Blockchain,
  AssetType,
  CollectionCreatorInput,
} from '../../../../../../../../../graphql.types';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { useProject } from '../../../../../../../../../hooks/useProject';
import useCreateDropStore, {
  StepTwoData,
} from '../../../../../../../../../hooks/useCreateDropStore';
import { useEffect } from 'react';

export default function NewDropRoyaltiesPage() {
  const router = useRouter();
  const { project } = useProject();
  const { stepTwo, stepOne, setData } = useCreateDropStore();

  const wallet = project?.treasury?.wallets?.find((wallet) => {
    switch (stepOne?.blockchain.id) {
      case Blockchain.Solana:
        return wallet.assetId === AssetType.SolTest || wallet.assetId === AssetType.Sol;
      case Blockchain.Polygon:
        return wallet.assetId === AssetType.MaticTest || wallet.assetId === AssetType.Matic;
      case Blockchain.Ethereum:
        return wallet.assetId === AssetType.EthTest || wallet.assetId === AssetType.Eth;
    }
  });

  const { handleSubmit, register, control, watch, formState, reset } = useForm<StepTwoData>({
    defaultValues: stepTwo || {
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
        switch (stepOne?.blockchain.id) {
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

  const submit = (data: StepTwoData) => {
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

    setData({ step: 2, data });
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/timing`);
  };

  const back = () => {
    router.push(`/projects/${project?.id}/drops/${project?.drop?.id}/edit/details`);
  };

  useEffect(() => {
    if (stepTwo) {
      reset(stepTwo);
    }
  }, [reset, stepTwo]);

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Payment & royalties</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <div className="flex gap-4">
            <Form.Label name="Max supply" className="text-xs mt-5">
              <Form.Input {...register('supply')} autoFocus placeholder="e.g. 10,000" />
              <Form.Error message="" />
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

          <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

          <span className="text-sm text-primary font-medium">Royalties</span>
          <Form.Checkbox
            {...register('treasuryAllRoyalties')}
            id="royaltyInTreasuryWallet"
            label={
              <span className="text-xs font-medium text-primary">
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

          <hr className="w-full bg-gray-500 my-4" color="#e6e6e6" />

          <span className="text-sm text-primary font-medium">
            Secondary sale royalties <span className="text-gray-500">(optional)</span>
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

          <hr className="w-full bg-gray-500 my-5" color="#e6e6e6" />
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
