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
  children: JSX.Element[];
  loading?: boolean;
}

function TabsPanel({ children, loading }: TabsPanel) {
  return (
    <>
      <nav className={clsx('w-full flex flex-row gap-6')}>
        {Children.map(children, (child) => cloneElement(child, { loading }))}
      </nav>
    </>
  );
}
Tabs.Panel = TabsPanel;

interface TabProps {
  name: string;
  active: boolean;
  href: string;
  loading?: boolean;
  className?: string;
}

function Tab({ name, active, href, className, loading }: TabProps) {
  if (loading) {
    return <div className="h-8 w-28 bg-stone-900 animate-pulse rounded-md" />;
  }

  return (
    <Link
      href={href}
      className={clsx('text-sm font-medium cursor-pointer border-b-2 p-4', className, {
        'text-gray-400 border-stone-950': !active,
        'text-white border-yellow-300': active,
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
  return <article className={clsx('w-full flex-grow', className)}>{children}</article>;
}
Tabs.Content = TabsContent;
