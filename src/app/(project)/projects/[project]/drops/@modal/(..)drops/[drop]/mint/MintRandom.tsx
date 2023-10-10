'use client';
import { ApolloError, QueryResult, useMutation } from '@apollo/client';
import { Button, Form, Placement } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { MintRandomQueuedToDrop } from '../../../../../../../../../mutations/mint.graphql';
import {
  Action,
  Blockchain,
  CollectionMint,
  DropStatus,
  MintRandomQueuedInput,
} from '../../../../../../../../../graphql.types';
import {
  GetDropVars,
  GetDropData,
  GetCreditSheetData,
  GetOrganizationBalanceVars,
  GetOrganizationCreditBalanceData,
} from './page';
import { GetCollectionHolders } from '../../../../../../../../../queries/holder.graphql';
import { GetDropQueuedMints } from '../../../../../../../../../queries/drop.graphql';
import { GetCollectionPurchases } from '../../../../../../../../../queries/purchase.graphql';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../../../../../components/Icon';
import { CreditLookup } from '../../../../../../../../../modules/credit';
import { useMemo } from 'react';

interface MintRandomQueuedToDropVars {
  input: MintRandomQueuedInput;
}

interface MintRandomQueuedToDropData {
  mintRandomQueuedToDrop: {
    collectionMint: CollectionMint;
  };
}

interface MintEditionForm {
  recipient: string;
  compressed: boolean;
}

interface MintRandomProps {
  drop: string;
  project: string;
  dropQuery: QueryResult<GetDropData, GetDropVars>;
  creditSheetQuery: QueryResult<GetCreditSheetData>;
  creditBalanceQuery: QueryResult<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>;
}

export default function MintRandom({
  project,
  drop,
  dropQuery,
  creditSheetQuery,
  creditBalanceQuery,
}: MintRandomProps) {
  const router = useRouter();

  const { register, handleSubmit, formState, setError, watch } = useForm<MintEditionForm>();

  const refetchQueries = [
    { query: GetCollectionHolders, variables: { project, drop } },
    { query: GetCollectionPurchases, variables: { project, drop } },
    { query: GetDropQueuedMints, variables: { drop } },
  ];

  const compressed = watch('compressed');

  const [mintRandomQueuedToDrop] = useMutation<
    MintRandomQueuedToDropData,
    MintRandomQueuedToDropVars
  >(MintRandomQueuedToDrop, {
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

  const submit = async ({ recipient, compressed }: MintEditionForm) => {
    if (dropQuery?.data?.project?.drop?.status !== DropStatus.Minting) return;

    await mintRandomQueuedToDrop({
      variables: {
        input: {
          drop,
          recipient,
          compressed,
        },
      },
      onError,
      onCompleted: () => {
        toast.success('A random mint was successfully sent to the wallet.');

        router.back();
      },
    });
  };

  return (
    <>
      <Typography.Header size={Size.H2} className="self-start">
        Mint random to a wallet
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
        <Form.Label name="Mint as compressed NFT?" placement={Placement.Right} className="mt-5">
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
              <Link href="/credits/costs" className="flex-none">
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
            Mint random
          </Button>
        </div>
      </Form>
    </>
  );
}
