'use client';
import { ApolloError, useMutation, useQuery, QueryResult } from '@apollo/client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Typography, { Size } from '../../../../../../../../../components/Typography';
import { MintEdition as MintEditionMutation } from '../../../../../../../../../mutations/mint.graphql';
import {
  Action,
  Blockchain,
  CollectionMint,
  DropStatus,
  MintDropInput,
} from '../../../../../../../../../graphql.types';

import { GetCollectionHolders } from '../../../../../../../../../queries/holder.graphql';
import { GetCollectionPurchases } from '../../../../../../../../../queries/purchase.graphql';
import {
  GetDropVars,
  GetDropData,
  GetCreditSheetData,
  GetOrganizationBalanceVars,
  GetOrganizationCreditBalanceData,
} from './page';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../../../../../components/Icon';
import { CreditLookup } from '../../../../../../../../../modules/credit';
import { useMemo } from 'react';

interface MintEditionVars {
  input: MintDropInput;
}

interface MintEditionData {
  mintEdition: {
    collectionMint: CollectionMint;
  };
}

interface MintEditionForm {
  recipient: string;
  compressed: boolean;
}

interface MintEditionProps {
  drop: string;
  project: string;
  dropQuery: QueryResult<GetDropData, GetDropVars>;
  creditSheetQuery: QueryResult<GetCreditSheetData>;
  creditBalanceQuery: QueryResult<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>;
}

export default function MintEdition({
  project,
  drop,
  dropQuery,
  creditBalanceQuery,
  creditSheetQuery,
}: MintEditionProps) {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm<MintEditionForm>();

  const refetchQueries = [
    { query: GetCollectionHolders, variables: { project, drop } },
    { query: GetCollectionPurchases, variables: { project, drop } },
  ];

  const [mintEdition] = useMutation<MintEditionData, MintEditionVars>(MintEditionMutation, {
    refetchQueries,
  });

  const creditBalance = creditBalanceQuery.data?.organization.credits?.balance as number;

  const creditSheet = creditSheetQuery.data?.creditSheet;

  const blockchain = dropQuery.data?.project.drop?.collection.blockchain;

  const mintCredits = useMemo(() => {
    const creditLookup = new CreditLookup(creditSheet || []);
    const mintCredits = creditLookup.cost(Action.MintEdition, blockchain as Blockchain) || 0;

    return mintCredits;
  }, [creditSheet, blockchain]);

  const onClose = () => {
    router.back();
  };
  const onSubmitLoading = formState.isSubmitting;

  const submit = async ({ recipient }: MintEditionForm) => {
    if (dropQuery?.data?.project?.drop?.status !== DropStatus.Minting) return;

    await mintEdition({
      variables: {
        input: {
          drop,
          recipient,
        },
      },
      onError: (error: ApolloError) => {
        toast.error(error.message);
      },
      onCompleted: () => {
        toast.success('Edition minted successfully to the wallet.');

        router.back();
      },
    });
  };

  return (
    <>
      <Typography.Header size={Size.H2} className="self-start">
        Mint edition to a wallet
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
            Mint edition
          </Button>
        </div>
      </Form>
    </>
  );
}
