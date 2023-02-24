'use client';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { Form } from '@holaplex/ui-library-react';
import { useQuery } from '@apollo/client';
import { GetUserAffiliations } from '../../../queries/user.graphql';
import { User } from '../../../graphql.types';
import { useSession } from '../../../hooks/useSession';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface GetUserAffiliationsData {
  user: User;
}
interface GetUserAffiliationsVars {
  user: string;
}

export default function OrganizationsPage() {
  const { session } = useSession();
  const router = useRouter();

  const userAffiliationsQuery = useQuery<GetUserAffiliationsData, GetUserAffiliationsVars>(
    GetUserAffiliations,
    {
      variables: { user: session?.identity.id! },
    }
  );

  const options = userAffiliationsQuery.data?.user.affiliations.map((affiliation) => {
    return {
      option: affiliation.organization?.name!,
      value: affiliation.organization?.id! as string,
    };
  });

  const onChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    try {
      await fetch(`/browser/organizations/${event.target.value}/select`, {
        method: 'POST',
      });

      router.push('/projects');
    } catch (e: any) {
      toast.error('Unable to forward you to selected organization.');
    }
  };

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Organizations</Typography.Header>
      <Typography.Header size={Size.H3}>
        Please select an organization you want to enter.
      </Typography.Header>

      <Form className="flex flex-col mt-2">
        {options && (
          <Form.Select
            placeholder="Select"
            options={options}
            onChange={(event) => onChange(event)}
          />
        )}
      </Form>
    </Card>
  );
}
