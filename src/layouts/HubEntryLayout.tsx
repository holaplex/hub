import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import { ReactElement } from 'react';
import ArrowRight from '../components/svgs/ArrowRight';
import Bulb from '../components/svgs/Bulb';

interface HubEntryLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const HubEntryLayout = ({ title, description, children }: HubEntryLayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="flex flex-col h-screen items-center mt-10">
        <div className="text-2xl font-bold text-primary">Holaplex</div>
        <div className="w-[400px] flex flex-col rounded-md bg-white border border-gray-100 mt-14 p-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default HubEntryLayout;

interface GeneralHeaderProps {
  heading: string;
  subHeading?: string;
  className?: string;
}
function GeneralHeader({ heading, subHeading, className }: GeneralHeaderProps) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="font-semibold text-xl text-primary">{heading}</div>
      <div className="text-sm text-gray-600">{subHeading}</div>
    </div>
  );
}
HubEntryLayout.GeneralHeader = GeneralHeader;

interface IconHeaderProps {
  icon: JSX.Element;
  heading: string;
  subHeading?: string;
  className?: string;
}
function IconHeader({ icon, heading, subHeading, className }: IconHeaderProps) {
  return (
    <div className={clsx('flex flex-col gap-2 items-center', className)}>
      {icon}
      <div className="font-semibold text-xl text-primary">{heading}</div>
      <div className="text-sm text-gray-600">{subHeading}</div>
    </div>
  );
}
HubEntryLayout.IconHeader = IconHeader;

interface FormContainerProps {
  children: ReactElement;
  className?: string;
}

function FormContainer({ children, className }: FormContainerProps) {
  return <div className={className}>{children}</div>;
}
HubEntryLayout.FormContainer = FormContainer;

function OrDivider({ className }: { className?: string }) {
  return (
    <div className={clsx('flex justify-center items-center', className)}>
      <hr className="w-1/2 mr-8 text-gray-100" />
      <span className="text-center text-gray-500 text-sm">Or</span>
      <hr className="w-1/2 ml-8 text-gray-100" />
    </div>
  );
}
HubEntryLayout.OrDivider = OrDivider;

interface ToolTipProps {
  text: string;
  actionText?: string;
  actionUrl?: string;
  className?: string;
}
function ToolTip({ text, actionText, actionUrl, className }: ToolTipProps) {
  return (
    <div
      className={clsx('bg-gray-50 px-4 py-4 rounded-md flex items-center text-gray-500', className)}
    >
      <Bulb className="mr-1" />
      <span className="text-sm">{text}</span>
      {actionText && actionUrl && (
        <Link
          href={actionUrl}
          passHref
          className="flex items-center ml-1 font-medium text-sm text-primary cursor-pointer"
        >
          {actionText}
          <ArrowRight className="ml-1" />
        </Link>
      )}
    </div>
  );
}
HubEntryLayout.ToolTip = ToolTip;
