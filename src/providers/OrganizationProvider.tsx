import { useRouter } from 'next/navigation';
import { createContext } from 'react';
import { Organization } from '../graphql.types';
import { toast } from 'react-toastify';

interface OrganizationContextType {
  organization?: Organization;
  onSwitch: (organization: string) => Promise<void>;
}

export const OrganizationContext = createContext<OrganizationContextType>(
  {} as OrganizationContextType
);

export function OrganizationProvider({
  children,
  organization,
}: {
  children: React.ReactNode;
  organization?: Organization;
}) {
  const router = useRouter();

  const onSwitch = async (organization: string): Promise<void> => {
    try {
      const response = await fetch(`/browser/organizations/${organization}/select`, {
        method: 'POST',
      });

      router.push('/projects');
    } catch (e: any) {
      toast.error('Unable to forward you to selected organization.');
    }
  };

  return (
    <OrganizationContext.Provider value={{ organization, onSwitch }}>
      <>{children}</>
    </OrganizationContext.Provider>
  );
}
