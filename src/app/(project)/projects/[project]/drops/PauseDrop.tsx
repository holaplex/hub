'use client';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button } from '@holaplex/ui-library-react';
import { GetDropBasicDetail } from './../../../../../queries/drop.graphql';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { PauseDropInput, PauseDropPayload, Project } from '../../../../../graphql.types';
import { PauseDrop as PauseDropMutation } from './../../../../../mutations/drop.graphql';
import { useRouter } from 'next/navigation';

interface GetDropData {
  project: Project;
}

interface GetDropVars {
  drop: string;
  project: string;
}

interface PauseDropData {
  pauseDrop: PauseDropPayload;
}

interface PauseDropVars {
  input: PauseDropInput;
}

interface PauseDropProps {
  drop: string;
  project: string;
}

export default function PauseDrop({ drop, project }: PauseDropProps) {
  const router = useRouter();

  const dropQuery = useQuery<GetDropData, GetDropVars>(GetDropBasicDetail, {
    variables: { drop, project },
  });
  const [pauseDrop, { loading }] = useMutation<PauseDropData, PauseDropVars>(PauseDropMutation);

  const onPause = () => {
    pauseDrop({
      variables: {
        input: {
          drop: dropQuery.data?.project.drop?.id,
        },
      },
      update(cache, { data }) {
        const drop = data?.pauseDrop.drop;

        if (drop) {
          cache.modify({
            id: cache.identify(drop),
            fields: {
              pausedAt() {
                return drop.pausedAt;
              },
              status() {
                return drop.status;
              },
            },
          });
        }
      },
      onCompleted: () => {
        toast.success('Drop paused successfully.');
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
        <Typography.Header size={Size.H2}>Pause mint</Typography.Header>
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
              Are you sure you want to pause{' '}
              <span className="text-white font-medium">
                {dropQuery.data?.project.drop?.collection.metadataJson?.name}
              </span>{' '}
              drop and stop sales?
            </Typography.Header>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                htmlType="submit"
                className="w-full mt-5"
                variant="failure"
                onClick={onPause}
                disabled={loading}
                loading={loading}
              >
                Pause mint
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
