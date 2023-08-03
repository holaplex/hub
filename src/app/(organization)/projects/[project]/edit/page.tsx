import EditProject from '../../EditProject';

interface EditProjectLayoutProps {
  params: { project: string };
}

export default function EditProjectPage({
  params: { project },
}: EditProjectLayoutProps): React.ReactNode {
  return (
    <div className="h-screen flex items-center justify-center">
      <EditProject project={project} />
    </div>
  );
}
