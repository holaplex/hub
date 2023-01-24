'use client';
import { ReactNode } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import { Icon } from '../components/Icon';

export interface OrgSidebarProps {
  children: ReactNode;
}
export default function OrgSidebar({ children }: OrgSidebarProps) {
  const pathname = usePathname();
  const slug = pathname ? pathname.split('/')[2] : null;

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
          <Sidebar.Menu.Item
            name="Projects"
            icon={<Icon.Projects />}
            href={`/organizations/${slug}/projects`}
            active={pathname === `/organizations/${slug}/projects`}
          />
          <Sidebar.Menu.Item
            name="Members"
            icon={<Icon.Members />}
            href={`/organizations/${slug}/members`}
            active={pathname === `/organizations/${slug}/members`}
          />
          <Sidebar.Menu.Item
            name="Settings"
            icon={<Icon.Settings />}
            href={`/organizations/${slug}/settings`}
            active={pathname === `/organizations/${slug}/settings`}
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
