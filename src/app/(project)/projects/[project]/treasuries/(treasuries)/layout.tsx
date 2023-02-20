import Treasuries from './Treasuries';

interface TreasuryLayoutProps {
  children: React.ReactNode;
  params: {
    wallet: string;
    project: string;
  };
}

export default function TreasuryLayout({
  children,
  params: { wallet, project },
}: TreasuryLayoutProps) {
  return (
    <Treasuries wallet={wallet} project={project}>
      {children}
    </Treasuries>
  );
}
