import clsx from 'clsx';

export enum FontWeight {
  Semibold = 'font-semibold',
}

export enum TextColor {
  Primary = 'text-primary',
  Gray = 'text-gray-600',
}

export enum Size {
  ExtraSmall = 'text-xs',
  Small = 'text-sm',
  Medium = 'text-md',
  Large = 'text-lg',
  ExtraLarge = 'text-xl',
  DoubleXL = 'text-2xl',
}

interface TypographyProps {
  weight?: FontWeight;
  color?: TextColor;
  children: string | JSX.Element | JSX.Element[];
  className?: string;
}

export default function Typography() {
  return <></>;
}

function Paragraph({ weight, color, children, className }: TypographyProps): JSX.Element {
  return <p className={clsx(weight, color, className)}>{children}</p>;
}

Typography.Paragraph = Paragraph;

interface HeaderProps extends TypographyProps {
  size: Size;
}

function Header({ size, weight, color, children, className }: HeaderProps): JSX.Element {
  return <span className={clsx(size, weight, color, className)}>{children}</span>;
}

Typography.Header = Header;
