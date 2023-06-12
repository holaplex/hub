'use client';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button, Form } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { MintEdition as MintEditionMutation } from '../../../../../mutations/mint.graphql';
import {
  Action,
  ActionCost,
  BlockchainCost,
  MintDropInput,
  Organization,
  Project,
} from '../../../../../graphql.types';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../queries/credits.graphql';
import { GetDrop } from '../../../../../queries/drop.graphql';
import { useOrganization } from '../../../../../hooks/useOrganization';
import clsx from 'clsx';
import Link from 'next/link';
import { Icon } from '../../../../../components/Icon';
interface MintEditionVars {
  input: MintDropInput;
}

interface MintEditionData {
  mintEdition: MintEditionData;
}

interface MintEditionForm {
  recipient: string;
}

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetDropsData {
  project: Pick<Project, 'drop' | 'treasury'>;
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

interface MintEditionProps {
  drop: string;
  project: string;
}

export default function MintEdition({ project, drop }: MintEditionProps) {
  const router = useRouter();
  const { organization } = useOrganization();

  const { register, handleSubmit, formState, setError } = useForm<MintEditionForm>();

  const [mintEdition, mintEditionResult] = useMutation<MintEditionData, MintEditionVars>(
    MintEditionMutation
  );

  const dropQuery = useQuery<GetDropsData, GetDropVars>(GetDrop, { variables: { project, drop } });

  const creditBalanceQuery = useQuery<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>(
    GetOrganizationCreditBalance,
    {
      variables: { organization: organization?.id },
    }
  );
  const creditBalance = creditBalanceQuery.data?.organization.credits?.balance as number;

  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);

  const creditSheet = creditSheetQuery.data?.creditSheet;

  const blockchain = dropQuery.data?.project.drop?.collection.blockchain;

  const mintEditionCredits = creditSheet
    ?.find((actionCost: ActionCost) => actionCost.action === Action.MintEdition)
    ?.blockchains.find(
      (blockchainCost: BlockchainCost) => blockchainCost.blockchain === blockchain
    )?.credits;

  const onClose = () => {
    router.back();
  };

  const loading = dropQuery.loading || creditBalanceQuery.loading || creditSheetQuery.loading;
  const onSubmitLoading = mintEditionResult.loading || formState.isSubmitting;

  const submit = async ({ recipient }: MintEditionForm) => {
    mintEdition({
      variables: {
        input: {
          drop,
          recipient,
        },
      },
      onError: (error: ApolloError) => {
        toast.error(`Failed to mint edition. Here's the reason -  ${error.message}`);
      },
      onCompleted: () => {
        toast.success('Edition minted successfully to the wallet.');
        router.push(`/projects/${project}/drops/${drop}/holders`);
      },
    });
  };

  return (
    <div className="w-max mx-auto">
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

              {creditBalance && mintEditionCredits && (
                <div className="flex items-center gap-3 rounded-lg bg-stone-950 p-4 mt-6">
                  <Icon.Balance />
                  <div className="text-gray-400 text-xs font-medium text-left">
                    Cost to mint is <span className="text-white">{mintEditionCredits}</span>{' '}
                    credits. You currently have{' '}
                    <span
                      className={clsx({
                        'text-red-500': mintEditionCredits > creditBalance,
                        'text-green-400': mintEditionCredits <= creditBalance,
                      })}
                    >
                      {creditBalance}
                    </span>{' '}
                    credits.
                  </div>

                  {mintEditionCredits > creditBalance && (
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
                <Button htmlType="submit" disabled={onSubmitLoading} loading={onSubmitLoading}>
                  Mint edition
                </Button>
              </div>
            </Form>
          </>
        )}
      </Card>
    </div>
  );
}
