import { appConfig } from '../../../../app.config';
import { apollo } from '../../../../client';
import EditOrganization from './EditOrganization';

const client = apollo(appConfig.server('graphql'));

interface EditOrgLayoutProps {
  params: { organization: string };
}

export default async function EditOrganizationPage({
  params: { organization },
}: EditOrgLayoutProps): Promise<React.ReactNode> {
  return <EditOrganization organization={organization} />;
}
