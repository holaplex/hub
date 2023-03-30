import EditProject from './EditProject';

interface EditProjectLayoutProps {
  params: { project: string };
}

export default function EditProjectPage({
  params: { project },
}: EditProjectLayoutProps): React.ReactNode {
  return <EditProject project={project} />;
}
