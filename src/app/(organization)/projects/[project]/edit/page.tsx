import EditProject from '../../EditProject';

interface EditProjectLayoutProps {
  params: { project: string };
}

export default function EditProjectPage({
  params: { project },
}: EditProjectLayoutProps): React.ReactNode {
  return (
    <div className="w-max mx-auto pt-20">
      <EditProject project={project} />
    </div>
  );
}
