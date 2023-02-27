import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import { Icon } from './Icon';

interface PillProps {
  children: string | JSX.Element;
  onClear?: MouseEventHandler<HTMLDivElement>;
}

export function Pill({ children, onClear }: PillProps): JSX.Element {
  return (
    <li
      className={clsx(
        'rounded-full pl-2 py-1 pr-1 text-black bg-gray-50 items-center flex fle-row justify-between text-xs',
        {
          'pr-2': !onClear,
        }
      )}
    >
      {children}
      {onClear && (
        <div onClick={onClear} className="ml-2 p-1 rounded-full hover:bg-gray-100 transition">
          <Icon.Close width={12} height={12} />
        </div>
      )}
    </li>
  );
}

function PillList({ children }: { children: JSX.Element[] }): JSX.Element {
  return <ul className="flex flex-row gap-2">{children}</ul>;
}

Pill.List = PillList;
