'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Icon } from '../../../components/Icon';
import Sidebar from '../../../layouts/Sidebar';

export default function ProjectLayout({ children }: { children: React.ReactNode }): JSX.Element {
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[2] : null;

  if (pathname?.includes('drops/create')) {
    return <>{children}</>;
  }

  return (
    <Sidebar.Page>
      <Sidebar.Panel>
        <Sidebar.Header>
          <div className="flex items-center gap-4">
            <Icon.ChevronLeft />
            <span className="flex items-center gap-2 text-sm text-primary font-medium">
              {/* Image */}
              Project Name
            </span>
          </div>
        </Sidebar.Header>
        <Sidebar.Menu>
          <Sidebar.Menu.Link
            name="Manage drops"
            icon={<Icon.ManageNfts />}
            href={`/projects/${slug}/drops`}
            active={pathname === `/projects/${slug}/drops`}
          />
          <Sidebar.Menu.Link
            name="Customers"
            icon={<Icon.Customers />}
            href={`/projects/${slug}/customers`}
            active={pathname === `/projects/${slug}/customers`}
          />
          <Sidebar.Menu.Link
            name="Treasury"
            icon={<Icon.Treasury />}
            href={`/projects/${slug}/treasury`}
            active={pathname === `/projects/${slug}/treasury`}
          />
        </Sidebar.Menu>
        <Sidebar.Footer>
          <div className="flex justify-center">
            <Image src="/holaplex-small.svg" alt="Holaplex" width="64" height="6" />
          </div>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.Content>{children}</Sidebar.Content>
    </Sidebar.Page>
  );
}
