import CollectionNftUpdates from './CollectionNftUpdates';

interface CollectionNftUpdatesPageProps {
  params: { project: string; collection: string; nft: string };
}

export default function CollectionNftUpdatesPage({
  params: { project, collection, nft },
}: CollectionNftUpdatesPageProps) {
  return <CollectionNftUpdates project={project} collection={collection} mint={nft} />;
}
