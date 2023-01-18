import clsx from 'clsx';
import Link from 'next/link';

interface IProps {
  label: string;
  url: string;
  className?: string;
}
const PageLink = ({ label, url, className }: IProps) => {
  return (
    <Link href={url} className={clsx(className, 'text-primary font-semibold text-xs')}>
      {label}
    </Link>
  );
};

export default PageLink;
