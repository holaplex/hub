import { apollo } from '../../../../client';
import { cookies } from 'next/headers';
import Project from '../../../../layouts/Project';
import { appConfig } from '../../../../app.config';
import { Project as ProjectType } from './../../../../graphql.types';
import { GetProject } from './../../../../queries/project.graphql';

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
  const cookieStore = cookies();
  const client = apollo(
    appConfig.server('graphql'),
    cookieStore.get('hub_session')?.value as string
  );

  const projectQuery = await client.query<GetProjectData, GetProjectVars>({
    query: GetProject,
    variables: { project },
  });

  return <Project project={projectQuery.data.project}>{children}</Project>;
}
