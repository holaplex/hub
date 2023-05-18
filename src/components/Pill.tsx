import clsx from 'clsx';
import { MouseEventHandler, Children, cloneElement, useState, useEffect, useMemo } from 'react';
import { Icon } from './Icon';
import { PopoverBox } from '@holaplex/ui-library-react';
import { values, reduce, compose } from 'ramda';
import { useElementSize } from 'usehooks-ts';

interface PillProps {
  children: string | JSX.Element;
  onClear?: MouseEventHandler<HTMLDivElement>;
  onSize?: (width: number) => void;
  show?: boolean;
  variant?: 'default' | 'info';
}

export function Pill({
  children,
  onClear,
  onSize,
  variant = 'default',
  show = true,
}: PillProps): JSX.Element {
  const [itemRef, { width }] = useElementSize<HTMLDivElement>();

  useEffect(() => {
    if (width && onSize) {
      onSize(width);
    }
  }, [width, onSize]);

  return (
    <div
      ref={itemRef}
      className={clsx(
        'pl-2 py-1 pr-1 items-center flex flex-row justify-between text-xs',
        show ? 'opacity-100' : 'opacity-0',
        {
          'pr-2': !onClear,
          'text-gray-400 bg-stone-900 rounded-lg': variant === 'default',
          'text-blue-500 bg-blue-500 bg-opacity-20 rounded-full': variant === 'info',
        }
      )}
    >
      <span className="truncate">{children}</span>
      {onClear && (
        <div onClick={onClear} className="ml-2 p-1 rounded-full hover:bg-stone-950 transition">
          <Icon.Close width={12} height={12} stroke="stroke-white" />
        </div>
      )}
    </div>
  );
}

function PillList({ children }: { children: JSX.Element[] }): JSX.Element {
  return <div className="flex flex-wrap gap-2">{children}</div>;
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
  const [listRef, { width }] = useElementSize<HTMLDivElement>();

  const [show, _total] = useMemo(() => {
    return compose(
      reduce(
        ([show, total], curr: number) => {
          if (total + curr < width) {
            return [show + 1, total + curr];
          }
          return [show, total];
        },
        [0, 0]
      ),
      values
    )(sizes);
  }, [width, sizes]);

  const childCount = children.length;

  return (
    <div className={clsx('relative flex flex-row gap-1', className)}>
      <div className="flex gap-1 grow overflow-hidden" ref={listRef} >
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
      </div>
      {show < childCount && (
        <PopoverBox
          triggerButton={
            <div className="bg-stone-800 text-white px-2 py-1 rounded-full flex gap-2 right-0 top-1/2 text-xs justify-center items-center flex-0">
              <span>+{children.length - show}</span> <Icon.Dropdown stroke="stroke-white" />
            </div>
          }
          elements={children.slice(show, childCount).map((child) => child)}
        />
      )}
    </div>
  );
}

PillList.Compact = PillListCompact;
