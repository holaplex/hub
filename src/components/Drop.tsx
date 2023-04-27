import { useLazyQuery, useMutation } from '@apollo/client';
import { Button, Modal } from '@holaplex/ui-library-react';
import { useState } from 'react';
import {
  PauseDropInput,
  PauseDropPayload,
  Project,
  ResumeDropInput,
  ResumeDropPayload,
  ShutdownDropInput,
  ShutdownDropPayload,
} from '../graphql.types';
import { PauseDrop, ResumeDrop, ShutdownDrop } from './../mutations/drop.graphql';
import { GetDropBasicDetail } from './../queries/drop.graphql';
import Card from './Card';
import Typography, { Size } from './Typography';

export function Drop() {
  return <div />;
}

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

interface PauseRenderProps {
  pause: (drop: string, project: string) => void;
}

interface PauseProps {
  children: (args: PauseRenderProps) => any;
}

function Pause({ children }: PauseProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const [dropQuery, dropQueryResult] = useLazyQuery<GetDropData, GetDropVars>(GetDropBasicDetail);

  const openPause = (drop: string, project: string) => {
    dropQuery({ variables: { drop, project } });
    setOpen(true);
  };

  const [pauseDrop, { loading }] = useMutation<PauseDropData, PauseDropVars>(PauseDrop);

  const onPause = () => {
    pauseDrop({
      variables: {
        input: {
          drop: dropQueryResult.data?.project.drop?.id,
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
        setOpen(false);
      },
    });
  };

  return (
    <>
      {children({
        pause: openPause,
      })}
      <Modal open={open} setOpen={setOpen}>
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Pause mint</Typography.Header>
          {dropQueryResult.loading ? (
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
                  {dropQueryResult.data?.project.drop?.collection.metadataJson?.name}
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
                >
                  Pause mint
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
}
Drop.Pause = Pause;

interface ResumeDropData {
  resumeDrop: ResumeDropPayload;
}

interface ResumeDropVars {
  input: ResumeDropInput;
}

interface ResumeRenderProps {
  resume: (drop: string, project: string) => void;
}

interface ResumeProps {
  children: (args: ResumeRenderProps) => any;
}

function Resume({ children }: ResumeProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const [dropQuery, dropQueryResult] = useLazyQuery<GetDropData, GetDropVars>(GetDropBasicDetail);

  const openResume = (drop: string, project: string) => {
    dropQuery({ variables: { drop, project } });
    setOpen(true);
  };

  const [resumeDrop, { loading }] = useMutation<ResumeDropData, ResumeDropVars>(ResumeDrop);

  const onResume = () => {
    resumeDrop({
      variables: {
        input: {
          drop: dropQueryResult.data?.project.drop?.id,
        },
      },
      update(cache, { data }) {
        const drop = data?.resumeDrop.drop;

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
        setOpen(false);
      },
    });
  };

  return (
    <>
      {children({
        resume: openResume,
      })}
      <Modal open={open} setOpen={setOpen}>
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Resume mint</Typography.Header>
          {dropQueryResult.loading ? (
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
                Are you sure you want to resume{' '}
                <span className="text-white font-medium">
                  {dropQueryResult.data?.project.drop?.collection.metadataJson?.name}
                </span>{' '}
                drop and continue sales?
              </Typography.Header>

              <div className="flex flex-col gap-2 mt-4">
                <Button
                  htmlType="submit"
                  className="w-full mt-5"
                  variant="failure"
                  onClick={onResume}
                  disabled={loading}
                >
                  Resume mint
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
}
Drop.Resume = Resume;

interface ShutdownDropData {
  shutdownDrop: ShutdownDropPayload;
}

interface ShutdownDropVars {
  input: ShutdownDropInput;
}

interface ShutdownRenderProps {
  shutdown: (drop: string, project: string) => void;
}

interface ShutdownProps {
  children: (args: ShutdownRenderProps) => any;
}

function Shutdown({ children }: ShutdownProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const [dropQuery, dropQueryResult] = useLazyQuery<GetDropData, GetDropVars>(GetDropBasicDetail);

  const openShutdown = (drop: string, project: string) => {
    dropQuery({ variables: { drop, project } });
    setOpen(true);
  };

  const [shutdownDrop, { loading }] = useMutation<ShutdownDropData, ShutdownDropVars>(ShutdownDrop);

  const onShutdown = () => {
    shutdownDrop({
      variables: {
        input: {
          drop: dropQueryResult.data?.project.drop?.id,
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
        setOpen(false);
      },
    });
  };

  return (
    <>
      {children({
        shutdown: openShutdown,
      })}
      <Modal open={open} setOpen={setOpen}>
        <Card className="w-[400px]">
          <Typography.Header size={Size.H2}>Shut-down mint</Typography.Header>
          {dropQueryResult.loading ? (
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
                  {dropQueryResult.data?.project.drop?.collection.metadataJson?.name}
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
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </div>
            </>
          )}
        </Card>
      </Modal>
    </>
  );
}
Drop.Shutdown = Shutdown;
