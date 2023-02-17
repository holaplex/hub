import { createContext } from 'react';
import { Project } from '../graphql.types';

interface ProjectContextType {
  project?: Project;
}

export const ProjectContext = createContext<ProjectContextType>(
  {} as ProjectContextType
);

export function ProjectProvider({
  children,
  project,
}: {
  children: React.ReactNode;
  project?: Project;
}) {
  return (
    <ProjectContext.Provider value={{ project }}>
      <>{children}</>
    </ProjectContext.Provider>
  );
}
