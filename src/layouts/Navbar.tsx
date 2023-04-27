import clsx from 'clsx';
import { ReactNode } from 'react';
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
      <nav className={clsx('w-screen h-16 flex flex-row bg-stone-900')}>{children}</nav>
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

interface NavbarMenuStepProps {
  icon: ReactNode;
  name: string;
  active: boolean;
  className?: string;
}

function NavbarMenuStep({ icon, name, active, className }: NavbarMenuStepProps) {
  return (
    <div
      className={clsx('flex flex-row items-center gap-2 px-2 py-2 text-gray-400', className, {
        'text-white': active,
      })}
    >
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
      className={clsx(
        'h-6 w-6 flex justify-center items-center rounded-md text-xs font-medium bg-stone-800',
        className,
        {
          'text-white': active || (filled && active),
          'text-gray-400': !active && !filled,
        }
      )}
    >
      {!filled || active ? count : <Icon.Check stroke="stroke-gray-400" />}
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
