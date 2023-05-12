import { apollo } from '../../../../client';
import { cookies } from 'next/headers';
import Project from '../../../../layouts/Project';
import { Project as ProjectType } from './../../../../graphql.types';
import { GetProject } from './../../../../queries/project.graphql';

export const revalidate = 0;

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
    process.env.GRAPHQL_ENDPOINT as string,
    cookieStore.get('hub_session')?.value as string
  );

  const projectQuery = await client.query<GetProjectData, GetProjectVars>({
    fetchPolicy: 'network-only',
    query: GetProject,
    variables: { project },
  });

  return <Project project={projectQuery.data.project}>{children}</Project>;
}
