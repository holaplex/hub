import { FrontendApi } from '@ory/client';
import { createContext } from 'react';
import { edgeConfig } from '@ory/integrations/next';
import { ory } from '../modules/ory';

const orySdk = ory(edgeConfig);

export type OryContextType = {
  ory: FrontendApi;
};

export const OryContext = createContext<OryContextType>({ ory: orySdk } as OryContextType);

interface SessionProviderProps {
  children: React.ReactNode;
}

export function OryProvider({ children }: SessionProviderProps) {
  return (
    <OryContext.Provider value={{ ory: orySdk }}>
      <>{children}</>
    </OryContext.Provider>
  );
}
