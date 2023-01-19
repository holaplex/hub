import clsx from 'clsx';
import Link from 'next/link';

interface IProps {
  label: string;
  url: string;
  className?: string;
}
const PageLink = ({ label, url, className }: IProps) => {
  return (
    <Link href={url} className={clsx('text-primary font-semibold text-xs', className)}>
      {label}
    </Link>
  );
};

export default PageLink;
