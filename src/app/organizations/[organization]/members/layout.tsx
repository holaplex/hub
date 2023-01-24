import OrgSidebar from '../../../../layouts/OrgSidebar';

export default function MembersLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <OrgSidebar>{children}</OrgSidebar>;
}
