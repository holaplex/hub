import clsx from 'clsx';
import NextLink from 'next/link';

export enum Size {
  ExtraSmall = 'text-xs',
  Small = 'text-sm',
  Medium = 'text-md',
  Large = 'text-lg',
  ExtraLarge = 'text-xl',
  DoubleXL = 'text-2xl',
}

interface LinkProps {
  href: string;
  size?: string;
  children: string | React.ReactNode | React.ReactNode[];
  className?: string;
  styled?: boolean;
}

export default function Link({
  href,
  size = 'text-xs',
  children,
  className,
  styled = true,
}: LinkProps) {
  return (
    <NextLink
      href={href}
      className={clsx(
        {
          'text-yellow-300 font-semibold hover:text-yellow-500 transition': styled,
        },
        size,
        className
      )}
    >
      {children}
    </NextLink>
  );
}
