import clsx from 'clsx';
import { Children, cloneElement, ReactNode } from 'react';

export default function Tabs() {
  return <div></div>;
}

interface TabsPageProps {
  children: JSX.Element[];
}

function TabsPage({ children }: TabsPageProps) {
  return (
    <section className="flex flex-col gap-8 items-center">
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
      <nav className={clsx('w-full flex flex-row')}>{children}</nav>
    </>
  );
}
Tabs.Panel = TabsPanel;

interface TabProps {
  name: string;
  active: boolean;
  className?: string;
}

function Tab({ name, active, className }: TabProps) {
  return (
    <div className={clsx('text-gray-600', className)}>
      <span className="text-sm">{name}</span>
    </div>
  );
}
Tabs.Tab = Tab;

interface TabsContentProps {
  children: ReactNode;
  open?: boolean;
  className?: string;
}

function TabsContent({ children, className }: TabsContentProps) {
  return <article className={clsx('', className)}>{children}</article>;
}
Tabs.Content = TabsContent;
