import clsx from 'clsx';
import { createElement } from 'react';

export enum FontWeight {
  Semibold = 'font-semibold',
}

export enum TextColor {
  Primary = 'text-white',
  Gray = 'text-gray-400',
}

export enum Size {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
}

interface TypographyProps {
  weight?: FontWeight;
  color?: TextColor;
  children: string | JSX.Element | number | (JSX.Element | string | number)[];
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
  return createElement(size, { className: clsx('text-left', weight, color, className) }, children);
}

Typography.Header = Header;
