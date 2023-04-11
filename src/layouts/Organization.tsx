'use client';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Icon } from '../components/Icon';
import Sidebar from './Sidebar';
import { OrganizationProvider } from '../providers/OrganizationProvider';
import { Organization as OrganizationType } from '../graphql.types';
import Image from 'next/image';

export default function Organization({
  children,
  hydrate,
}: {
  children: React.ReactNode | React.ReactNode[];
  hydrate?: OrganizationType;
}): JSX.Element {
  const segments = useSelectedLayoutSegments();

  return (
    <OrganizationProvider hydrate={hydrate}>
      {({ organization }) => {
        return (
          <Sidebar.Page>
            <Sidebar.Panel>
              <Sidebar.Header>
                <div className="flex items-center gap-4">
                  <Icon.ChevronLeft />
                  <h1 className="flex items-center gap-2">
                    {organization?.profileImageUrl ? (
                      <img
                        src={organization.profileImageUrl}
                        className="w-8 h-8 rounded-md"
                        alt="logo"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-md" />
                    )}
                    <span className="capitalize text-sm font-medium">{organization?.name}</span>
                  </h1>
                </div>
              </Sidebar.Header>
              <Sidebar.Menu>
                <Sidebar.Menu.Link
                  name="Projects"
                  icon={<Icon.Projects />}
                  href="/projects"
                  active={segments[0] === 'projects'}
                />
                <Sidebar.Menu.Link
                  name="Members"
                  icon={<Icon.Members />}
                  href="/members"
                  active={segments[0] === 'members'}
                />
                <Sidebar.Menu.Link
                  name="Webhooks"
                  icon={<Icon.Webhook />}
                  href="/webhooks"
                  active={segments[0] === 'webhooks'}
                />
                <Sidebar.Menu.Link
                  name="Credentials"
                  icon={<Icon.Credentials />}
                  href="/credentials"
                  active={segments[0] === 'credentials'}
                />
                <Sidebar.Menu.Link
                  name="Settings"
                  icon={<Icon.Settings />}
                  href="/settings"
                  active={segments[0] === 'settings'}
                />
              </Sidebar.Menu>
              <Sidebar.Footer organization={organization} />
            </Sidebar.Panel>
            <Sidebar.Content>{children}</Sidebar.Content>
          </Sidebar.Page>
        );
      }}
    </OrganizationProvider>
  );
}
