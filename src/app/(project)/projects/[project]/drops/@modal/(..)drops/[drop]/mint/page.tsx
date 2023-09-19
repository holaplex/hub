'use client';
import { Modal } from '@holaplex/ui-library-react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import MintRandom from './MintRandom';
import MintEdition from './MintEdition';
import Card from '../../../../../../../../../components/Card';
import {
  Project,
  DropType,
  ActionCost,
  Organization,
} from '../../../../../../../../../graphql.types';
import {
  GetCreditSheet,
  GetOrganizationCreditBalance,
} from '../../../../../../../../../queries/credits.graphql';
import { GetDrop } from '../../../../../../../../../queries/drop.graphql';
import { useOrganization } from '../../../../../../../../../hooks/useOrganization';

interface MintPageProps {
  params: { drop: string; project: string };
}

export interface GetDropVars {
  project: string;
  drop: string;
}

export interface GetOrganizationBalanceVars {
  organization: string;
}

export interface GetOrganizationCreditBalanceData {
  organization: Organization;
}

export interface GetCreditSheetData {
  creditSheet: ActionCost[];
}

export interface GetDropData {
  project: Pick<Project, 'drop' | 'treasury'>;
}

export default function MintPage({ params: { drop, project } }: MintPageProps) {
  const router = useRouter();
  const { organization } = useOrganization();

  const onClose = () => {
    router.back();
  };

  const dropQuery = useQuery<GetDropData, GetDropVars>(GetDrop, { variables: { project, drop } });

  const creditSheetQuery = useQuery<GetCreditSheetData>(GetCreditSheet);

  const creditBalanceQuery = useQuery<GetOrganizationCreditBalanceData, GetOrganizationBalanceVars>(
    GetOrganizationCreditBalance,
    {
      variables: { organization: organization?.id },
    }
  );

  const loading = dropQuery.loading || creditBalanceQuery.loading || creditSheetQuery.loading;

  return (
    <Modal open={true} setOpen={onClose}>
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
        ) : dropQuery.data?.project.drop?.dropType === DropType.Open ? (
          <MintRandom
            drop={drop}
            project={project}
            dropQuery={dropQuery}
            creditBalanceQuery={creditBalanceQuery}
            creditSheetQuery={creditSheetQuery}
          />
        ) : (
          <MintEdition
            drop={drop}
            project={project}
            dropQuery={dropQuery}
            creditBalanceQuery={creditBalanceQuery}
            creditSheetQuery={creditSheetQuery}
          />
        )}
      </Card>
    </Modal>
  );
}
