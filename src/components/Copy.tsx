import clsx from 'clsx';
import useClipboard from '../hooks/useClipboard';
import { Icon } from './Icon';

interface CopyProps {
  copyString: string;
  children: JSX.Element;
  className?: string;
}

export default function Copy({ className, copyString, children }: CopyProps) {
  const { copied, copyText } = useClipboard(copyString);
  return (
    <div className={clsx('flex gap-2 items-center z-20', className)} onClick={copyText}>
      {copied ? <Icon.Check /> : <Icon.Copy />} {children}
    </div>
  );
}
