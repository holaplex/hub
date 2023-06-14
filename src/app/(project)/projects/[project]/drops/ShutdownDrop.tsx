'use client';
import { ApolloError, useMutation, useQuery } from '@apollo/client';
import { Button } from '@holaplex/ui-library-react';
import { GetDropBasicDetail } from './../../../../../queries/drop.graphql';
import { toast } from 'react-toastify';
import Card from '../../../../../components/Card';
import Typography, { Size } from '../../../../../components/Typography';
import { Project, ShutdownDropInput, ShutdownDropPayload } from '../../../../../graphql.types';
import { ShutdownDrop as ShutdownDropMutation } from './../../../../../mutations/drop.graphql';
import { useRouter } from 'next/navigation';

interface GetDropData {
  project: Project;
}

interface GetDropVars {
  drop: string;
  project: string;
}

interface ShutdownDropData {
  shutdownDrop: ShutdownDropPayload;
}

interface ShutdownDropVars {
  input: ShutdownDropInput;
}

interface ShutdownDropProps {
  drop: string;
  project: string;
}

export default function ShutdownDrop({ drop, project }: ShutdownDropProps) {
  const router = useRouter();

  const dropQuery = useQuery<GetDropData, GetDropVars>(GetDropBasicDetail, {
    variables: { drop, project },
  });
  const [shutdownDrop, { loading }] = useMutation<ShutdownDropData, ShutdownDropVars>(
    ShutdownDropMutation
  );

  const onShutdown = () => {
    shutdownDrop({
      variables: {
        input: {
          drop: dropQuery.data?.project.drop?.id,
        },
      },
      update(cache, { data }) {
        const drop = data?.shutdownDrop?.drop;

        if (drop) {
          cache.modify({
            id: cache.identify(drop),
            fields: {
              shutdownAt() {
                return drop.shutdownAt;
              },
              status() {
                return drop.status;
              },
            },
          });
        }
      },
      onCompleted: () => {
        toast.info('Drop shutdown successfully.');
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
              Are you sure you want to shut-down{' '}
              <span className="text-white font-medium">
                {dropQuery.data?.project.drop?.collection.metadataJson?.name}
              </span>{' '}
              minting?
            </Typography.Header>

            <div className="flex flex-col gap-2 mt-4">
              <Button
                htmlType="submit"
                className="w-full mt-5"
                variant="failure"
                onClick={onShutdown}
                loading={loading}
                disabled={loading}
              >
                Shut-down mint
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
