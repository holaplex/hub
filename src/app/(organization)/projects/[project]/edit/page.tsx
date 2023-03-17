import { appConfig } from '../../../../../app.config';
import { Project as ProjectType } from '../../../../../graphql.types';
import { GetProject } from './../../../../queries/project.graphql';
import { apollo } from '../../../../../client';
import EditProject from './EditProject';

const client = apollo(appConfig.server('graphql'));

interface EditProjectLayoutProps {
  params: { project: string };
}
interface GetProjectData {
  project: ProjectType;
}

interface GetProjectVars {
  project: string;
}

export default async function EditProjectPage({
  params: { project },
}: EditProjectLayoutProps): Promise<React.ReactNode> {
  const projectQuery = await client.query<GetProjectData, GetProjectVars>({
    query: GetProject,
    variables: { project },
  });

  return <EditProject project={projectQuery.data.project} />
}
