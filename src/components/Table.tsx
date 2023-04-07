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
import { WebhookStatus, TransactionStatus, MemberStatus, CredentialStatus } from './../types';
import { CreationStatus, DropStatus } from '../graphql.types';
import { Icon } from './Icon';

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
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });
  return (
    <div className={clsx('overflow-x-auto', className)}>
      <table className="min-w-full border border-gray-100 border-b-0 rounded-md table-fixed border-collapse">
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
  }
  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-purple-200 text-purple-600': status == MemberStatus.Owner,
        'bg-green-200 text-green-600': status === MemberStatus.Accepted,
        'bg-cyan-200 text-cyan-600': status === MemberStatus.Sent,
        'bg-red-100 text-red-900': status === MemberStatus.Revoked,
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
      label = 'Minting';
      break;
    case DropStatus.Minted:
      label = 'Minted';
      break;
    case DropStatus.Expired:
      label = 'Expired';
      break;
  }

  return (
    <div
      className={clsx('rounded-full py-1 px-3 text-xs font-medium max-w-min', className, {
        'bg-purple-200 text-purple-600': status === DropStatus.Scheduled,
        'bg-blue-200 text-blue-600': status === DropStatus.Minting,
        'bg-green-200 text-green-600': status === DropStatus.Minted,
        'bg-gray-100 text-gray-500': status === DropStatus.Creating,
        'bg-red-100 text-red-900': status === DropStatus.Expired,
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
        'bg-cyan-200 text-cyan-600': status === CreationStatus.Pending,
        'bg-green-200 text-green-600': status === CreationStatus.Created,
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
        'bg-gray-100 text-gray-700': status === WebhookStatus.DISABLED,
        'bg-green-200 text-green-600': status === WebhookStatus.ACTIVE,
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
        'bg-cyan-200 text-cyan-600': status === TransactionStatus.IN_PROCESS,
        'bg-green-200 text-green-600': status === TransactionStatus.SUCCESS,
        'bg-red-100 text-red-900': status === TransactionStatus.FAILED,
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
        'bg-gray-100 text-gray-700': status === CredentialStatus.DISABLED,
        'bg-green-200 text-green-600': status === CredentialStatus.ACTIVE,
      })}
    >
      {label}
    </div>
  );
}
Table.CredentialStatusPill = CredentialStatusPill;
