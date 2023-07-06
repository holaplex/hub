'use client';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button } from '@holaplex/ui-library-react';
import { GetDropBasicDetail } from './../../../../../queries/drop.graphql';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { CreateDropPayload, Project, RetryDropInput } from '../../../../../graphql.types';
import { RetryDrop as RetryDropMutation } from './../../../../../mutations/drop.graphql';
import { GetProjectDrops } from './../../../../../queries/drop.graphql';
import { useRouter } from 'next/navigation';

interface GetDropData {
  project: Project;
}

interface GetDropVars {
  drop: string;
  project: string;
}

interface RetryDropData {
  retryDrop: CreateDropPayload;
}

interface RetryDropVars {
  input: RetryDropInput;
}

interface RetryDropProps {
  drop: string;
  project: string;
}

export default function RetryDrop({ drop, project }: RetryDropProps) {
  const router = useRouter();

  const dropQuery = useQuery<GetDropData, GetDropVars>(GetDropBasicDetail, {
    variables: { drop, project },
  });
  const [retryDrop, { loading }] = useMutation<RetryDropData, RetryDropVars>(RetryDropMutation);

  const onRetry = () => {
    retryDrop({
      variables: {
        input: {
          drop: dropQuery.data?.project.drop?.id,
        },
      },
      refetchQueries: [{ query: GetProjectDrops, variables: { project } }],
      onCompleted: () => {
        toast.success('Retrying to create the drop.');
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
        <Typography.Header size={Size.H2}>Retry drop</Typography.Header>
        {dropQuery.loading ? (
          <>
            <div className="mt-2 flex flex-col gap-1">
              <div className="w-full h-4 rounded-md bg-stone-800 animate-pulse" />
              <div className="w-full h-4 rounded-md bg-stone-800 animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H3} className="mt-2">
              Are you sure you want to retry creating{' '}
              <span className="text-white font-medium">
                {dropQuery.data?.project.drop?.collection.metadataJson?.name}
              </span>{' '}
              drop?
              <p>
                Retrying the drop will not charge your account any credits. If the drop continues to
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
          </>
        )}
      </Card>
    </div>
  );
}
