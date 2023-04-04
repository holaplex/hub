import CustomerWallets from './CustomerWallets';

interface WalletsLayoutProps {
  children: React.ReactNode;
  params: {
    project: string;
    customer: string;
  };
}

export default function WalletsLayout({
  children,
  params: { project, customer },
}: WalletsLayoutProps) {
  return (
    <CustomerWallets project={project} customer={customer}>
      {children}
    </CustomerWallets>
  );
}
