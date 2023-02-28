import Splash from '../../layouts/Splash';

interface OrganizationsLayoutProps {
  children: React.ReactNode;
}

export default function OrganizationsLayout({
  children,
}: OrganizationsLayoutProps): React.ReactNode {
  return <Splash>{children}</Splash>;
}
