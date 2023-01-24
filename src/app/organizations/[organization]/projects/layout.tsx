import OrgSidebar from '../../../../layouts/OrgSidebar';

export default function ProjectsLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return <OrgSidebar>{children}</OrgSidebar>;
}
