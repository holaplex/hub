'use client';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
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

export default function EditDropRoyaltiesPage() {
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

  const { handleSubmit, register, control, watch, formState } = useForm<PaymentSettings>({
    defaultValues: payment || {
      royaltyDestination: 'projectTreasury',
      creators: [],
    },
  });

  const royaltyDestination = watch('royaltyDestination');
  const royaltyPercentage = watch('royaltyPercentage');

  const submit = (data: PaymentSettings) => {
    if (data.royaltyDestination === 'projectTreasury') {
      data.creators = [{ address: wallet?.address as string, share: 100 }];
    }

    data.creators = data.creators.map(({ address, share = 100 }) => {
      const creator: CollectionCreatorInput = { address, share };

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

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Supply</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <div className="flex gap-4">
            <Form.Label name="Specify how many editions will be available" className="text-xs mt-5">
              <Form.Input {...register('supply')} autoFocus placeholder="e.g. 10,000" />
            </Form.Label>
          </div>

          <Typography.Header size={Size.H2} className="mt-6 mb-8">
            Royalties
          </Typography.Header>

          <Form.Label name="Royalty percentage">
            <Form.RadioGroup>
              <Form.Label
                name="0%"
                htmlFor="0"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('royaltyPercentage')}
                  id="0"
                  value="0"
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
                  {...register('royaltyPercentage')}
                  id="2.5"
                  value="2.5"
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
                  {...register('royaltyPercentage')}
                  id="5"
                  value="5"
                  className="hidden peer"
                />
              </Form.Label>
              <Form.Label
                name="10%"
                htmlFor="10"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('royaltyPercentage')}
                  id="10"
                  value="10"
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
                  {...register('royaltyPercentage')}
                  id="custom"
                  value="custom"
                  className="hidden peer"
                />
              </Form.Label>
            </Form.RadioGroup>
          </Form.Label>
          {royaltyPercentage === 'custom' && (
            <>
              <Form.Input
                {...register('customRoyalty', {
                  required: royaltyPercentage === 'custom',
                  validate: (customRoyalty) => {
                    if (!customRoyalty) {
                      return true;
                    }

                    const amount = customRoyalty.split('%')[0];

                    return (
                      parseFloat(amount) <= 100 ||
                      'Royalty percentage must be equal to or under a 100%'
                    );
                  },
                })}
                className="mt-2"
                placeholder="e.g. 12.5%"
              />
              <Form.Error message={formState.errors.customRoyalty?.message} />
            </>
          )}

          <Form.Label name="Destination for royalties received" className="mt-8">
            <Form.RadioGroup>
              <Form.Label name="Use project treasury" placement={Placement.Right}>
                <Form.RadioGroup.Radio
                  {...register('royaltyDestination')}
                  value="projectTreasury"
                />
              </Form.Label>
              <Form.Label name="Specify wallet address" placement={Placement.Right}>
                <Form.RadioGroup.Radio {...register('royaltyDestination')} value="specifyWallet" />
              </Form.Label>
            </Form.RadioGroup>
          </Form.Label>

          {royaltyDestination === 'specifyWallet' && (
            <Form.Input
              {...register(`creators.${0}.address`)}
              placeholder="Enter Solana wallet address"
              className="mt-2"
            />
          )}

          <Form.Error message={formState.errors.creators?.root?.message} />

          <hr className="w-full bg-divider border-0 h-px my-5" color="#e6e6e6" />

          <div className="flex items-center justify-end gap-4">
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
