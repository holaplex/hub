import { PopoverBox } from '@holaplex/ui-library-react';
import clsx from 'clsx';
import { MouseEventHandler, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import useSize from '@react-hook/size';

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

function CompactPillList({
  children: pills,
  maxContainerWidth = Number.MAX_VALUE,
}: {
  children: JSX.Element[];
  maxContainerWidth: number;
}): JSX.Element {
  const [maxPills, setMaxPills] = useState(pills.length);

  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = maxContainerWidth;

  useLayoutEffect(() => {
    const pillElements = containerRef.current?.querySelectorAll(
      '.pill'
    ) as NodeListOf<HTMLDivElement>;

    let totalPillWidth = 0;
    let newMaxPills = pills.length;

    pillElements.forEach((pillElement) => {
      totalPillWidth += pillElement.clientWidth;
      if (totalPillWidth > containerWidth) {
        newMaxPills -= 1;
      }
    });

    setMaxPills(newMaxPills);
  }, [containerWidth, pills]);

  const displayedPills = pills.slice(0, maxPills);
  const hiddenPills = pills.slice(maxPills);

  return (
    <div className="flex gap-2 items-center" ref={containerRef as RefObject<HTMLDivElement>}>
      <div className="flex gap-2">
        {displayedPills.map((pill, index) => (
          <div key={index} className="pill">
            {pill}
          </div>
        ))}
      </div>
      {hiddenPills.length > 0 && (
        <PopoverBox
          triggerButton={
            <div className="px-2 rounded-full bg-gray-50 text-primary text-xs cursor-pointer">
              +{hiddenPills.length}
            </div>
          }
          elements={[
            <div key="key" className="flex flex-wrap gap-2 p-2">
              {hiddenPills.map((tag, index) => (
                <div key={index}>{tag}</div>
              ))}
            </div>,
          ]}
        ></PopoverBox>
      )}
    </div>
  );
}
PillList.Compact = CompactPillList;
