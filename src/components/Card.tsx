import clsx from 'clsx';

interface CardProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'w-[400px] flex flex-col rounded-md bg-white border border-gray-100 mt-14 p-8',
        className
      )}
    >
      {children}
    </div>
  );
}
