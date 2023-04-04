import TreasuryWallets from './TreasuryWallets';

interface TreasuryLayoutProps {
  children: React.ReactNode;
  params: {
    project: string;
  };
}

export default function TreasuryLayout({ children, params: { project } }: TreasuryLayoutProps) {
  return <TreasuryWallets project={project}>{children}</TreasuryWallets>;
}
