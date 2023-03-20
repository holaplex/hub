import { useLazyQuery, useQuery } from '@apollo/client';
import { Button } from '@holaplex/ui-library-react';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { Children, cloneElement, ReactNode, useState } from 'react';
import { Icon } from '../components/Icon';
import { Organization, User } from '../graphql.types';
import { useLogout } from '../hooks/useLogout';
import { useOrganization } from '../hooks/useOrganization';
import { useSession } from '../hooks/useSession';
import { GetUserAffiliations, GetUser } from './../queries/user.graphql';

export default function Sidebar() {
  return <div></div>;
}

interface SidebarPageProps {
  children: JSX.Element[];
  open?: boolean;
}

function SidebarPage({ children, open }: SidebarPageProps) {
  return (
    <section className="flex">
      {Children.map(children, (child) => cloneElement(child, { open }))}
    </section>
  );
}
Sidebar.Page = SidebarPage;

interface SidebarPanel {
  children: ReactNode;
}

function SidebarPanel({ children }: SidebarPanel) {
  return (
    <>
      <aside
        className={clsx(
          'h-screen w-[200px] lg:w-[260px] fixed top-0 left-0 flex flex-col flex-shrink-0 bg-white'
        )}
      >
        {children}
      </aside>
    </>
  );
}
Sidebar.Panel = SidebarPanel;

interface SidebarHeaderProps {
  children: ReactNode;
  className?: string;
}

function SidebarHeader({ children, className }: SidebarHeaderProps) {
  return (
    <div className={clsx('w-full border-b border-gray-100 py-4 px-6', className)}>{children}</div>
  );
}
Sidebar.Header = SidebarHeader;

interface SidebarMenuProps {
  children: ReactNode;
  className?: string;
}

function SidebarMenu({ children, className }: SidebarMenuProps) {
  return (
    <div className={clsx('w-full py-3 flex flex-col gap-2 px-2 flex-1 overflow-y-auto', className)}>
      {children}
    </div>
  );
}
Sidebar.Menu = SidebarMenu;

interface SidebarMenuItemProps {
  icon: ReactNode;
  name: string;
  href: string;
  active: boolean;
  className?: string;
}

function SidebarMenuLink({ icon, name, href, active, className }: SidebarMenuItemProps) {
  return (
    <Link
      href={href}
      className={clsx(
        'flex gap-4 w-full px-4 py-3 items-center rounded-md border border-white',
        className,
        {
          'text-primary bg-gray-50 border-white': active,
          'text-gray-600 hover:border-gray-50': !active,
        }
      )}
    >
      {icon}
      <span className="text-sm">{name}</span>
    </Link>
  );
}
SidebarMenu.Link = SidebarMenuLink;

interface SidebarContentProps {
  children: ReactNode;
  open?: boolean;
  className?: string;
}

function SidebarContent({ children, className }: SidebarContentProps) {
  return (
    <article className={clsx('w-full pl-[200px] lg:pl-[260px] mb-4', className)}>
      {children}
    </article>
  );
}
Sidebar.Content = SidebarContent;

interface SidebarFooterProps {
  organization?: Organization;
  children?: ReactNode;
  className?: string;
}

interface GetUserAffiliationsData {
  user: User;
}
interface GetUserAffiliationsVars {
  user: string;
}

interface GetUserData {
  user: User;
}
interface GetUserVars {
  user: string;
}

function SidebarFooter({ organization, children, className }: SidebarFooterProps) {
  const { session } = useSession();
  const { logout } = useLogout();
  const { onSwitch } = useOrganization();
  const [expandFooter, setExpandFooter] = useState<Boolean>(false);
  const [loadUserAffiliations, userAffiliationsQuery] = useLazyQuery<
    GetUserAffiliationsData,
    GetUserAffiliationsVars
  >(GetUserAffiliations, {
    variables: { user: session?.identity.id! },
  });

  const userQuery = useQuery<GetUserData, GetUserVars>(GetUser, {
    variables: { user: session?.identity.id! },
  });

  return (
    <div className={clsx('flex flex-col w-full p-2 flex-shrink-0 gap-2', className)}>
      <div className="flex justify-center">
        <Image src="/holaplex-small.svg" alt="Holaplex" width="64" height="6" />
      </div>
      <div
        className="flex items-center gap-2 justify-between cursor-pointer border-t border-gray-100 pt-2"
        onClick={() => {
          if (!userAffiliationsQuery.called) {
            loadUserAffiliations();
          }

          setExpandFooter(!expandFooter);
        }}
      >
        <h1 className="flex items-center gap-2 text-sm text-primary font-medium">
          <div className="w-8 h-8 bg-gray-300 rounded-md" />
          <span className="flex flex-col capitalize">
            {userQuery.loading ? (
              <div className="h-4 w-20 bg-gray-50 rounded-full animate-pulse" />
            ) : (
              `${userQuery.data?.user.firstName} ${userQuery.data?.user.lastName}`
            )}
            <span className="text-gray-400 text-xs">{organization?.name}</span>
          </span>
        </h1>
        <Icon.Expand />
      </div>
      {expandFooter && (
        <div className="w-full border-t border-gray-100 py-2">
          {userAffiliationsQuery.loading ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-gray-50 rounded-md animate-pulse" />
                <span className="rounded-full h-4 w-28 bg-gray-50 animate-pulse" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-gray-50 rounded-md animate-pulse" />
                <span className="rounded-full h-4 w-28 bg-gray-50 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col border-b border-gray-100 py-2">
                <Sidebar.Menu.Link
                  name="Settings"
                  icon={<Icon.Settings />}
                  href=""
                  active={false}
                />
                <Sidebar.Menu.Link
                  name="Help"
                  icon={<Icon.HelpHeadphones />}
                  href=""
                  active={false}
                />

                <div
                  className="flex gap-4 w-full px-4 py-3 items-center text-gray-600 cursor-pointer"
                  onClick={() => logout()}
                >
                  <Icon.Logout />
                  <span className="text-sm">Logout</span>
                </div>
              </div>
              <div className="flex flex-col gap-4 max-h-60 overflow-y-auto">
                {userAffiliationsQuery.data?.user.affiliations.map((affiliation) => {
                  return (
                    <div
                      key={affiliation.organization?.id}
                      className={clsx(
                        'flex items-center rounded-md justify-between p-2 border transition',
                        {
                          'border-gray-100': affiliation.organization?.id === organization?.id,
                          'border-white cursor-pointer hover:border-gray-100 hover:bg-gray-50':
                            affiliation.organization?.id !== organization?.id,
                        }
                      )}
                      onClick={() => onSwitch(affiliation.organization?.id)}
                    >
                      <div className="flex gap-2 items-center">
                        {affiliation.organization?.profileImageUrl ? (
                          <img
                            className="w-8 h-8 rounded-md"
                            src={affiliation.organization.profileImageUrl}
                            alt="logo"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-300 rounded-md" />
                        )}
                        <span className="text-gray-600 font-medium text-sm">
                          {affiliation.organization?.name}
                        </span>
                      </div>
                      <Icon.Settings />
                    </div>
                  );
                })}
              </div>
              <Link href="/organizations/new">
                <Button icon={<Icon.Add stroke="#ffffff" />} className="w-full">
                  Add organization
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
Sidebar.Footer = SidebarFooter;
