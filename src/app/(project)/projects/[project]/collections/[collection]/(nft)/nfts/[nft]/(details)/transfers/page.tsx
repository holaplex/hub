import CollectionNftTransfers from './CollectionNftTransfers';

interface CollectionNftTransfersPageProps {
  params: { project: string; collection: string; nft: string };
}

export default function CollectionNftTransfersPage({
  params: { project, collection, nft },
}: CollectionNftTransfersPageProps) {
  return <CollectionNftTransfers project={project} collection={collection} mint={nft} />;
}
