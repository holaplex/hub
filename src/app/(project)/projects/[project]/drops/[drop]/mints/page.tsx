import Mints from './Mints';

interface PurchasesPageProps {
  params: { project: string; drop: string };
}

export default function PurchasePage({ params: { project, drop } }: PurchasesPageProps) {
  return <Mints project={project} drop={drop} />;
}
