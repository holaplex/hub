import EditProject from './EditProject';

interface EditProjectLayoutProps {
  params: { project: string };
}

export default async function EditProjectPage({
  params: { project },
}: EditProjectLayoutProps): Promise<React.ReactNode> {
  return <EditProject project={project} />;
}
