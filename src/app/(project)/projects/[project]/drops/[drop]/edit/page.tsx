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
      <Card className="w-[400px]">
        <Typography.Header size={Size.H2}>Edit drop</Typography.Header>
        {dropQuery.loading ? (
          <>
            <div className="mt-2 flex flex-col gap-1">
              <div className="w-full h-4 rounded-md bg-gray-100 animate-pulse" />
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
              <div className="w-full h-10 rounded-md bg-gray-100 animate-pulse" />
            </div>
          </>
        ) : (
          <>
            <Typography.Header size={Size.H3} className="mt-2">
              Select what you want to edit in this drop below
            </Typography.Header>

            <div className="flex flex-col gap-2 mt-4">
              <Link href={`/projects/${project}/drops/${drop}/edit/details`} className="w-full">
                <Button icon={<Icon.Settings className="stroke-secondary" />} className="w-full">
                  Drop details
                </Button>
              </Link>
              <Link href={`/projects/${project}/drops/${drop}/edit/royalties`} className="w-full">
                <Button className="w-full" icon={<Icon.Royalties className="stroke-secondary" />}>
                  Supply & royalties
                </Button>
              </Link>
              <Link href={`/projects/${project}/drops/${drop}/edit/schedule`} className="w-full">
                <Button className="w-full" icon={<Icon.Calendar className="stroke-secondary" />}>
                  Schedule
                </Button>
              </Link>
              <Button variant="tertiary" className="w-full" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </>
        )}
      </Card>
    </Modal>
  );
}
