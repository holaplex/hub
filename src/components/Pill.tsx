import clsx from 'clsx';
import { MouseEventHandler, Children, cloneElement, useState, useEffect, useMemo } from 'react';
import { Icon } from './Icon';
import { values, reduce, compose } from 'ramda';
import { useElementSize } from 'usehooks-ts';

interface PillProps {
  children: string | JSX.Element;
  onClear?: MouseEventHandler<HTMLDivElement>;
  onSize?: (width: number) => void;
  show?: boolean;
}

export function Pill({ children, onClear, onSize, show = true }: PillProps): JSX.Element {
  const [itemRef, { width }] = useElementSize<HTMLLIElement>();

  useEffect(() => {
    if (width && onSize) {
      onSize(width);
    }
  }, [width, onSize]);

  return (
    <li
      ref={itemRef}
      className={clsx(
        'rounded-lg pl-2 py-1 pr-1 text-gray-400 bg-stone-900 items-center flex fle-row justify-between text-xs',
        show ? 'opacity-100' : 'opacity-0',
        {
          'pr-2': !onClear,
        }
      )}
    >
      {children}
      {onClear && (
        <div onClick={onClear} className="ml-2 p-1 rounded-full hover:bg-stone-950 transition">
          <Icon.Close width={12} height={12} stroke="stroke-white" />
        </div>
      )}
    </li>
  );
}

function PillList({ children }: { children: JSX.Element[] }): JSX.Element {
  return <ul className="flex flex-wrap gap-2">{children}</ul>;
}

Pill.List = PillList;

function PillListCompact({
  children,
  className = '',
}: {
  children: JSX.Element[];
  className?: string;
}): JSX.Element {
  const [sizes, setSize] = useState<{ [index: number]: number }>({});
  const [listRef, { width }] = useElementSize<HTMLUListElement>();

  const [show, _total] = useMemo(() => {
    return compose(
      reduce(
        ([show, total], curr: number) => {
          if (total + curr + 4 < width) {
            return [show + 1, total + curr + 4];
          }
          return [show, total];
        },
        [0, 0]
      ),
      values
    )(sizes);
  }, [width, sizes]);

  return (
    <ul ref={listRef} className={clsx('flex gap-1 flex-nowrap overflow-hidden', className)}>
      {Children.map(children, (child, index) =>
        cloneElement(child, {
          show: index < show,
          onSize: (width: number) => {
            if (width === sizes[index]) return;
            setSize({
              ...sizes,
              [index]: width,
            });
          },
        })
      )}
    </ul>
  );
}

PillList.Compact = PillListCompact;
