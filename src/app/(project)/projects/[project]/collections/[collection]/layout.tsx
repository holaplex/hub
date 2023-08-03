import Collection from './Collection';

interface CollectionLayoutProps {
  children: React.ReactNode;
  params: { project: string; collection: string };
}

export default function CollectionLayout({
  children,
  params: { collection, project },
}: CollectionLayoutProps): React.ReactNode {
  return (
    <Collection project={project} collection={collection}>
      {children}
    </Collection>
  );
}
