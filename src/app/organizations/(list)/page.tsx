'use client';
import Card from '../../../components/Card';
import Typography, { Size } from '../../../components/Typography';
import { Form } from '@holaplex/ui-library-react';
import { useOrganization } from '../../../hooks/useOrganization';
import { useQuery } from '@apollo/client';
import { GetUserAffiliations } from '../../../queries/user.graphql';
import { User } from '../../../graphql.types';
import { useSession } from '../../../hooks/useSession';
import { ChangeEvent } from 'react';

interface GetUserAffiliationsData {
  user: User;
}
interface GetUserAffiliationsVars {
  user: string;
}

export default function OrganizationsPage() {
  const { onSwitch } = useOrganization();
  const { session } = useSession();

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
    await onSwitch(event.target.value);
  };

  return (
    <Card className="w-[400px]">
      <Typography.Header size={Size.H2}>Organizations</Typography.Header>
      <Typography.Header size={Size.H3}>
        Please select an organization you want to enter.
      </Typography.Header>

      <Form className="flex flex-col mt-2">
        {options && <Form.Select options={options} onChange={(event) => onChange(event)} />}
      </Form>
    </Card>
  );
}
