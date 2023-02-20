import { cookies } from 'next/headers';
import Organization from '../../layouts/Organization';
import { redirect } from 'next/navigation';
import { GetOrganizationBasicInfo } from './../../queries/organization.graphql';
import { apollo } from '../../client';
import { config } from '../../app.config';
import { Organization as OrganizationType } from '../../graphql.types';

interface OrganizationVars {
  organization: string;
}

interface GetOrganizationBasicInfoData {
  organization: OrganizationType;
}

const client = apollo(config.server('graphql'));

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactNode> {
  const cookieStore = cookies();

  if (cookieStore.has('_hub_org')) {
    const organization = cookieStore.get('_hub_org')?.value as string;

    const organizationQuery = await client.query<GetOrganizationBasicInfoData, OrganizationVars>({
      query: GetOrganizationBasicInfo,
      variables: { organization },
    });

    return (
      <Organization organization={organizationQuery.data?.organization}>{children}</Organization>
    );
  }

  redirect('/organizations');
}
