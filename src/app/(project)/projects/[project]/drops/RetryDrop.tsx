'use client';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button } from '@holaplex/ui-library-react';
import { GetDropBasicDetail } from './../../../../../queries/drop.graphql';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { CreateDropPayload, Project, RetryDropInput } from '../../../../../graphql.types';
import { RetryDrop as RetryDropMutation } from './../../../../../mutations/drop.graphql';
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
      update(cache, { data }) {
        const drop = data?.retryDrop?.drop;

        if (drop) {
          cache.modify({
            id: cache.identify(drop),
            fields: {
              createdAt() {
                return drop.createdAt;
              },
              status() {
                return drop.status;
              },
            },
          });
        }
      },
      onCompleted: () => {
        toast.info('Drop created successfully.');
        router.back();
      },
      onError: (error: ApolloError) => {
        toast.error(error.message);
      },
    });
  };

  const onClose = () => {
    router.back();
  };

  return (
    <div className="w-max mx-auto">
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Shut-down mint</Typography.Header>
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
            </Typography.Header>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                htmlType="submit"
                className="w-full mt-5"
                variant="failure"
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
