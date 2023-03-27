import Treasury from './Treasury';

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
    <Treasury wallet={wallet} project={project}>
      {children}
    </Treasury>
  );
}
