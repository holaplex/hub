import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  ColumnMeta,
  RowData,
} from '@tanstack/react-table';
import clsx from 'clsx';
import { useState } from 'react';
import { WebhookStatus, TransactionStatus, MemberStatus, CredentialStatus } from './../types';
import { CreationStatus, DropStatus } from '../graphql.types';
import { Icon } from './Icon';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: 'left' | 'center' | 'right' | 'justify' | 'char';
  }
}

interface TableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  className?: string;
}

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
      <table className="w-full rounded-md table-fixed bg-stone-900 drop-shadow-lg">
        <thead className="border-b border-stone-800">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                const size = header.column.getSize();
                const style: React.CSSProperties = {};

                if (size) {
                  style.width = size;
                }

                header.column.columnDef.meta?.align;

                return (
                  <th
                    key={header.id}
                    className="p-6 text-xs font-medium text-gray-400"
                    align={header.column.columnDef.meta?.align}
                    style={style}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? 'cursor-pointer select-none flex items-center gap-2'
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
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell, i) => {
                const size = cell.column.getSize();
                const style: React.CSSProperties = {};

                if (size) {
                  style.width = size;
                }

                const align = cell.column.columnDef.meta?.align;

                return (
                  <td
                    key={cell.id}
                    className="border-t border-stone-800 p-6"
                    style={style}
                    align={align}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface InviteStatusPillProps {
  status: MemberStatus;
  className?: string;
}

function MemberPill({ status, className }: InviteStatusPillProps) {
  let label: string;
  switch (status) {
    case MemberStatus.Owner:
      label = 'Owner';
      break;
    case MemberStatus.Accepted:
      label = 'Active';
      break;
    case MemberStatus.Sent:
      label = 'Pending';
      break;
    case MemberStatus.Revoked:
      label = 'Expired';
      break;
    case MemberStatus.Inactive:
      label = 'Inactive';
      break;
  }
  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-green-400 bg-opacity-20 text-green-400':
          status == MemberStatus.Owner || status === MemberStatus.Accepted,
        'bg-blue-400 bg-opacity-20 text-blue-400': status === MemberStatus.Sent,
        'bg-red-500 bg-opacity-20 text-red-500': status === MemberStatus.Revoked,
        'bg-gray-600 bg-opacity-20 text-gray-600': status === MemberStatus.Inactive,
      })}
    >
      {label}
    </div>
  );
}
Table.MemberPill = MemberPill;

interface DropStatusPillProps {
  status: DropStatus;
  className?: string;
}

function DropStatusPill({ status, className }: DropStatusPillProps) {
  let label = '';
  switch (status) {
    case DropStatus.Creating:
      label = 'Creating';
      break;
    case DropStatus.Scheduled:
      label = 'Scheduled';
      break;
    case DropStatus.Minting:
      label = 'Live';
      break;
    case DropStatus.Paused:
      label = 'Paused';
      break;
    case DropStatus.Minted:
      label = 'Minted';
      break;
    case DropStatus.Expired:
      label = 'Expired';
      break;
    case DropStatus.Shutdown:
      label = 'Shutdown';
    case DropStatus.Failed:
      label = 'Failed';
  }

  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-blue-400 bg-opacity-20 text-blue-400':
          status === DropStatus.Minting ||
          status === DropStatus.Scheduled ||
          status === DropStatus.Creating,
        'bg-green-400 bg-opacity-20 text-green-400': status === DropStatus.Minted,
        'bg-yellow-400 bg-opacity-20 text-yellow-400': status === DropStatus.Paused,
        'bg-red-500 bg-opacity-20 text-red-500':
          status === DropStatus.Expired ||
          status === DropStatus.Shutdown ||
          status === DropStatus.Failed,
      })}
    >
      {label}
    </div>
  );
}
Table.DropStatusPill = DropStatusPill;

interface PurchaseStatusPillProps {
  status: CreationStatus;
  className?: string;
}

function PurchaseStatusPill({ status, className }: PurchaseStatusPillProps) {
  let label = status.toString();

  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-blue-400 bg-opacity-20 text-blue-400': status === CreationStatus.Pending,
        'bg-green-400 bg-opacity-20 text-green-400': status === CreationStatus.Created,
        'bg-red-500 bg-opacity-20 text-red-500': status === CreationStatus.Failed,
      })}
    >
      {label}
    </div>
  );
}
Table.PurchaseStatusPill = PurchaseStatusPill;

interface WebhookStatusProps {
  status: WebhookStatus;
  className?: string;
}

function WebhookStatusPill({ status, className }: WebhookStatusProps) {
  let label = status.toString();

  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-red-500 bg-opacity-20 text-red-500': status === WebhookStatus.DISABLED,
        'bg-green-400 bg-opacity-20 text-green-400': status === WebhookStatus.ACTIVE,
      })}
    >
      {label}
    </div>
  );
}
Table.WebhookStatusPill = WebhookStatusPill;

interface TransactionStatusPillProps {
  status: TransactionStatus;
  className?: string;
}

function TransactionStatusPill({ status, className }: TransactionStatusPillProps) {
  let label = status.toString();

  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-blue-400 bg-opacity-20 text-blue-400': status === TransactionStatus.IN_PROCESS,
        'bg-green-400 bg-opacity-20 text-green-400': status === TransactionStatus.SUCCESS,
        'bg-red-500 bg-opacity-20 text-red-500': status === TransactionStatus.FAILED,
      })}
    >
      {label}
    </div>
  );
}
Table.TransactionStatusPill = TransactionStatusPill;

interface CredentialStatusProps {
  status: CredentialStatus;
  className?: string;
}

function CredentialStatusPill({ status, className }: CredentialStatusProps) {
  let label = status.toString();

  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-stone-950 text-gray-700': status === CredentialStatus.DISABLED,
        'bg-green-200 text-green-600': status === CredentialStatus.ACTIVE,
      })}
    >
      {label}
    </div>
  );
}
Table.CredentialStatusPill = CredentialStatusPill;
