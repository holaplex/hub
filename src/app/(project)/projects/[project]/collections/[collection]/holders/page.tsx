import Holders from './CollectionHolders';

interface HoldersPageProps {
  params: { project: string; drop: string };
}

export default function CollectionHoldersPage({ params: { project, drop } }: HoldersPageProps) {
  return <Holders project={project} collection={drop} />;
}
