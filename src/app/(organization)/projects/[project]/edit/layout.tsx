import { config } from '../../../../../app.config';
import { Project as ProjectType } from './../../../../../graphql.types';
import { GetProject } from './../../../../queries/project.graphql';
import { apollo } from '../../../../../client';
import EditProject from './EditProject';

const client = apollo(config.server('graphql'));

interface EditProjectLayoutProps {
  children: React.ReactNode;
  params: { project: string };
}
interface GetProjectData {
  project: ProjectType;
}

interface GetProjectVars {
  project: string;
}

export default async function EditProjectLayout({
  children,
  params: { project },
}: EditProjectLayoutProps): Promise<React.ReactNode> {
  const projectQuery = await client.query<GetProjectData, GetProjectVars>({
    query: GetProject,
    variables: { project },
  });

  return <EditProject project={projectQuery.data.project}>{children}</EditProject>;
}
