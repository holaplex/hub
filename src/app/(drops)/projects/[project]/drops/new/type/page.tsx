'use client';
import { useMemo } from 'react';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { useForm, Controller } from 'react-hook-form';
import Card from '../../../../../../../components/Card';
import { Blockchain, Action, Organization, ActionCost } from '../../../../../../../graphql.types';
import Typography, { Size } from '../../../../../../../components/Typography';
import { useProject } from '../../../../../../../hooks/useProject';
import { StoreApi, useStore } from 'zustand';
import {
  TypeSettings,
  DropFormState,
  DropType,
  blockchainOptions,
} from '../../../../../../../providers/DropFormProvider';
import { Icon } from '../../../../../../../components/Icon';
import { useDropForm } from '../../../../../../../hooks/useDropForm';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../../../queries/credits.graphql';
import clsx from 'clsx';
import { CreditLookup } from '../../../../../../../modules/credit';
import Link from 'next/link';e

interface GetOrganizationBalanceVars {
  organization: string;
}

interface GetOrganizationCreditBalanceData {
  organization: Organization;
}

interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

export default function NewDropTypePage() {
  const router = useRouter();
  const { project } = useProject();
  const store = useDropForm() as StoreApi<DropFormState>;
  const type = useStore(store, (store) => store.type);
  const setType = useStore(store, (store) => store.setType);

  const { handleSubmit, register, control, watch, formState } = useForm<TypeSettings>({
    defaultValues: type || {
      type: DropType.Edition,
      blockchain: {
        id: Blockchain.Solana,
        name: 'Solana',
      },
    },
  });
  const creditBalanceQuery = useQuery<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>(
    GetOrganizationCreditBalance,
    {
      variables: { organization: project?.organization?.id },
    }
  );
  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);
  const creditBalance = creditBalanceQuery.data?.organization.credits?.balance;

  const creditSheet = creditSheetQuery.data?.creditSheet;

  const supply = parseInt(watch('supply')?.replaceAll(',', '')) || false;
  const blockchain = watch('blockchain');

  const expectedCreditCost = useMemo(() => {
    const creditLookup = new CreditLookup(creditSheet || []);

    const mintDropCredits = creditLookup.cost(Action.MintEdition, blockchain.id as Blockchain) || 0;
    const createWalletCredits =
      creditLookup.cost(Action.CreateWallet, blockchain.id as Blockchain) || 0;

    if (!supply) {
      return undefined;
    }

    return (mintDropCredits + createWalletCredits) * supply;
  }, [creditSheet, blockchain.id, supply]);

  const submit = (data: TypeSettings) => {
    if (data.type === DropType.Open) {
      data.blockchain = {
        id: Blockchain.Solana,
        name: 'Solana',
      };

      data.supply = '0';
    }
    setType(data);
    router.push(`/projects/${project?.id}/drops/new/details`);
  };

  const dropType = watch('type');

  return (
    <>
      <Card className="w-[492px]">
        <Typography.Header size={Size.H2}>Drop Type</Typography.Header>
        <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
          <Form.Label name="" className="text-xs">
            <Form.RadioGroup>
              <Form.Label
                name={
                  <ul className="flex flex-col gap-2 justify-center text-center">
                    <li className="font-semibold text-base text-white">Edition</li>
                    <li className="text-gray-400 text-sm">
                      Distribute multiple copies of the same NFT.
                    </li>
                  </ul>
                }
                htmlFor="EDITION"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('type')}
                  id="EDITION"
                  value={DropType.Edition}
                  className="hidden peer"
                />
              </Form.Label>
              <Form.Label
                name={
                  <ul className="flex flex-col gap-2 justify-center text-center">
                    <li className="font-semibold text-base text-white">Open (Generative)</li>
                    <li className="text-gray-400 text-sm">Distribute many different NFTs.</li>
                  </ul>
                }
                htmlFor="OPEN"
                placement={Placement.Right}
                peerClassName="form-radio-custombox"
              >
                <Form.RadioGroup.Radio
                  {...register('type')}
                  id="OPEN"
                  value={DropType.Open}
                  className="hidden peer"
                />
              </Form.Label>
            </Form.RadioGroup>
          </Form.Label>
          {dropType === DropType.Edition ? (
            <>
              <Form.Label name="Blockchain" className="text-xs mt-8">
                <Controller
                  name="blockchain"
                  control={control}
                  rules={{ required: 'Please select a blockchain.' }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Form.Select value={value} onChange={onChange}>
                        <Form.Select.Button placeholder="Select blockchain">
                          {value.name}
                        </Form.Select.Button>
                        <Form.Select.Options>
                          {blockchainOptions.map((i) => (
                            <Form.Select.Option value={i} key={i.id}>
                              <>{i.name}</>
                            </Form.Select.Option>
                          ))}
                        </Form.Select.Options>
                      </Form.Select>
                    );
                  }}
                />
              </Form.Label>
              <Form.Error message={formState.errors.blockchain?.message} />
              <Typography.Header size={Size.H2} className="mt-8">
                Supply
              </Typography.Header>
              <Form.Label name="How many editions will be available?" className="text-xs mt-5">
                <Form.Input
                  {...register('supply', {
                    validate: (value) => {
                      if (
                        type?.blockchain.id === Blockchain.Polygon &&
                        value.replaceAll(',', '').length === 0
                      ) {
                        return 'Supply cannot be empty.';
                      }
                    },
                  })}
                  autoFocus
                  placeholder="e.g. 10,000"
                />
              </Form.Label>
              <Form.Error message={formState.errors.supply?.message} />
            </>
          ) : (
            <>
              <div className="rounded-lg bg-stone-950 p-4 text-gray-400 mt-8 text-sm">
                Once you&apos;ve created your drop you will be able to add images and metadata for
                the NFTs you&apos;d like to distribute using our CLI tool.{' '}
                <a
                  className="text-yellow-300 hover:text-yellow-500 hover:underline transition"
                  href="#"
                >
                  Learn more
                </a>{' '}
                about how this works.
              </div>
              <p className="text-gray-400 mt-8 text-sm">
                Only Solana is currently supported for unique drops
              </p>
              {creditBalance && expectedCreditCost && (
                <div className="flex items-center gap-4 rounded-lg bg-stone-950 p-4">
                  <div className="flex items-center gap-2 shrink">
                    <Icon.Balance />
                    <div className="text-gray-400 text-xs font-medium shrink">
                      You will need <span className="text-white">{expectedCreditCost}</span> credits
                      to mint {supply} NFTs with each NFT minted to a unique generated wallet. You
                      currently have{' '}
                      <span
                        className={clsx({
                          'text-red-500': expectedCreditCost > creditBalance,
                          'text-green-400': expectedCreditCost <= creditBalance,
                        })}
                      >
                        {creditBalance}
                      </span>{' '}
                      credits.
                    </div>
                  </div>
                  {expectedCreditCost > creditBalance && (
                    <Link href="/credits/costs">
                      <Button>Buy credits</Button>
                    </Link>
                  )}
                </div>
              )}
            </>
          )}

          <hr className="w-full bg-stone-800 border-0 h-px my-5" />

          <div className="flex items-center justify-end gap-6">
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
