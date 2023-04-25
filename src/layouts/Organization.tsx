'use client';
import { useRouter, useSelectedLayoutSegments } from 'next/navigation';
import { Icon } from '../components/Icon';
import Sidebar from './Sidebar';
import { OrganizationProvider } from '../providers/OrganizationProvider';
import { Organization as OrganizationType } from '../graphql.types';
import Image from 'next/image';
import { PopoverBox } from '@holaplex/ui-library-react';
import Copy from '../components/Copy';

export default function Organization({
  children,
  hydrate,
}: {
  children: React.ReactNode | React.ReactNode[];
  hydrate?: OrganizationType;
}): JSX.Element {
  const segments = useSelectedLayoutSegments();
  const router = useRouter();
  return (
    <OrganizationProvider hydrate={hydrate}>
      {({ organization }) => {
        return (
          <Sidebar.Page>
            <Sidebar.Panel>
              <Sidebar.Header>
                <div className="flex items-center gap-4">
                  <div className="cursor-pointer" onClick={() => router.push('/organizations')}>
                    <Icon.ChevronLeft />
                  </div>
                  <div className="w-full flex justify-between">
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
                    <PopoverBox
                      triggerButton={
                        <div className="px-2 py-1 hover:rounded-md hover:bg-highlightcell max-w-min">
                          <Icon.More />
                        </div>
                      }
                      elements={[
                        <Copy key="copy_id" copyString={organization?.id}>
                          <span>Copy Organization ID</span>
                        </Copy>,
                      ]}
                    />
                  </div>
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
