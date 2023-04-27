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
  return <div />;
}

interface SidebarPageProps {
  children: JSX.Element[];
  open?: boolean;
}

function SidebarPage({ children, open }: SidebarPageProps) {
  return (
    <section className="flex flex-grow">
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
          'w-[200px] lg:w-[260px] fixed top-0 left-0 bottom-0 flex flex-col flex-shrink-0 bg-stone-900'
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
  return <div className={clsx('w-full py-4 px-6', className)}>{children}</div>;
}
Sidebar.Header = SidebarHeader;

interface SidebarMenuProps {
  children: ReactNode;
  className?: string;
}

function SidebarMenu({ children, className }: SidebarMenuProps) {
  return (
    <div className={clsx('w-full py-3 flex flex-col gap-2 px-6 flex-1 overflow-y-auto', className)}>
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
      className={clsx('flex gap-4 w-full px-4 py-3 items-center rounded-lg text-white', className, {
        'bg-stone-800': active,
        'hover:bg-stone-800': !active,
      })}
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
    <article className={clsx('w-full pl-[200px] lg:pl-[260px] mb-4 flex-grow', className)}>
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
    <div className={clsx('flex flex-col w-full p-6 flex-shrink-0 gap-2', className)}>
      <div
        className="flex items-center gap-2 justify-between cursor-pointer pt-2"
        onClick={() => {
          if (!userAffiliationsQuery.called) {
            loadUserAffiliations();
          }

          setExpandFooter(!expandFooter);
        }}
      >
        <h1 className="flex items-center gap-2 text-sm text-white font-medium">
          <div className="w-8 h-8 bg-gray-800 rounded-full" />
          <span className="flex flex-col capitalize">
            {userQuery.loading ? (
              <div className="h-4 w-20 bg-stone-800 rounded-full animate-pulse" />
            ) : (
              `${userQuery.data?.user.firstName} ${userQuery.data?.user.lastName}`
            )}
            <span className="text-gray-400 text-xs">{organization?.name}</span>
          </span>
        </h1>
        {expandFooter ? <Icon.Dropdown /> : <Icon.DropdownReverse />}
      </div>
      {expandFooter && (
        <div className="w-full py-2">
          {userAffiliationsQuery.loading ? (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-stone-800 rounded-md animate-pulse" />
                <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 bg-stone-800 rounded-md animate-pulse" />
                <span className="rounded-full h-4 w-28 bg-stone-800 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col border-b border-gray-800 py-2">
                {/* <Sidebar.Menu.Link
                  name="Settings"
                  icon={<Icon.Settings />}
                  href=""
                  active={false}
                /> */}
                <Sidebar.Menu.Link
                  name="Help"
                  icon={<Icon.HelpHeadphones stroke="stroke-gray-400" />}
                  href="https://docs.holaplex.dev"
                  active={false}
                />

                <div
                  className="flex gap-4 w-full px-4 py-3 items-center text-gray-400 rounded-lg hover:bg-stone-800 cursor-pointer"
                  onClick={() => logout()}
                >
                  <Icon.Logout stroke="stroke-gray-400" />
                  <span className="text-sm text-white">Logout</span>
                </div>
              </div>
              <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {userAffiliationsQuery.data?.user.affiliations.map((affiliation) => {
                  return (
                    <div
                      key={affiliation.organization?.id}
                      className={clsx(
                        'flex items-center rounded-lg justify-between p-2 transition',
                        {
                          'bg-stone-800': affiliation.organization?.id === organization?.id,
                          'cursor-pointer hover:bg-stone-800':
                            affiliation.organization?.id !== organization?.id,
                        }
                      )}
                    >
                      <div
                        className="flex gap-2 items-center"
                        onClick={() => onSwitch(affiliation.organization?.id)}
                      >
                        {affiliation.organization?.profileImageUrl ? (
                          <img
                            className="w-8 h-8 rounded-md"
                            src={affiliation.organization.profileImageUrl}
                            alt="logo"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-stone-800 rounded-md" />
                        )}
                        <span className="text-gray-400 font-medium text-sm">
                          {affiliation.organization?.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link href="/organizations/new">
                <Button
                  icon={<Icon.Add stroke="stroke-yellow-300" />}
                  variant="secondary"
                  className="w-full"
                >
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
