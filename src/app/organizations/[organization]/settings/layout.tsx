import OrgSidebar from '../../../../layouts/OrgSidebar';

export default function SettingsLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <OrgSidebar>{children}</OrgSidebar>;
}
