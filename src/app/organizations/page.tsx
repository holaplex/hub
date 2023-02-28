'use client';
import Card from '../../components/Card';
import Typography, { Size } from '../../components/Typography';
import { Form } from '@holaplex/ui-library-react';
import { useQuery } from '@apollo/client';
import { GetUserAffiliations } from './../../queries/user.graphql';
import { Organization, User } from './../../graphql.types';
import { useSession } from './../../hooks/useSession';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';

interface GetUserAffiliationsData {
  user: User;
}
interface GetUserAffiliationsVars {
  user: string;
}

interface OrganizationsForm {
  organization: Organization;
}

export default function OrganizationsPage() {
  const { control } = useForm<OrganizationsForm>();
  const { session } = useSession();
  const router = useRouter();

  const userAffiliationsQuery = useQuery<GetUserAffiliationsData, GetUserAffiliationsVars>(
    GetUserAffiliations,
    {
      variables: { user: session?.identity.id! },
    }
  );

  const onChange = async (organization: string) => {
    try {
      await fetch(`/browser/organizations/${organization}/select`, {
        method: 'POST',
      });

      router.push('/projects');
    } catch (e: any) {
      toast.error('Unable to forward you to selected organization.');
    }
  };

  return (
    <Card className="w-[400px] flex">
      <Typography.Header size={Size.H2}>Organizations</Typography.Header>
      <Typography.Header size={Size.H3} className="mt-2">
        Please select the organization you want to enter.
      </Typography.Header>
      <div className="mt-4 flex flex-col gap-2 max-h-[300px] overflow-auto">
        {userAffiliationsQuery.loading ? (
          <>
            <div className="rounded-md h-10 w-full bg-gray-50 animate-pulse" />
            <div className="rounded-md h-10 w-full bg-gray-50 animate-pulse" />
            <div className="rounded-md h-10 w-full bg-gray-50 animate-pulse" />
          </>
        ) : (
          userAffiliationsQuery.data?.user.affiliations.map((affiliation) => {
            const id = affiliation.organization?.id as string;
            return (
              <div
                key={id}
                onClick={() => onChange(id)}
                className="flex gap-2 cursor-pointer border rounded-md p-2 border-gray-100 hover:bg-gray-50 transition capitalize"
              >
                <div className="w-8 h-8 bg-gray-300 rounded-md" />
                {affiliation.organization?.name}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
