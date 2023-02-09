import clsx from 'clsx';
import Link from 'next/link';
import { Children, cloneElement, ReactNode } from 'react';

export default function Tabs() {
  return <div></div>;
}

interface TabsPageProps {
  children: JSX.Element[];
  className?: string;
}

function TabsPage({ children, className }: TabsPageProps) {
  return (
    <section className={clsx('flex flex-col gap-8 items-center', className)}>
      {Children.map(children, (child) => cloneElement(child))}
    </section>
  );
}
Tabs.Page = TabsPage;

interface TabsPanel {
  children: ReactNode;
}

function TabsPanel({ children }: TabsPanel) {
  return (
    <>
      <nav className={clsx('w-full flex flex-row gap-6')}>{children}</nav>
    </>
  );
}
Tabs.Panel = TabsPanel;

interface TabProps {
  name: string;
  active: boolean;
  href: string;
  className?: string;
}

function Tab({ name, active, href, className }: TabProps) {
  return (
    <Link
      href={href}
      className={clsx('text-xl font-semibold cursor-pointer', className, {
        'text-gray-400': !active,
        'text-primary': active,
      })}
    >
      {name}
    </Link>
  );
}
Tabs.Tab = Tab;

interface TabsContentProps {
  children: ReactNode;
  open?: boolean;
  className?: string;
}

function TabsContent({ children, className }: TabsContentProps) {
  return <article className={clsx('w-full', className)}>{children}</article>;
}
Tabs.Content = TabsContent;
