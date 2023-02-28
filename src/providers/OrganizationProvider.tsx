import { useRouter } from 'next/navigation';
import { createContext, useState } from 'react';
import { Organization } from '../graphql.types';
import { toast } from 'react-toastify';
import { useLazyQuery } from '@apollo/client';
import { GetOrganizationBasicInfo } from './../queries/organization.graphql';

interface OrganizationContextType {
  organization?: Organization;
  onSwitch: (organization: string) => Promise<void>;
}

export const OrganizationContext = createContext<OrganizationContextType>(
  {} as OrganizationContextType
);

interface GetOrganizationBasicInfoData {
  organization: Organization;
}

interface GetOrganizationBasicInfoVars {
  organization: string;
}
export function OrganizationProvider({
  children,
  hydrate,
}: {
  children: ({ organization }: { organization: Organization | undefined }) => React.ReactNode;
  hydrate?: Organization;
}) {
  const router = useRouter();
  const [organization, setOrganization] = useState<Organization | undefined>(hydrate);
  const [getOrganization] = useLazyQuery<
    GetOrganizationBasicInfoData,
    GetOrganizationBasicInfoVars
  >(GetOrganizationBasicInfo);

  const onSwitch = async (organization: string): Promise<void> => {
    try {
      await fetch(`/browser/organizations/${organization}/select`, {
        method: 'POST',
      });

      router.push('/projects');

      getOrganization({
        variables: {
          organization,
        },
        onCompleted: ({ organization }) => {
          setOrganization(organization);
        },
      });
    } catch (e: any) {
      toast.error('Unable to forward you to selected organization.');
    }
  };

  return (
    <OrganizationContext.Provider value={{ organization, onSwitch }}>
      <>{children({ organization })}</>
    </OrganizationContext.Provider>
  );
}
