import Nfts from './Nfts';

interface NftsPageProps {
  params: { project: string; collection: string };
}

export default function NftsPage({ params: { project, collection } }: NftsPageProps) {
  return <Nfts project={project} collection={collection} />;
}
