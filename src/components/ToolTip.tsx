import clsx from 'clsx';
import Link from 'next/link';
import ArrowRight from './svgs/ArrowRight';
import Bulb from './svgs/Bulb';

interface IProps {
  text: string;
  actionText?: string;
  actionUrl?: string;
  className?: string;
}
const ToolTip = ({ text, actionText, actionUrl, className }: IProps) => {
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
};

export default ToolTip;
