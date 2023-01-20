import clsx from 'clsx';

interface CardProps {
  width?: string;
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function Card({ width = 'w-[400px]', children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'flex flex-col rounded-md bg-white border border-gray-100 mt-14 p-8',
        width,
        className
      )}
    >
      {children}
    </div>
  );
}
