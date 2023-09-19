'use client';

import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Typography, { Size } from '../../../../../../../../../../../components/Typography';
import { MintQueued } from '../../../../../../../../../../../mutations/mint.graphql';
import {
  Action,
  Blockchain,
  CollectionMint,
  DropStatus,
  Organization,
  ActionCost,
  Project,
  MintQueuedInput,
} from '../../../../../../../../../../../graphql.types';
import Card from '../../../../../../../../../../../components/Card';
import { GetCollectionHolders } from '../../../../../../../../../../../queries/holder.graphql';
import { GetCollectionPurchases } from '../../../../../../../../../../../queries/purchase.graphql';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../../../../../../../components/Icon';
import { CreditLookup } from '../../../../../../../../../../../modules/credit';
import { useMemo } from 'react';
import { useOrganization } from '../../../../../../../../../../../hooks/useOrganization';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../../../../../../../queries/credits.graphql';
import { GetDrop, GetDropQueuedMints } from '../../../../../../../../../../../queries/drop.graphql';

interface MintQueuedSupplyProps {
  project: string;
  drop: string;
  mint: string;
}

export interface GetDropVars {
  project: string;
  drop: string;
}

export interface GetOrganizationBalanceVars {
  organization: string;
}

export interface GetOrganizationCreditBalanceData {
  organization: Organization;
}

export interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

interface MintQueuedData {
  mintQueued: {
    collectionMint: CollectionMint;
  };
}

interface MintQueuedVars {
  input: MintQueuedInput;
}

export interface GetDropData {
  project: Pick<Project, 'drop' | 'treasury'>;
}

interface MintQueuedForm {
  recipient: string;
  compressed: boolean;
}

export default function MintQueuedSupply({ project, drop, mint }: MintQueuedSupplyProps) {
  const router = useRouter();
  const { organization } = useOrganization();

  const dropQuery = useQuery<GetDropData, GetDropVars>(GetDrop, { variables: { project, drop } });

  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);

  const creditBalanceQuery = useQuery<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>(
    GetOrganizationCreditBalance,
    {
      variables: { organization: organization?.id },
    }
  );

  const { register, handleSubmit, formState, setError, watch } = useForm<MintQueuedForm>();

  const refetchQueries = [
    { query: GetCollectionHolders, variables: { project, drop } },
    { query: GetCollectionPurchases, variables: { project, drop } },
    { query: GetDropQueuedMints, variables: { drop } },
  ];

  const compressed = watch('compressed');

  const [mintQueued] = useMutation<MintQueuedData, MintQueuedVars>(MintQueued, {
    refetchQueries,
  });

  const creditBalance = creditBalanceQuery.data?.organization.credits?.balance as number;

  const creditSheet = creditSheetQuery.data?.creditSheet;

  const blockchain = dropQuery.data?.project.drop?.collection.blockchain;

  const mintCredits = useMemo(() => {
    const creditLookup = new CreditLookup(creditSheet || []);
    const action = compressed ? Action.MintCompressed : Action.Mint;
    const mintCredits = creditLookup.cost(action, blockchain as Blockchain) || 0;

    return mintCredits;
  }, [creditSheet, blockchain, compressed]);

  const onClose = () => {
    router.back();
  };

  const onError = (error: ApolloError) => {
    toast.error(error.message);
  };

  const onSubmitLoading = formState.isSubmitting;

  const submit = async ({ recipient, compressed }: MintQueuedForm) => {
    if (dropQuery?.data?.project?.drop?.status !== DropStatus.Minting) return;

    await mintQueued({
      variables: {
        input: {
          mint,
          recipient,
          compressed,
        },
      },
      onError,
      onCompleted: () => {
        toast.success('Mint was successfully sent to the wallet.');

        router.back();
      },
    });
  };

  const loading = dropQuery.loading || creditBalanceQuery.loading || creditSheetQuery.loading;

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[446px]">
        {loading ? (
          <>
            <div className="bg-stone-800 animate-pulse h-8 w-32 rounded-md" />
            <div className="bg-stone-800 animate-pulse h-4 w-20 rounded-md mt-5" />
            <div className="bg-stone-800 animate-pulse h-10 w-full rounded-md mt-2" />
            <div className="bg-stone-800 animate-pulse h-10 w-full rounded-md mt-6" />

            <div className="flex justify-end items-center gap-2 mt-12">
              <div className="bg-stone-800 animate-pulse h-10 w-36 rounded-md mt-5" />
              <div className="bg-stone-800 animate-pulse h-10 w-36 rounded-md mt-5" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H2} className="self-start">
              Mint to a wallet
            </Typography.Header>

            <Form className="flex flex-col mt-5" onSubmit={handleSubmit(submit)}>
              <Form.Label
                name={`Enter a ${blockchain?.toLowerCase()} wallet address`}
                className="text-sm text-gray-400"
              >
                <Form.Input
                  autoFocus
                  {...register('recipient', { required: 'Please enter the wallet address.' })}
                />
                <Form.Error message={formState.errors.recipient?.message} />
              </Form.Label>
              <Form.Label
                name="Mint as compressed NFT?"
                placement={Placement.Right}
                className="mt-5"
              >
                <Form.Checkbox {...register('compressed')} />
              </Form.Label>

              {creditBalance && mintCredits && (
                <div className="flex items-center gap-3 rounded-lg bg-stone-950 p-4 mt-6">
                  <Icon.Balance />
                  <div className="text-gray-400 text-xs font-medium text-left">
                    Cost to mint is <span className="text-white">{mintCredits}</span> credits. You
                    currently have{' '}
                    <span
                      className={clsx({
                        'text-red-500': mintCredits > creditBalance,
                        'text-green-400': mintCredits <= creditBalance,
                      })}
                    >
                      {creditBalance}
                    </span>{' '}
                    credits.
                  </div>

                  {mintCredits > creditBalance && (
                    <Link href="/credits/buy" className="flex-none">
                      <Button>Buy credits</Button>
                    </Link>
                  )}
                </div>
              )}

              <hr className="w-full bg-stone-800 border-0 h-px my-6" />

              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" onClick={onClose} disabled={onSubmitLoading}>
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  disabled={
                    onSubmitLoading || dropQuery.data?.project.drop?.status !== DropStatus.Minting
                  }
                  loading={onSubmitLoading}
                >
                  Mint
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>
    </Modal>
  );
}
