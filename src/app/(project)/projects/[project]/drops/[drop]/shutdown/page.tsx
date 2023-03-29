'use client';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../components/Typography';
import { GetDropBasicDetail } from './../../../../../../../queries/drop.graphql';
import { ShutdownDrop } from './../../../../../../../mutations/drop.graphql';
import {
  Project,
  PauseDropInput,
  PauseDropPayload,
  ShutdownDropPayload,
  ShutdownDropInput,
} from '../../../../../../../graphql.types';

interface ShutdownDropData {
  shutdownDrop: ShutdownDropPayload;
}

interface ShutdownDropVars {
  input: ShutdownDropInput;
}
interface GetDropData {
  project: Project;
}

interface GetDropVars {
  drop: string;
  project: string;
}
interface ShutdownDropProps {
  params: { drop: string; project: string };
}

export default function ShutdownDropPage({ params: { drop, project } }: ShutdownDropProps) {
  const router = useRouter();

  const onClose = () => {
    router.push(`/projects/${project}/drops/`);
  };

  const dropQuery = useQuery<GetDropData, GetDropVars>(GetDropBasicDetail, {
    variables: { drop, project },
  });

  const [shutdownDrop, { loading }] = useMutation<ShutdownDropData, ShutdownDropVars>(ShutdownDrop);

  const onShutdown = () => {
    shutdownDrop({
      variables: {
        input: {
          drop,
        },
      },
      onCompleted: () => {
        router.push(`/projects/${project}/drops/`);
      },
    });
  };

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Shut-down minting?</Typography.Header>
        {dropQuery.loading ? (
          <>
            <div className="mt-2 flex flex-col gap-1">
              <div className="w-full h-4 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-full h-4 rounded-md bg-gray-100 animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H3} className="mt-2">
              Are you sure you want to shut-down{' '}
              <span className="text-primary font-medium">
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
                disabled={loading}
              >
                Shut-down mint
              </Button>
              <Button variant="tertiary" className="w-full" onClick={onClose} disabled={loading}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Card>
    </Modal>
  );
}
