import Drops from './Drops';

export const metadata = {
  title: 'Holaplex Hub | Project | Drops',
};

interface DropsPageProps {
  params: { project: string };
}

export default function DropsPage({ params: { project } }: DropsPageProps) {
  return <Drops project={project} />;
}
