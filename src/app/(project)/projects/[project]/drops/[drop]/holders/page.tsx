import Holders from './Holders';

interface HoldersPageProps {
  params: { project: string; drop: string };
}

export default function HoldersPage({ params: { project, drop } }: HoldersPageProps) {
  return <Holders project={project} drop={drop} />;
}
