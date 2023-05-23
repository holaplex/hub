import clsx from 'clsx';

interface CardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={clsx('flex flex-col rounded-md bg-stone-900 p-6', className)}>{children}</div>
  );
}
