import Supply from './Supply';

interface SupplyPageProps {
  params: {
    drop: string;
    project: string;
  };
}

export default function DropSupplyPage({ params: { drop, project } }: SupplyPageProps) {
  return <Supply drop={drop} project={project} />;
}
