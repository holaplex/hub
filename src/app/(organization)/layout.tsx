import { cookies } from 'next/headers';
import Organization from '../../layouts/Organization';
import { redirect } from 'next/navigation';
import { GetOrganizationBasicInfo } from './../../queries/organization.graphql';
import { apollo } from '../../client';
import { Organization as OrganizationType } from '../../graphql.types';

export const revalidate = 0;

interface OrganizationVars {
  organization: string;
}

interface GetOrganizationBasicInfoData {
  organization: OrganizationType;
}

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.ReactNode> {
  const cookieStore = cookies();
  const client = apollo(
    process.env.GRAPHQL_ENDPOINT as string,
    cookieStore.get('hub_session')?.value as string
  );

  if (cookieStore.has('_hub_org')) {
    const organization = cookieStore.get('_hub_org')?.value as string;

    const organizationQuery = await client.query<GetOrganizationBasicInfoData, OrganizationVars>({
      fetchPolicy: 'network-only',
      query: GetOrganizationBasicInfo,
      variables: { organization },
    });

    return <Organization hydrate={organizationQuery?.data?.organization}>{children}</Organization>;
  }

  redirect('/organizations');
}
