import Drops from './Drops';

interface DropsPageProps {
  params: { project: string };
}

export default function DropsPage({ params: { project } }: DropsPageProps) {
  return <Drops project={project} />;
}
