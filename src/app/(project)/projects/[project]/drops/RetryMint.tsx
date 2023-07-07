'use client';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button } from '@holaplex/ui-library-react';
import { GetCollectionPurchases } from './../../../../../queries/purchase.graphql';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { RetryMintInput, RetryMintPayload } from '../../../../../graphql.types';
import { RetryMint as RetryMintMutation } from './../../../../../mutations/mint.graphql';
import { GetProjectDrops } from './../../../../../queries/drop.graphql';
import { useRouter } from 'next/navigation';

interface RetryMintData {
  retryMint: RetryMintPayload;
}

interface RetryMintVars {
  input: RetryMintInput;
}

interface RetryMintProps {
  drop: string;
  project: string;
  mint: string;
}

export default function RetryMint({ drop, project, mint }: RetryMintProps) {
  const router = useRouter();

  const [retryMint, { loading }] = useMutation<RetryMintData, RetryMintVars>(RetryMintMutation);

  const onRetry = () => {
    retryMint({
      variables: {
        input: {
          id: mint,
        },
      },
      refetchQueries: [{ query: GetCollectionPurchases, variables: { project, drop } }],
      onCompleted: () => {
        toast.success('Retrying to create the mint.');
        router.back();
      },
      onError: (error: ApolloError) => {
        toast.error(error.message);
        router.back();
      },
    });
  };

  const onClose = () => {
    router.back();
  };

  return (
    <div className="w-max mx-auto">
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Retry mint</Typography.Header>
        <Typography.Header size={Size.H3} className="mt-2">
          Are you sure you want to retry creating the mint?
          <p>
            Retrying the mint will not charge your account any credits. If the mint continues to
            fail please reach out to <a href="mailto:support@holaplex.com">support</a>.
          </p>
        </Typography.Header>

        <div className="flex flex-col gap-2 mt-4">
          <Button
            htmlType="submit"
            className="w-full mt-5"
            onClick={onRetry}
            loading={loading}
            disabled={loading}
          >
            Retry
          </Button>
          <Button variant="secondary" className="w-full" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </div>
      </Card>
    </div>
  );
}
