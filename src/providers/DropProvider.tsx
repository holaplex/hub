import { createContext } from 'react';
import { Drop, Maybe } from '../graphql.types';

interface DropContextType {
  drop?: Maybe<Drop>;
}

export const ProjectContext = createContext<DropContextType>({} as DropContextType);

export function DropProvider({
  children,
  drop,
}: {
  children: React.ReactNode;
  drop?: Maybe<Drop>;
}) {
  return (
    <ProjectContext.Provider value={{ drop }}>
      <>{children}</>
    </ProjectContext.Provider>
  );
}
