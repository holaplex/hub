import Nfts from './Nfts';

interface NftsLayoutProps {
  children: React.ReactNode;
  params: {
    project: string;
    customer: string;
  };
}

export default function NftsLayout({ children, params: { project, customer } }: NftsLayoutProps) {
  return (
    <Nfts project={project} customer={customer}>
      {children}
    </Nfts>
  );
}
