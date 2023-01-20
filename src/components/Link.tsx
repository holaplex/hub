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
  children: string | JSX.Element | JSX.Element[];
  className?: string;
}

export default function Link({ href, size = 'text-xs', children, className }: LinkProps) {
  return (
    <NextLink href={href} className={clsx('text-primary font-semibold', size, className)}>
      {children}
    </NextLink>
  );
}
