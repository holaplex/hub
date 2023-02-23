'use client';
import { apollo } from '../../../../client';
import Project from '../../../../layouts/Project';
import { config } from '../../../../app.config';
import { Project as ProjectType, User } from './../../../../graphql.types';
import { GetProject } from './../../../../queries/project.graphql';
import { useSession } from '../../../../hooks/useSession';

const client = apollo(config.server('graphql'));

interface ProjectLayoutProps {
  children: React.ReactNode;
  params: { project: string };
}
interface GetProjectData {
  project: ProjectType;
}

interface GetProjectVars {
  project: string;
}

export default async function ProjectLayout({
  children,
  params: { project },
}: ProjectLayoutProps): Promise<React.ReactNode> {
  const projectQuery = await client.query<GetProjectData, GetProjectVars>({
    query: GetProject,
    variables: { project },
  });

  return <Project project={projectQuery.data.project}>{children}</Project>;
}
