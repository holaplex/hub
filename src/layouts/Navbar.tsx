import clsx from 'clsx';
import Link from 'next/link';
import { Children, cloneElement, ReactNode } from 'react';
import { Icon } from '../components/Icon';

export default function Navbar() {
  return <div></div>;
}

interface NavbarPageProps {
  children: React.ReactNode[];
}

function NavbarPage({ children }: NavbarPageProps) {
  return <section className="flex flex-col gap-8 items-center mb-8">{children}</section>;
}
Navbar.Page = NavbarPage;

interface NavbarPanel {
  children: ReactNode;
}

function NavbarPanel({ children }: NavbarPanel) {
  return (
    <>
      <nav className={clsx('w-screen h-16 flex flex-row bg-white')}>{children}</nav>
    </>
  );
}
Navbar.Panel = NavbarPanel;

interface NavbarHeaderProps {
  children: ReactNode;
  className?: string;
}

function NavbarHeader({ children, className }: NavbarHeaderProps) {
  return <div className={clsx('self-center', className)}>{children}</div>;
}
Navbar.Header = NavbarHeader;

interface NavbarMenuProps {
  children: ReactNode;
  className?: string;
}

function NavbarMenu({ children, className }: NavbarMenuProps) {
  return (
    <div className={clsx('flex items-center gap-12 justify-center w-full', className)}>
      {children}
    </div>
  );
}
Navbar.Menu = NavbarMenu;

interface NavbarMenuItemProps {
  icon: ReactNode;
  name: string;
  active: boolean;
  className?: string;
}

function NavbarMenuStep({ icon, name, active, className }: NavbarMenuItemProps) {
  return (
    <div className={clsx('flex flex-row items-center gap-2 px-2 py-2 text-gray-400', className)}>
      {icon}
      <span className="text-sm">{name}</span>
    </div>
  );
}
NavbarMenu.Step = NavbarMenuStep;

interface MenuItemStepCountProps {
  count: string;
  active: boolean;
  filled: boolean;
  className?: string;
}

function MenuItemStepCount({ count, active, filled, className }: MenuItemStepCountProps) {
  return (
    <div
      className={clsx('rounded-md px-2 py-1 text-xs font-medium', className, {
        'bg-primary text-white': active || (filled && active),
        'bg-stone-950 text-gray-400': !active && !filled,
        'bg-stone-950 border border-primary px-1': filled && !active,
      })}
    >
      {!filled || active ? count : <Icon.Check />}
    </div>
  );
}
NavbarMenuStep.StepCount = MenuItemStepCount;

interface NavbarFooterProps {
  children: ReactNode;
  className?: string;
}

function NavbarFooter({ children, className }: NavbarFooterProps) {
  return <div className={clsx('p-2 flex-shrink-0', className)}>{children}</div>;
}
Navbar.Footer = NavbarFooter;

interface NavbarContentProps {
  children: ReactNode;
  open?: boolean;
  className?: string;
}

function NavbarContent({ children, className }: NavbarContentProps) {
  return <article className={clsx('', className)}>{children}</article>;
}
Navbar.Content = NavbarContent;
