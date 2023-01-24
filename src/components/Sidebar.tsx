import clsx from 'clsx';
import Link from 'next/link';
import { Children, cloneElement, ReactNode } from 'react';

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
        className={clsx('h-screen w-[200px] lg:w-[260px] flex flex-col flex-shrink-0 bg-white')}
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
    <div className={clsx('w-full py-3 px-2 flex-1 overflow-y-auto', className)}>{children}</div>
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

function SidebarMenuItem({ icon, name, href, active, className }: SidebarMenuItemProps) {
  return (
    <Link
      href={href}
      className={clsx('flex gap-4 w-full px-4 py-3 items-center', className, {
        'text-primary bg-gray-50 rounded-md': active,
        'text-gray-600': !active,
      })}
    >
      {icon}
      <span className="text-sm">{name}</span>
    </Link>
  );
}
SidebarMenu.Item = SidebarMenuItem;

interface SidebarFooterProps {
  children: ReactNode;
  className?: string;
}

function SidebarFooter({ children, className }: SidebarFooterProps) {
  return <div className={clsx('w-full p-2 flex-shrink-0', className)}>{children}</div>;
}
Sidebar.Footer = SidebarFooter;

interface SidebarContentProps {
  children: ReactNode;
  open?: boolean;
  className?: string;
}

function SidebarContent({ children, className }: SidebarContentProps) {
  return <article className={clsx('w-full', className)}>{children}</article>;
}
Sidebar.Content = SidebarContent;
