import { createContext } from 'react';
import { Organization } from '../graphql.types';

interface OrganizationContextType {
  organization?: Organization;
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
  return (
    <OrganizationContext.Provider value={{ organization }}>
      <>{children}</>
    </OrganizationContext.Provider>
  );
}
