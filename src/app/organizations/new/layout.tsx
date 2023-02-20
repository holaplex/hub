import Splash from '../../../layouts/Splash';

interface CreateOrganizationLayoutProps {
  children: React.ReactNode;
}

export default function OrganizationLayout({
  children,
}: CreateOrganizationLayoutProps): React.ReactNode {
  return <Splash>{children}</Splash>;
}
