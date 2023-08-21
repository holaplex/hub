import CollectionNft from './CollectionNft';
interface CollectionNftProps {
  children: React.ReactNode;
  params: { project: string; collection: string; nft: string };
}

export default function CollectionLayout({
  children,
  params: { collection, project, nft },
}: CollectionNftProps): React.ReactNode {
  return (
    <CollectionNft collection={collection} project={project} nft={nft}>
      {children}
    </CollectionNft>
  );
}
