'use client';
import { useQuery } from '@apollo/client';
import { Button, Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import Card from '../../../../../../../components/Card';
import Typography, { Size } from '../../../../../../../components/Typography';
import { GetDropBasicDetail } from './../../../../../../../queries/drop.graphql';
import { Project } from '../../../../../../../graphql.types';
import { Icon } from '../../../../../../../components/Icon';
import Link from 'next/link';

interface GetDropData {
  project: Project;
}

interface GetDropVars {
  drop: string;
  project: string;
}
interface EditDropProps {
  params: { drop: string; project: string };
}

export default function EditDropPage({ params: { drop, project } }: EditDropProps) {
  const router = useRouter();

  const onClose = () => {
    router.push(`/projects/${project}/drops/`);
  };

  const dropQuery = useQuery<GetDropData, GetDropVars>(GetDropBasicDetail, {
    variables: { drop, project },
  });

  return (
    <Modal open={true} setOpen={onClose}>
      <Card className="w-[460px]">
        <Typography.Header size={Size.H2}>Edit drop</Typography.Header>
        {dropQuery.loading ? (
          <>
            <div className="mt-2 flex flex-col gap-1">
              <div className="w-full h-4 rounded-md bg-stone-800 animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-stone-800 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H3} className="mt-2">
              Select what you want to edit in this drop below
            </Typography.Header>

            <div className="flex flex-col gap-2 mt-4">
              <Link href={`/projects/${project}/drops/${drop}/edit/details`} className="w-full">
                <Button icon={<Icon.Settings stroke="stroke-stone-950" />} className="w-full">
                  Drop details
                </Button>
              </Link>
              <Link href={`/projects/${project}/drops/${drop}/edit/royalties`} className="w-full">
                <Button className="w-full" icon={<Icon.Royalties stroke="stroke-stone-950" />}>
                  Supply & royalties
                </Button>
              </Link>
              <Link href={`/projects/${project}/drops/${drop}/edit/schedule`} className="w-full">
                <Button className="w-full" icon={<Icon.Calendar stroke="stroke-stone-950" />}>
                  Schedule
                </Button>
              </Link>
              <Button variant="secondary" className="w-full" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Card>
    </Modal>
  );
}
