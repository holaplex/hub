import CollectionNftEdit from './CollectionNftEdit';

interface CollectionNftEditPageProps {
  params: { project: string; collection: string; nft: string };
}

export default function CollectionNftUpdatesPage({
  params: { project, collection, nft },
}: CollectionNftEditPageProps) {
  return <CollectionNftEdit project={project} collection={collection} mint={nft} />;
}
