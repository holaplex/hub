import EditDrop from './EditDrop';
import { apollo } from '../../../../../../../../client';
import { cookies } from 'next/headers';
import { appConfig } from '../../../../../../../../app.config';
import { Project } from '../../../../../../../../graphql.types';
import { GetDrop } from '../../../../../../../../queries/drop.graphql';

interface EditDropLayoutProps {
  children: React.ReactNode;
  params: { project: string; drop: string };
}

interface GetDropVars {
  project: string;
  drop: string;
}

interface GetDropsData {
  project: Project;
}

export default async function CreateDropLayout({
  children,
  params: { project, drop },
}: EditDropLayoutProps): Promise<React.ReactNode> {
  const cookieStore = cookies();
  const client = apollo(
    appConfig.server('graphql'),
    cookieStore.get('hub_session')?.value as string
  );

  const dropQuery = await client.query<GetDropsData, GetDropVars>({
    query: GetDrop,
    variables: { project, drop },
  });

  return <EditDrop project={dropQuery.data.project}>{children}</EditDrop>;
}
