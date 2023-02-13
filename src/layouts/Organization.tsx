'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Icon } from '../components/Icon';
import Sidebar from './Sidebar';
import { cloneElement, Children } from 'react';
import { OrganizationProvider } from '../providers/OrganizationProvider';
import { Organization as OrganizationType } from '../graphql.types';
import { Avatar, AvatarSize } from '@holaplex/ui-library-react';
import { clone } from 'ramda';

export default function Organization({
  children,
  organization,
}: {
  children: JSX.Element | JSX.Element[];
  organization?: OrganizationType;
}): JSX.Element {
  const pathname = usePathname();

  return (
    <OrganizationProvider organization={organization}>
      <Sidebar.Page>
        <Sidebar.Panel>
          <Sidebar.Header>
            <div className="flex items-center gap-4">
              <Icon.ChevronLeft />
              <h1 className="flex items-center gap-2 text-sm text-primary font-medium">
                <div className="w-8 h-8 bg-gray-300 rounded-md" />
                <span className="flex flex-col capitalize">
                  {organization?.name}
                  <span className="text-gray-400 text-xs">Organization</span>
                </span>
              </h1>
            </div>
          </Sidebar.Header>
          <Sidebar.Menu>
            <Sidebar.Menu.Link
              name="Projects"
              icon={<Icon.Projects />}
              href="/projects"
              active={pathname === `/projects`}
            />
            <Sidebar.Menu.Link
              name="Members"
              icon={<Icon.Members />}
              href="/members"
              active={pathname === `/members`}
            />
            <Sidebar.Menu.Link
              name="Settings"
              icon={<Icon.Settings />}
              href="/settings"
              active={pathname === `/settings`}
            />
          </Sidebar.Menu>
          <Sidebar.Footer>
            <div className="flex justify-center">
              <Image src="/holaplex-small.svg" alt="Holaplex" width="64" height="6" />
            </div>
          </Sidebar.Footer>
        </Sidebar.Panel>
        <Sidebar.Content>
          {children}
        </Sidebar.Content>
      </Sidebar.Page>
    </OrganizationProvider>
  );
}
