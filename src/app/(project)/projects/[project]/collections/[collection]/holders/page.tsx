import Holders from './CollectionHolders';

interface HoldersPageProps {
  params: { project: string; collection: string };
}

export default function CollectionHoldersPage({
  params: { project, collection },
}: HoldersPageProps) {
  return <Holders project={project} collection={collection} />;
}
