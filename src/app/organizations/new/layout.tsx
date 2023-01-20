import Splash from '../../../layouts/Splash';

interface CreateOrganizationLayoutProps {
  children: React.ReactNode;
}

export default function CreateOrganizationLayout({
  children,
}: CreateOrganizationLayoutProps): JSX.Element {
  return <Splash>{children}</Splash>;
}
