import Treasuries from './Treasuries';

interface TreasuryLayoutProps {
  children: JSX.Element;
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
    <Treasuries wallet={wallet} project={project}>{children}</Treasuries>
  );
}
