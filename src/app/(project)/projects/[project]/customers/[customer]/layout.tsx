import Customer from './Customer';

interface CustomerLayoutProps {
  children: React.ReactNode;
  params: { project: string; customer: string };
}

export default function CustomerLayout({
  children,
  params: { customer, project },
}: CustomerLayoutProps): React.ReactNode {
  return (
    <Customer project={project} customer={customer}>
      {children}
    </Customer>
  );
}
