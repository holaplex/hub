import { useContext } from 'react';
import { OrganizationContext } from '../providers/OrganizationProvider';

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within a OrganizationProvider');
  }
  return context;
}
