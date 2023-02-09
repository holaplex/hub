import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import { DropStatus } from '../app/projects/[project]/drops/page';
import { PurchaseStatus } from '../app/projects/[project]/drops/[drop]/purchases/page';
import { InviteStatus } from '../graphql.types';
import { Icon } from './Icon';

interface TableProps<T> {
  columns: ColumnDef<T, string>[];
  data: T[];
  className?: string;
}

//TODO: Replace with real dynamic data.
export default function Table<T>({ columns, data, className }: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <div className={className}>
      <table className="min-w-full border border-gray-100 rounded-md">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-50">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-3 border-r border-gray-100">
                  {header.isPlaceholder ? null : (
                    <div
                      {...{
                        className: header.column.getCanSort()
                          ? 'cursor-pointer select-none flex items-center justify-between'
                          : '',
                        onClick: header.column.getToggleSortingHandler(),
                      }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: <Icon.TableSortAsc />,
                        desc: <Icon.TableSortDesc />,
                      }[header.column.getIsSorted() as string] ??
                        (header.column.getCanSort() ? <Icon.TableSort /> : null)}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-100 p-3">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.footer, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}

interface InviteStatusPillProps {
  status: InviteStatus;
  className?: string;
}

function InviteStatusPill({ status, className }: InviteStatusPillProps) {
  let label = '';
  switch (status) {
    case InviteStatus.Accepted:
      label = 'Active';
      break;
    case InviteStatus.Sent:
      label = 'Pending';
      break;
    case InviteStatus.Revoked:
      label = 'Inactive';
      break;
  }
  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-green-200 text-gray-600': status === InviteStatus.Accepted,
        'bg-brown-200 text-brown-600': status === InviteStatus.Sent,
        'bg-gray-100 text-gray-500': status === InviteStatus.Revoked,
      })}
    >
      {label}
    </div>
  );
}
Table.InviteStatusPill = InviteStatusPill;

interface DropStatusPillProps {
  status: DropStatus;
  className?: string;
}

function DropStatusPill({ status, className }: DropStatusPillProps) {
  let label = '';
  switch (status) {
    case DropStatus.SCHEDULED:
      label = 'Scheduled';
      break;
    case DropStatus.MINTING:
      label = 'Minting';
      break;
    case DropStatus.MINTED:
      label = 'Minted';
      break;
  }
  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-brown-200 text-brown-600': status === DropStatus.SCHEDULED,
        'bg-green-200 text-green-600': status === DropStatus.MINTING,
        'bg-gray-100 text-gray-500': status === DropStatus.MINTED,
      })}
    >
      {label}
    </div>
  );
}
Table.DropStatusPill = DropStatusPill;

interface PurchaseStatusPillProps {
  status: PurchaseStatus;
  className?: string;
}

function PurchaseStatusPill({ status, className }: PurchaseStatusPillProps) {
  let label = status.toString();

  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-cyan-200 text-cyan-600': status === PurchaseStatus.PENDING,
        'bg-green-200 text-green-600': status === PurchaseStatus.SUCCESS,
        'bg-red-100 text-red-900': status === PurchaseStatus.FAILED,
      })}
    >
      {label}
    </div>
  );
}
Table.PurchaseStatusPill = PurchaseStatusPill;
