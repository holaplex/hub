export const metadata = {
  title: 'Holaplex Hub | Projects',
};

export default function OrganizationProjectsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
